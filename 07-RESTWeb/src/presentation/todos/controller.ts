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

    try {
      const todos = await getTodosUseCase.execute();
      res.json(todos);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        return res.status(400).json({ error });
      }
    }
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const getTodoUseCase = new GetTodo(this.todoRepository);

    if (isNaN(id))
      return res.status(400).json({ error: "Invalid ID: must be a number" });

    try {
      const todo = await getTodoUseCase.execute(id);
      return res.json(todo);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error || !createTodoDto) {
      return res.status(400).json({
        error,
      });
    }

    const createTodoUseCase = new CreateTodo(this.todoRepository);

    try {
      const todo = await createTodoUseCase.execute(createTodoDto);
      res.json(todo);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
    const updateTodoUseCase = new UpdateTodo(this.todoRepository);

    if (error || !updateTodoDto) return res.status(400).json(error);

    // const todo = await this.todoRepository.updateById(updateTodoDto);
    // return res.json(todo);
    try {
      const todo = await updateTodoUseCase.execute(updateTodoDto);
      return res.json(todo);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deleteTodoUseCase = new DeleteTodo(this.todoRepository);
    if (isNaN(id))
      return res.status(400).json({ error: "Invalid ID: must be a number" });

    try {
      const todo = await deleteTodoUseCase.execute(id);
      return res.json({ todo, message: "Todo deleted succesfully" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  };
}
