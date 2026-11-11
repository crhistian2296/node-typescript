import { prisma } from "../../data/postgres/index.js";
import { TodoDatasource } from "../../domain/datasources/todo.datasource.js";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/index.js";
import { TodoEntity } from "../../domain/entities/todo.entity.js";

export class TodoDatasourceImpl implements TodoDatasource {
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: createTodoDto,
    });
    return TodoEntity.fromData(todo);
  }
  async getAll(): Promise<TodoEntity[]> {
    const allTodos = await prisma.todo.findMany();
    return allTodos.map(TodoEntity.fromData);
  }
  async findById(id: number): Promise<TodoEntity | null> {
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });

    if (!todo) throw new Error(`Todo with id ${id} not found`);

    return TodoEntity.fromData(todo);
  }
  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity | null> {
    // exist todo?
    await this.findById(updateTodoDto.id);

    const updatedTodo = await prisma.todo.update({
      where: {
        id: updateTodoDto.id,
      },
      data: updateTodoDto.values,
    });

    return TodoEntity.fromData(updatedTodo);
  }
  async deleteById(id: number): Promise<TodoEntity | null> {
    await this.findById(id);

    const deletedTodo = await prisma.todo.delete({
      where: {
        id,
      },
    });

    if (!deletedTodo) throw new Error(`Todo with id ${id} not deleted`);

    return TodoEntity.fromData(deletedTodo);
  }
}
