import express, { Router } from 'express'
import path from 'path';


interface Options {
    PORT: number,
    routes: Router;
    PUBLIC_PATH?: string;
}


export class Server {

    public readonly app = express();
    private serverListener?: any;
    private readonly port: number
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(
        options:Options
    ){
        const { PORT, PUBLIC_PATH='public', routes } = options;
        this.port = PORT;
        this.publicPath = PUBLIC_PATH
        this.routes = routes
    }

    async start(){


        // Middlewares
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencode



        // Public folder
        this.app.use( express.static( this.publicPath ) );

        // Routes
        this.app.use( this.routes );
       

        // * SPA
        this.app.get('/{*splat}', (req, res)=>{
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            console.log(indexPath);
            
            res.sendFile( indexPath );
            return
        })
      
        this.serverListener = this.app.listen(this.port, () => {
          console.log(`Server running on port ${this.port} `);
          
        });

        

    };
    
    public close(){
        this.serverListener?.close()
    }

}




