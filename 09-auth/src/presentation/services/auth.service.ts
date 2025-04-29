import { bcryptAdatper, envs, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { EmailService } from "./email.service";



export class AuthService {

    constructor(
        private readonly emailService: EmailService,
    ){}


    public async registerUser( registerUserDto: RegisterUserDto ){

        const existUser = await UserModel.findOne({email: registerUserDto.email});
        if ( existUser ) {
            throw CustomError.basRequest('Email already exists')
        }

        try {

            const user = new UserModel(registerUserDto);
            
            // encriptar la contra
            user.password = bcryptAdatper.hash( registerUserDto!.password )
            
            await user.save();

            // JWT para mantener la ayuth del user




            // EMAIL DE CONFIRM
            await this.sendEmailValidationLink( user.email );



            const {password, ...userEntity} = UserEntity.fromObject( user );
            const token = await JwtAdapter.generateToken({
                id: user.id
            })

            if (!token) {
                throw CustomError.internalServer('Error while creating jwt')
            }

            return {
                user: userEntity,
                token
            };

        } catch (error) {
            throw CustomError.internalServer(`${ error }`)
        }
    }

    private sendEmailValidationLink = async(email: string) => {
     
        const token = await JwtAdapter.generateToken({email});
        if(!token) throw CustomError.internalServer('Error getting token');

        const link = `${ envs.WEBSERVICE_URL }/auth/validate-email/${ token }`
        const html = `
        
            <h1>Valida tu registro</h1>
            <p>Gracias por registrarte en nuestro sitio web, por favor ve al siguiente <a href="${link}"> link</a> para confirmar tu cuenta </p>
        
        `;

        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody: html
        }

        const isSent = await this.emailService.sendEmail( options );
        if (!isSent) throw CustomError.internalServer('Error sending email');

        return true;

    }

    public async loginUser( loginUserDto: LoginUserDto ){


        try {
            
     
            // Findone para verificar si existe
            
            const { email, password } = loginUserDto;
            const user = await UserModel.findOne( {email} )

            if (user === null) {
                throw CustomError.notFound('User not found')
            }

            

            // isMatch... bcryp..compare
            const isMatch = bcryptAdatper.compare( password, user.password )
            const { password: pass, ...userEntity } = UserEntity.fromObject(user)
            if (isMatch) {

                const token = await JwtAdapter.generateToken({
                    id: user.id
                })

                if (!token) {
                    throw CustomError.internalServer('Error while creating jwt')
                }

                return {
                    user: userEntity,
                    token
                }
            }

            throw CustomError.basRequest('Usuario no existe')
        } catch (error) {
            throw CustomError.internalServer(`${ error }`) 
        }


    }


    public validateEmail = async(token:string) => {
      
        const payload = await JwtAdapter.validateToken(token);

        if(!payload) throw CustomError.unauthorized('Invalid token');

        const { email } = payload as {email:string};

        if(!email) throw CustomError.internalServer('Email not in token');

        const user = await UserModel.findOne({ email });
        if (!user) throw CustomError.internalServer('Email not exists');

        user.emailValidated = true;
        await user.save();


        return true;

    }

}


