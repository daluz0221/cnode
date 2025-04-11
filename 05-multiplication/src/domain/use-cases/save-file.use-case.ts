import * as fs from "fs";


export interface SaveFileUseCase {
    execute: (options: SaveFileOptions) => boolean;
}

export interface SaveFileOptions {
    path?: string;
    filename?: string;
    fileContent: string;
}


export class Savefile implements SaveFileUseCase {
    constructor(
        /**
         * Repo
         */
    ){}


    execute({ fileContent, filename = 'table', path = 'outputs' }: SaveFileOptions): boolean {
       
        try {
            fs.mkdirSync(path, { recursive:true })
            fs.writeFileSync(`${path}/${filename}.txt`, fileContent);
            console.log("File created");
            return true
        } catch (error) {
            console.log(error);
            
            return false 
        }
        
    };

}



