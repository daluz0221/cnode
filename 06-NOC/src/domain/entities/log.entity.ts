

export enum LogSeveryLevel {
    low         = 'low',
    medium      = 'medium',
    high        = 'high'
}

export interface LogEntityOptions {
    level:      LogSeveryLevel;
    message:    string;
    createAt?:   Date;
    origin:     string;
}



export class LogEntity {

    public level: LogSeveryLevel;
    public message: string;
    public createAt: Date;
    public origin: string;


    constructor(
        options: LogEntityOptions
    ){
        const { message, level, createAt = new Date(), origin } = options
        this.message = message;
        this.level = level;
        this.createAt = createAt;
        this.origin = origin;
    }

    static fromJson = ( json: string  ):LogEntity => {

        json = ( json === '' )? '{}': json;

        const { message, level, createAt, origin } =  JSON.parse(json);
        

        const log = new LogEntity({
            message,
            level, 
            createAt,
            origin
        });
        log.createAt = new Date(createAt);
        return log; 

    }

    static fromObject = (object: {[key: string]: any}): LogEntity => {
        
        const { message, level, createAt, origin } = object;
        
        const log = new LogEntity({
            message,
            level,
            createAt,
            origin
        })
    
        return log;
    }

}






