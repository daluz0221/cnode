import { CustomError } from "../errors/custom.error";


export class CategoryEntity {

    constructor(
        public id: string,
        public name: string,
        public available: boolean
    ){}


    static fromObject( obj: { [key:string]: any} ){

        const { id, _id, name, available} = obj;

        if (!_id && !id) {
            throw CustomError.basRequest('Missing id')
        }

        if( !name ) throw CustomError.basRequest('Missing name');


        return new CategoryEntity( _id || id, name, available)
    }


}


