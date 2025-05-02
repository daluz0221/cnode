import { Request, Response } from "express";
import { CreateProductDto, CustomError, PaginationDto } from "../../domain";
import { ProductService } from "../services/product.service";





export class ProductController {

    constructor(
      private readonly productService: ProductService
    ){}

    private handleError = (error: unknown, res: Response) => {
      if (error instanceof CustomError) {
        res.status( error.statusCode ).json({ error: error.message });
        return
      }

      console.log(`${error}`);
      
      res.status(500).json({error: 'Internal server error'})
    }

    createProduct = (req: Request, res:Response) => {
        const [error, createCategoryDto] = CreateProductDto.create( {
          ...req.body,
          user: req.body.user.id
        } );

        if (error) {
            res.status(400).json({error})
            return
        }

        this.productService.createProduct( createCategoryDto! )
            .then( newProduct => res.status(201).json( newProduct ) )
            .catch( err => this.handleError(err, res) )
      

    }

    getProducts = async(req: Request, res:Response) => {

      const { page = 1, limit = 5 } = req.query;

      const [error, paginationDto] = PaginationDto.create( +page, +limit );

      if (error) {
        res.status(400).json({error})
        return;
      }
     
      this.productService.getProducts( paginationDto! )
          .then( categories => res.status(200).json( categories ) )
          .catch( err => this.handleError( err, res ) )
  

      }

}


