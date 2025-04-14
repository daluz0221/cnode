

export enum LogSeveryLevel {
    low         = 'low',
    medium      = 'medium',
    high        = 'high'
}



export class LogEntity {

    public level: LogSeveryLevel;
    public message: string;
    public createAt: Date;


    constructor(
        message:string, level:LogSeveryLevel
    ){
        this.message = message;
        this.level = level;
        this.createAt = new Date();
    }

    static fromJson = ( json: string ):LogEntity => {
       const { message, level, createAt } =  JSON.parse(json);
        if( !message) throw new Error("Message is required");

        const log = new LogEntity(message, level);
        log.createAt = new Date(createAt);
        return log; 

    }
}






