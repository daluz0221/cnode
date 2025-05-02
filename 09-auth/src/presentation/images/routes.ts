
import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ImageController } from "./controller";





export class ImagesRoutes {


  static get routes(): Router {

    const router = Router();
    const imageController = new ImageController()

    router.get('/:type/:img', imageController.getImage)

    return router;
  }


}

