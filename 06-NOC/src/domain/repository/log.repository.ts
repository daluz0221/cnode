


import { LogEntity, LogSeveryLevel } from "../entities/log.entity";


export abstract class LogRepository {

    abstract saveLog( log:LogEntity ): Promise<void>    
    abstract getLogs( severyLevel: LogSeveryLevel ): Promise<LogEntity[]>    

};





