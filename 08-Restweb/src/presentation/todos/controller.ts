import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";



export class TodosController {
    
    //* DI
    constructor(){

    }

    public getTodos = async(req:Request, res:Response) => {

        const newTodos = await prisma.todo.findMany()

        res.json(newTodos);
        return;
    };

    public getTodoById = async(req:Request, res:Response) => {
        const id = +req.params.id;
        if (isNaN(id)) {
            res.status(400).json({error: 'ID argument is not a number'});
            return
        }

        const todo = await prisma.todo.findUnique({
            where: {
                id
            }
        });

        console.log({todo});
        
        
        todo 
        ? res.json( todo )
        : res.status(404).json({error: `TODO with id ${id } not found`})
    };

    public createTodo = async (req:Request, res:Response) => {

        const [error, createTodoDto] = CreateTodoDto.create( req.body )
        if (error) {
            res.status(400).json({error});
            return;
        }

        const todo = await prisma.todo.create({
            data: createTodoDto!
            
        }); 
      
        res.json(todo)

    };

    public updateTodo = async(req:Request, res:Response) => {

        const id = +req.params.id;
        const [ error, updateTodoDto ] = UpdateTodoDto.create({...req.body, id}) 

        if (error) {
            res.status(400).json({error});
            return;
        }
          
               
        try {
            const todo = await prisma.todo.update({
                where: {
                    id
                },
                data: updateTodoDto!.values
            });
            res.json(todo);
            return;
        } catch (error) {
            res.status(400).json({error: `TODO with id ${id } not found ${error}`});
            return
        }
        
   



        //OJO, referencia


        

    };


    public deleteTodo = async(req:Request, res:Response) => {
        const id = +req.params.id;
        if (isNaN(id)) {
            res.status(400).json({error: 'ID argument is not a number'});
            return
        }

        try {
            const deleteTodo = await prisma.todo.delete({
                where: {
                    id
                }
            });
            res.json( deleteTodo );
            return;
        } catch (error) {
            res.status(400).json({error: `TODO with id ${id } not found`});
            return
        }
   
    }


}



