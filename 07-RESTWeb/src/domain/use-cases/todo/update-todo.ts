import { UpdateTodoDto } from "../../dtos/index";
import { TodoEntity } from "../../entities/todo.entity.js";
import { TodoRepository } from "../../repositories/todo.repository.js";

export interface UpdateTodoUseCase {
  execute(updateTodoDto: UpdateTodoDto): Promise<TodoEntity | null>;
}

export class UpdateTodo implements UpdateTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(dto: UpdateTodoDto): Promise<TodoEntity | null> {
    return this.repository.updateById(dto);
  }
}
