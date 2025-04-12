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

    // beforeEach(() => {
    //   jest.clearAllMocks();
    // });
    
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

    // simular que algo falle
    test("should return false if directory could not be created", () => {
       
        const saveFile = new Savefile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => {
              throw new Error('this is a custom error message from testing')
            }
        );

        const result = saveFile.execute(options);

        expect( result ).toBeFalsy();
        mkdirSpy.mockRestore();

    });

    test("should return false if file could not be created", () => {
       
        const saveFile = new Savefile();
        const wirteFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => {
              throw new Error('this is a custom wiriting message from testing')
            }
        );

        const result = saveFile.execute(options);

        expect( result ).toBeFalsy();
        wirteFileSpy.mockRestore();

    });


});


