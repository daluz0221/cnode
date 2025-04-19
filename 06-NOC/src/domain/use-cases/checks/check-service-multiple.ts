import { LogEntity, LogSeveryLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface checkServiceMultipleUseCase {
    execute( url: string ): Promise<boolean>
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined


export class CheckServiceMultiple implements checkServiceMultipleUseCase {

    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ){

    }

    private callLogs( log: LogEntity ){
        this.logRepository.forEach( logRepository =>{
            logRepository.saveLog( log )
        });
    }


    public async execute( url:string ):Promise<boolean>{

        try {
            const req = await fetch( url );
            
            if( !req.ok ){
                throw new Error(`Error on check service ${ url }`)
            }
            const logEntityOption = {
                message: `Service ${ url } working`, 
                level: LogSeveryLevel.low, 
                origin:'check-service.ts'
            }
            const log = new LogEntity(logEntityOption)
            this.callLogs(log)
            this.successCallback && this.successCallback();
          
            

            return true
        } catch (error) {
            
            const errorMessage = `${ url } is not ok, ${ error }`
            const logEntityOption = {
                message: errorMessage, 
                level: LogSeveryLevel.high, 
                origin:'check-service.ts'
            }
            const log = new LogEntity(logEntityOption)

            this.callLogs(log);
            this.errorCallback && this.errorCallback( errorMessage )

            return false
        }

    }

}







