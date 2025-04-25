import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";
import { CustomError } from "../../domain/errors/custom.errors";



export class TodoDatasourceImpl implements TodoDatasource{


    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto!
            
        });

        return TodoEntity.fromObject( todo );
    }

    async getAll(): Promise<TodoEntity[]> {
         const newTodos = await prisma.todo.findMany();

         return newTodos.map( todo => TodoEntity.fromObject( todo ) );
    }

    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findUnique({
            where: {
                id
            }
        });

        if (!todo) {
            throw new CustomError(`Todo with id ${ id } not found`, 404)
        }

        return TodoEntity.fromObject( todo );
    }

    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        try {
            const todo = await prisma.todo.update({
                where: {
                    id: updateTodoDto.id
                },
                data: updateTodoDto!.values
            });
            
            return TodoEntity.fromObject( todo ) 
        } catch (error) {
             throw new CustomError(`Todo with id ${ updateTodoDto.id } not found`, 404)
        }
    }

    async deleteById(id: number): Promise<TodoEntity> {
        try {
            const deleteTodo = await prisma.todo.delete({
                where: {
                    id
                }
            });
            
            return TodoEntity.fromObject( deleteTodo )
        } catch (error) {
            throw new CustomError(`Todo with id ${ id } not found`, 404)
        }
    }

}



