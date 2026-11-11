import { CreateTodoDto, UpdateTodoDto } from "../dtos/index";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoDatasource {
  abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;

  // todo: pagination
  abstract getAll(): Promise<TodoEntity[]>;
  abstract findById(id: number): Promise<TodoEntity | null>;
  abstract updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity | null>;
  abstract deleteById(id: number): Promise<TodoEntity | null>;
}
