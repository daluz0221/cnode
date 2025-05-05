import { Request, Response } from "express";
import { GithubSsrvice } from "../services/github.service";



export class GithubController {


    constructor(
        private readonly githubService = new GithubSsrvice()
    ){}

    webhookHandler = (req: Request, res: Response) => {

        const githubEvent = req.header('x-github-event') ?? 'unkown';
        const payload = req.body; 
        let message: string;

        switch ( githubEvent ) {
            case 'star':
                message = this.githubService.onStart( payload )
                break;

            case 'issues':

                message = this.githubService.onIssue( payload )

                break;
        
            default:
                message = `Unkown event ${githubEvent}`
                
                break;
        }
        
      
        console.log({message});
        
        res.status(201).send("Accepted")

    };

}




