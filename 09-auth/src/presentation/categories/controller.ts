import { Request, Response } from "express";
import { CreateCategoryDto, CustomError } from "../../domain";




export class CategoryController {

    constructor(){}

    private handleError = (error: unknown, res: Response) => {
      if (error instanceof CustomError) {
        res.status( error.statusCode ).json({ error: error.message });
        return
      }

      console.log(`${error}`);
      
      res.status(500).json({error: 'Internal server error'})
    }

    createCategory = async(req: Request, res:Response) => {
        const [error, createCategoryDto] = CreateCategoryDto.create( req.body );

        if (error) {
            res.status(400).json({error})
            return
        }

      res.json(createCategoryDto)

    }

    getCategories = async(req: Request, res:Response) => {
        res.json('get all categories')
  
      }

}


