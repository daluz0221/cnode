import { EmailService } from "../../../presentation/email/email.service"
import { LogEntity, LogSeveryLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository"


interface SendLogEmailUseCase {
    execute: (to:string | string[]) => Promise<boolean> 
}


export class SendEmailService implements SendLogEmailUseCase{


    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ){}

    async execute(to: string | string[]){


        try {
            
            const sent = await this.emailService.sendEmailWithFileSystemLogs( to );

            if (!sent){
                throw new Error('Email log not sent')
            }
            const newLog = new LogEntity({
                message: `Email sent`,
                level: LogSeveryLevel.low,
                origin: 'send-logs.ts'
            })
            this.logRepository.saveLog( newLog )

            return true
        } catch (error) {


            const newLog = new LogEntity({
                message: `${error}`,
                level: LogSeveryLevel.high,
                origin: 'send-logs.ts'
            })
            this.logRepository.saveLog( newLog )

            return false
        }

    }

}



