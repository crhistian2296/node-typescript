import { type Request, type Response } from "express";

interface Todo {
  id: number;
  text: string;
  completedAt: Date | null;
}

const todos: Todo[] = [
  { id: 1, text: "Buy milk", completedAt: new Date() },
  { id: 2, text: "Buy bread", completedAt: null },
  { id: 3, text: "Buy butter", completedAt: new Date() },
];

export class TodosController {
  // * DI
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id))
      return res.status(400).json({ error: "Invalid ID: must be a number" });

    const todo = todos.find((t) => t.id === id);

    if (!todo) return res.status(404).json({ error: "Todo not found" });

    res.json({ todo });
  };

  public createTodo = (req: Request, res: Response) => {
    const text = String(req.body.text);

    if (!text) {
      return res.status(400).json({
        error: "Invalid input: 'text' is required and must be a string",
      });
    }

    const newTodo: Todo = {
      id: todos.length + 1,
      text,
      completedAt: new Date(),
    };

    todos.push(newTodo);
    res.status(201).json(todos);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const text = String(req.body.text);
    const completedAt = req.body.completedAt
      ? new Date(req.body.completedAt)
      : null;
    // const {id, text}: { id: number; text: string } = (req.body);

    if (isNaN(id))
      return res.status(400).json({ error: "Invalid ID: must be a number" });

    // if (!text) {
    //   return res.status(400).json({
    //     error: "Invalid input: 'text' is required and must be a string",
    //   });
    // }

    // const todoIndex = todos.findIndex((t) => t.id === id);

    const todo = todos.find((t) => t.id === id);

    if (!todo) return res.status(404).json({ error: "Todo not found" });

    todo.text = text ?? todo.text;
    completedAt === null
      ? (todo.completedAt = null)
      : (todo.completedAt = completedAt ?? todo.completedAt);
    res.json(todo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id))
      return res.status(400).json({ error: "Invalid ID: must be a number" });

    const todoIndex = todos.findIndex((t) => t.id === id);

    if (todoIndex === -1)
      return res.status(404).json({ error: "Todo not found" });

    todos.splice(todoIndex, 1);
    // delete todos[todoIndex];
    res.status(200).json({ message: "Todo deleted successfully" });
  };
}
