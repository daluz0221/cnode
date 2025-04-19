import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeveryLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from "../../generated/prisma";


const prismaClient = new PrismaClient()


const mapSeverityLevel = (level: LogSeveryLevel): SeverityLevel => {
  switch(level){
    case LogSeveryLevel.low:
        return SeverityLevel.LOW;
    case LogSeveryLevel.medium:
        return SeverityLevel.MEDIUM;
    case LogSeveryLevel.high:
        return SeverityLevel.HIGH
  }
}


export class PostgresLogDatasource implements LogDataSource {


    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await prismaClient.logModel.create({
            data: {
                level: mapSeverityLevel(log.level),
                message: log.message,
                origin: log.origin
            }
        });
        console.log(`Postgres log created ${newLog.id}`);
        
    }

    async getLogs(severyLevel: LogSeveryLevel): Promise<LogEntity[]> {
        const logs = await prismaClient.logModel.findMany({
            where: {
                level: mapSeverityLevel( severyLevel )
            }
        });

        return logs.map( LogEntity.fromObject );
    }

}


