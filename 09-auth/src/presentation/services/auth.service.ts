import { bcryptAdatper, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";



export class AuthService {

    constructor(){}


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



            const {password, ...userEntity} = UserEntity.fromObject( user );

            return {
                user: userEntity,
                token: 'ABC'
            };

        } catch (error) {
            throw CustomError.internalServer(`${ error }`)
        }

        return 'Todo ok'
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
                    id: user.id,
                    email: user.email
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

}


