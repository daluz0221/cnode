import { LogEntity, LogSeveryLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";



describe('log.repository.impl.ts', () => {
  
    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const logRepo = new LogRepositoryImpl(mockLogDatasource);

    beforeEach(() => {
      
        jest.clearAllMocks();
    })

    test('saveLog should call the datasource with arguments', async() => {
      
        const log = {
            level: LogSeveryLevel.high,
            message:'mundo'
        } as LogEntity

        await logRepo.saveLog(log);
        expect( mockLogDatasource.saveLog ).toHaveBeenCalledWith( log )


    });

    test('getLogs should call the datasource with arguments', async() => {
      await logRepo.getLogs(LogSeveryLevel.low)
      expect( mockLogDatasource.getLogs ).toHaveBeenCalledWith( LogSeveryLevel.low )
    });

});

