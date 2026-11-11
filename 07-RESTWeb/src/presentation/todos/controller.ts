import { type Request, type Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/index.js";
import { TodoRepository } from "../../domain/index.js";

export class TodosController {
  // * DI
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const allTodos = await this.todoRepository.getAll();
    return res.json(allTodos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id))
      return res.status(400).json({ error: "Invalid ID: must be a number" });

    try {
      const todo = await this.todoRepository.findById(id);
      return res.json(todo);
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;
        return res.status(404).json({ error: errorMessage });
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

    const newTodo = await this.todoRepository.create(createTodoDto);

    res.status(201).json(newTodo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error || !updateTodoDto) return res.status(400).json(error);

    const todo = await this.todoRepository.updateById(updateTodoDto);
    return res.json(todo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id))
      return res.status(400).json({ error: "Invalid ID: must be a number" });

    const deletedTodo = await this.todoRepository.deleteById(id);

    if (!deletedTodo)
      return res.status(400).json({ error: "Todo not deleted" });

    res.status(200).json({ message: "Todo deleted successfully" });
  };
}
