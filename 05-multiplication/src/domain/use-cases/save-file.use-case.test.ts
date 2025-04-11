import fs from "fs";
import { Savefile } from './save-file.use-case'


describe("Savefile", () => {

    const options = {
        fileContent: "custom content",
        path: "custom-outputs",
        filename: "custom-table-name"
    }

    const { path, filename } = options;
    const filePath = `${path}/${filename}.txt`
    
    afterEach(() => {
        if(fs.existsSync('outputs')) fs.rmSync('outputs', { recursive: true });
        
        if (fs.existsSync('custom-outputs')) fs.rmSync('custom-outputs', { recursive: true });
    });

    


    test("should save files with default values", () => {
      
        const saveFile = new Savefile();
        const filePath = 'outputs/table.txt'
        const options = {
            fileContent: "test content"
        }

        const result = saveFile.execute(options);

        const checkFile = fs.existsSync(filePath); // puede dar un falso positivo
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })
        
        expect( result ).toBeTruthy();
        expect( checkFile ).toBeTruthy();
        expect( fileContent ).toBe( options.fileContent )

    });


    test("should save file with custom values", () => {
      
        const saveFile = new Savefile();
    
        

        const result = saveFile.execute(options);

        const checkFile = fs.existsSync(filePath); // puede dar un falso positivo
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })
        
        expect( result ).toBeTruthy();
        expect( checkFile ).toBeTruthy();
        expect( fileContent ).toBe( options.fileContent )


    });

});


