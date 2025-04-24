import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";



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
            throw `Todo with id ${ id } not found`
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
             throw `Todo with id ${ updateTodoDto.id } not found`
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
            throw `Todo with id ${ id } not found`
        }
    }

}



