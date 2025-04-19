import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailService } from "../domain/use-cases/email/send-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
)

const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDatasource()
)

const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
)




const emailService = new EmailService();

export class Server {
    public static start(){
        console.log('Server started...');
        // console.log(envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY);
        
        // new SendEmailService(
        //   emailService,
        //   fileSystemLogRepository,
        // ).execute(
        //   ['lfelipe.echeverry@udea.edu.co', 'lfelipe.desarrollador@gmail.com']
        // )
        // emailService.sendEmailWithFileSystemLogs(
        //  ['lfelipe.echeverry@udea.edu.co', 'lfelipe.desarrollador@gmail.com']
        // )


        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url =  'https://www.google.com'
        //       new CheckServiceMultiple(
        //         [ fsLogRepository, mongoLogRepository, postgresLogRepository ],
        //         () => console.log(`${ url } is ok desde server`),
        //         ( error ) => console.log(error)
        //       ).execute( url )
        //     //   new CheckService().execute( 'http://localhost:3000' )
        //     }
        // );
    }
}



