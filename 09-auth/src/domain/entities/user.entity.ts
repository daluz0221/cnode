import { CustomError } from "../errors/custom.error";


export class UserEntity {

    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public emailValidated: boolean,
        public role: string[],
        public img?: string,
    ){}


    static fromObject( obj: { [key:string]: any} ){

        const { id, _id, name, email, emailValidated, password, role, img } = obj;

        if (!_id && !id) {
            throw CustomError.basRequest('Missing id')
        }

        if( !name ) throw CustomError.basRequest('Missing name');
        if( !email ) throw CustomError.basRequest('Missing email');
        if( emailValidated === undefined ) throw CustomError.basRequest('Missing emailValidated');
        if( !password ) throw CustomError.basRequest('Missing password');
        if( !role ) throw CustomError.basRequest('Missing role');


        return new UserEntity( _id || id, name, email, password, emailValidated, role, img)

    }


}


