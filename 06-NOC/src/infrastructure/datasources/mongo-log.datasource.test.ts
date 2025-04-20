import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "../../data/mongo";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeveryLevel } from "../../domain/entities/log.entity";






describe('mongo-log.datasource.ts', () => {
  
    const logDataSource = new MongoLogDatasource();
    beforeAll(async() => {
        
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        })

    });

    afterEach(async() => {
        await LogModel.deleteMany();
    })

    afterAll(async() => {
      mongoose.connection.close();
    });

    const log = new LogEntity({
        level: LogSeveryLevel.low,
        message: 'Test message',
        origin: 'mongo-log.datasource.test.ts'
    })

    test('should create a log', async() => {
      
        const logSpy = jest.spyOn(console, 'log');
        

        await logDataSource.saveLog( log );

        expect( logSpy ).toHaveBeenCalled();
        expect( logSpy ).toHaveBeenCalledWith("Mongo log created", expect.any(String));


    });

    test('should get logs', async() => {

        await logDataSource.saveLog( log )
      
        const logs = await logDataSource.getLogs( LogSeveryLevel.low );
        
        expect( logs.length ).toBe(1);
        expect( logs[0] ).toEqual( log )
        expect( logs[0].level ).toBe( LogSeveryLevel.low )

    });

});