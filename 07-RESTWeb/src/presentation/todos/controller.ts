import { type Request, type Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/index.js";
import { TodoRepository } from "../../domain/index.js";
import {
  CreateTodo,
  DeleteTodo,
  GetTodo,
  GetTodos,
  UpdateTodo,
} from "../../domain/use-cases/todo/index.js";

export class TodosController {
  // * DI
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const getTodosUseCase = new GetTodos(this.todoRepository);
    const todos = await getTodosUseCase.execute();
    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const getTodoUseCase = new GetTodo(this.todoRepository);

    if (!Number.isInteger(id) || id <= 0)
      return res.status(400).json({ error: "Invalid ID: must be a number" });

    const todo = await getTodoUseCase.execute(id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    return res.json(todo);
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error || !createTodoDto) {
      return res.status(400).json({
        error,
      });
    }

    const createTodoUseCase = new CreateTodo(this.todoRepository);

    const todo = await createTodoUseCase.execute(createTodoDto);
    return res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
    const updateTodoUseCase = new UpdateTodo(this.todoRepository);

    if (error || !updateTodoDto) return res.status(400).json(error);

    const todo = await updateTodoUseCase.execute(updateTodoDto);
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    return res.json(todo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deleteTodoUseCase = new DeleteTodo(this.todoRepository);
    if (!Number.isInteger(id) || id <= 0)
      return res.status(400).json({ error: "Invalid ID: must be a number" });

    const todo = await deleteTodoUseCase.execute(id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    return res.json({ todo, message: "Todo deleted successfully" });
  };
}
