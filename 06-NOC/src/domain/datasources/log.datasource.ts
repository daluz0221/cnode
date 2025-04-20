import { LogEntity, LogSeveryLevel } from "../entities/log.entity";


export abstract class LogDataSource {

    abstract saveLog( log:LogEntity ): Promise<void>    
    abstract getLogs( severyLevel: LogSeveryLevel ): Promise<LogEntity[]>   

};


