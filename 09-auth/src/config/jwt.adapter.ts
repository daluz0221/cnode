import jwt, { SignOptions }  from "jsonwebtoken";
import { envs } from "./envs";


const jwt_seed = envs.JWT_SEED

export class JwtAdapter {


    static generateToken( payload:any, duration: string = '2h' ){

        return new Promise((resolve) => {
            jwt.sign(payload, jwt_seed, { expiresIn: duration } as SignOptions, (error, token)=>{

                if(error) return resolve(null)
                
                resolve(token)
            });
        })

    };


    static validateToken<T>(token:string): Promise<T|null>{

        return new Promise((resolve) => {
          
            jwt.verify( token, jwt_seed, (err, decoded) => {
              
                if(err)return resolve(null);

                resolve( decoded as T )

            } );

        });

    };


}


