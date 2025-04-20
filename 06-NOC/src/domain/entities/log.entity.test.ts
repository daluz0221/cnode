import { LogEntity, LogSeveryLevel } from "./log.entity";


describe("log.entity.ts", () => {
  
    const dataObj = {
        message: 'Hola zawardo',
        level: LogSeveryLevel.medium,
        origin: 'log.entity.test.ts'
    }

    test('should create a LogEntity instance', () => {
      

        const log = new LogEntity(dataObj);

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.message ).toBe( dataObj.message );
        expect( log.origin ).toBe( dataObj.origin );
        expect( log.level ).toBe( dataObj.level );
        expect( log.createAt ).toBeInstanceOf( Date );

    });

    test('should create a LogEntity instance from json', () => {
        
        const json = `{"message":"Service https://www.google.com working","level":"low","createAt":"2025-04-19T19:23:35.497Z","origin":"check-service.ts"}`

        const log = LogEntity.fromJson(json);

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.message ).toBe( "Service https://www.google.com working" );
        expect( log.origin ).toBe( "check-service.ts" );
        expect( log.level ).toBe( "low" );
        expect( log.createAt ).toBeInstanceOf( Date );
    });


    test('should create a LogEntity instance from object', () => {
      const log = LogEntity.fromObject( dataObj );

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.message ).toBe( dataObj.message );
        expect( log.origin ).toBe( dataObj.origin );
        expect( log.level ).toBe( dataObj.level );
        expect( log.createAt ).toBeInstanceOf( Date );

    })

});



