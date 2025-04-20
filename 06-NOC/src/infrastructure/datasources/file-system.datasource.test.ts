import fs from 'fs'
import path from 'path';
import { FileSystemDataSource } from './file-system.datasource';
import { LogEntity, LogSeveryLevel } from '../../domain/entities/log.entity';



describe('file-system.datasource.ts', () => {
  
    const logsPath = path.join(__dirname, '../../../logs')
    console.log({logsPath});
    

    beforeEach(() => {
      fs.rmSync( logsPath, { recursive:true, force: true } )
    });

    test('should create log files if they do not exists', () => {
      
        new FileSystemDataSource();
        const files = fs.readdirSync( logsPath )
        expect( files ).toEqual([ 'logs-all.log', 'logs-high.log', 'logs-medium.log' ])
    });

    test('should save a log in logs-all.log', () => {
      
        const logDataSource = new FileSystemDataSource();

        const log = new LogEntity({
            message: 'test',
            level: LogSeveryLevel.low,
            origin: 'file-system.datasource.test.ts'
        });

        logDataSource.saveLog( log );
        const allLogs = fs.readFileSync( `${logsPath}/logs-all.log`, 'utf-8' );
        expect(allLogs).toContain( JSON.stringify(log) )
        

    });

    test('should save a log in logs-all.log and logs-medium.log', () => {
      
        const logDataSource = new FileSystemDataSource();

        const log = new LogEntity({
            message: 'test',
            level: LogSeveryLevel.medium,
            origin: 'file-system.datasource.test.ts'
        });

        logDataSource.saveLog( log );
        const allLogs = fs.readFileSync( `${logsPath}/logs-all.log`, 'utf-8' );
        const mediumLogs = fs.readFileSync( `${logsPath}/logs-medium.log`, 'utf-8' );
        expect(allLogs).toContain( JSON.stringify(log) )
        expect(mediumLogs).toContain( JSON.stringify(log) )
        

    });

    test('should save a log in logs-all.log and logs-high.log', () => {
      
        const logDataSource = new FileSystemDataSource();

        const log = new LogEntity({
            message: 'test',
            level: LogSeveryLevel.high,
            origin: 'file-system.datasource.test.ts'
        });

        logDataSource.saveLog( log );
        const allLogs = fs.readFileSync( `${logsPath}/logs-all.log`, 'utf-8' );
        const highLogs = fs.readFileSync( `${logsPath}/logs-high.log`, 'utf-8' );

        expect(allLogs).toContain( JSON.stringify(log) )
        expect(highLogs).toContain( JSON.stringify(log) )
        

    });

    test('should return all logs', async() => {
      
        const logDataSource = new FileSystemDataSource();

        const logLow = new LogEntity({
            message: 'test',
            level: LogSeveryLevel.low,
            origin: 'file-system.datasource.test.ts'
        });

        const logMedium = new LogEntity({
            message: 'test',
            level: LogSeveryLevel.medium,
            origin: 'file-system.datasource.test.ts'
        });

        const logHigh = new LogEntity({
            message: 'test',
            level: LogSeveryLevel.high,
            origin: 'file-system.datasource.test.ts'
        });

        await logDataSource.saveLog( logLow );
        await logDataSource.saveLog( logMedium );
        await logDataSource.saveLog( logHigh );

        const logsLow = await logDataSource.getLogs(LogSeveryLevel.low);
        const logsMedium = await logDataSource.getLogs(LogSeveryLevel.medium);
        const logsHigh = await logDataSource.getLogs(LogSeveryLevel.high);

        expect( logsLow ).toEqual( expect.arrayContaining([ logLow, logMedium, logHigh]) )
        expect( logsMedium ).toEqual( expect.arrayContaining([ logMedium ]) )
        expect( logsHigh ).toEqual( expect.arrayContaining([ logHigh ]) )

    });


    test('should not throw an error if path exists', () => {
      new FileSystemDataSource()
      new FileSystemDataSource()

    });


});

