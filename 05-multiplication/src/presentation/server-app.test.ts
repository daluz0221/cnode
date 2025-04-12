
import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { ServerApp } from './server-app'
import { Savefile } from '../domain/use-cases/save-file.use-case';



describe("pruebas ens erver app", () => {

    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        destination: "test-destination",
        name: "test-fileName",
    };

    beforeEach(() => {
      jest.clearAllMocks();
    })
  
    test("should create ServerApp instace", () => {
      

        const serverApp = new ServerApp();
        expect( serverApp ).toBeInstanceOf( ServerApp );
        expect( typeof ServerApp.run ).toBe( 'function' );

    });

    test("should run ServerApp with options", () => {

        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn( CreateTable.prototype, "execute" );
        const saveFileSpy = jest.spyOn( Savefile.prototype, "execute" );
        
    

        ServerApp.run(options);

        expect( logSpy ).toHaveBeenCalledTimes(2);
        expect( logSpy ).toHaveBeenCalledWith("Server running...");

        expect( createTableSpy ).toHaveBeenCalled();
        expect( createTableSpy ).toHaveBeenCalledWith({
            base: options.base, limit: options.limit
        });
        expect( saveFileSpy ).toHaveBeenCalled();
        expect( saveFileSpy ).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            filename: options.name,
            path: options.destination
        });
      



    });


    test("should run with custom values mocked", () => {
      
        const createMock = jest.fn().mockReturnValue('1 x 2 = 2'); 
        const saveFileMock = jest.fn();

        CreateTable.prototype.execute = createMock;
        Savefile.prototype.execute = saveFileMock;

        ServerApp.run(options);

        expect( createMock ).toHaveBeenCalledWith({
            base: options.base, limit: options.limit
        });
        expect( saveFileMock ).toHaveBeenCalledWith({
            fileContent: '1 x 2 = 2',
            filename: "test-fileName", 
            path: "test-destination"
        })


    });

});