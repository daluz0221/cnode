import { LogEntity } from "../../entities/log.entity";
import { SendEmailService } from "./send-logs";





describe("send-logs.ts", () => {
  
    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),

    }
    const errorCallback = jest.fn()

    const sendEmailLogs = new SendEmailService(
        mockEmailService as any,
        mockRepository
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call sendEmail and saveLogs', async() => {
      
        const result = await sendEmailLogs.execute('daluz0221@gmailcom');

        expect( result ).toBeTruthy();

        expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes(1)
        expect( mockRepository.saveLog ).toHaveBeenCalledWith( expect.any(LogEntity) )
        expect( mockRepository.saveLog ).toHaveBeenCalledWith({
            "createAt": expect.any(Date), 
            "level": "low", 
            "message": "Email sent", 
            "origin": "send-logs.ts"}
        )

    });

    test('should log in case of error', async() => {

        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue( false )
      
        const result = await sendEmailLogs.execute('daluz0221@gmailcom');

        expect( result ).toBeFalsy();

        expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes(1)
        expect( mockRepository.saveLog ).toHaveBeenCalledWith( expect.any(LogEntity) )
        expect( mockRepository.saveLog ).toHaveBeenCalledWith({
            "createAt": expect.any(Date), 
            "level": "high", 
            "message": "Error: Email log not sent", 
            "origin": "send-logs.ts"}
        )

    });

});


