import { Request, Response } from "express";
import { CreateCategoryDto, CustomError, PaginationDto } from "../../domain";
import { CategoryService } from "../services/category.service";




export class CategoryController {

    constructor(
      private readonly categoryService: CategoryService
    ){}

    private handleError = (error: unknown, res: Response) => {
      if (error instanceof CustomError) {
        res.status( error.statusCode ).json({ error: error.message });
        return
      }

      console.log(`${error}`);
      
      res.status(500).json({error: 'Internal server error'})
    }

    createCategory = (req: Request, res:Response) => {
        const [error, createCategoryDto] = CreateCategoryDto.create( req.body );

        if (error) {
            res.status(400).json({error})
            return
        }

        this.categoryService.createCategory(createCategoryDto!, req.body.user)
            .then( newCategory => res.status(201).json( newCategory ) )
            .catch( err => this.handleError(err, res) )
    }

    getCategories = async(req: Request, res:Response) => {

      const { page = 1, limit = 5 } = req.query;

      const [error, paginationDto] = PaginationDto.create( +page, +limit );

      if (error) {
        res.status(400).json({error})
        return;
      }

      

      this.categoryService.getCategories( paginationDto! )
          .then( categories => res.status(200).json( categories ) )
          .catch( err => this.handleError( err, res ) )
  
      }

}


