import { TodoEntity } from "../../entities/todo.entity.js";
import { TodoRepository } from "../../repositories/todo.repository.js";

export interface DeleteTodoUseCase {
  execute(id: number): Promise<TodoEntity | null>;
}

export class DeleteTodo implements DeleteTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(id: number): Promise<TodoEntity | null> {
    return this.repository.deleteById(id);
  }
}
