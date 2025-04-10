import { buildLogger } from "../../src/plugins";
import { logger as wlogger } from "../../src/plugins/logger.plugin";


describe('buildLogger', () => {
  


    test('buildLogger should return a function logger', () => {
      
        const logger = buildLogger('test');

        expect( typeof logger.log ).toBe('function')
        expect( typeof logger.error ).toBe('function')

    });

    test('logger should log a message', () => {
      
        const winstonLoggerMock = jest.spyOn(wlogger, 'log');
        const message = 'Test message';
        const service = 'Test service';

        const logger = buildLogger(service);

        logger.log(message)

        expect( winstonLoggerMock ).toHaveBeenCalledWith('info',
            expect.objectContaining({
                level: 'info',
            message,
            service
            })
        );

    });

    test('logger should return an error', () => {
        const winstonLoggerMock = jest.spyOn(wlogger, 'error');
        const message = 'Test message error';
        const service = 'Test service error';

        const logger = buildLogger(service);

        logger.error(message);

        expect( winstonLoggerMock ).toHaveBeenCalledWith('error',
            {"message": "Test message error", "service": "Test service error"}
        );

    })

});