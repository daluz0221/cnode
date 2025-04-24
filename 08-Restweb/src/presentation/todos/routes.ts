import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatasourceImpl } from "../../infraestructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infraestructure/repository/todo.repository.impl";



export class TodoRoutes {


    static get routes():Router {

        const datasource = new TodoDatasourceImpl();
        const TodoRepository = new TodoRepositoryImpl( datasource );


        const router = Router();
        const todosController = new TodosController( TodoRepository ) 


         router.get('/', todosController.getTodos);
         router.get('/:id', todosController.getTodoById);
         
         router.post('/', todosController.createTodo);
         router.put('/:id', todosController.updateTodo);
         router.delete('/:id', todosController.deleteTodo);

        return router;

    }


}




