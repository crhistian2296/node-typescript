import { type Request, type Response } from "express";
import { prisma } from "../../data/postgres/index.js";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/index.js";

interface Todo {
  id: number;
  text: string;
  completedAt: Date | null;
}

export class TodosController {
  // * DI
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const allTodos = await prisma.todo.findMany();
    res.json(allTodos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id))
      return res.status(400).json({ error: "Invalid ID: must be a number" });

    // const todo = todos.find((t) => t.id === id);
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });

    if (!todo) return res.status(404).json({ error: "Todo not found" });

    res.json({ todo });
  };

  public createTodo = async (req: Request, res: Response) => {
    const text = String(req.body.text);
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error || !createTodoDto) {
      return res.status(400).json({
        error,
      });
    }

    const newTodo = await prisma.todo.create({
      data: createTodoDto,
    });

    if (!newTodo) return res.status(400).json({ error: "Todo not created" });

    res.status(201).json(newTodo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error || !updateTodoDto) return res.status(400).json(error);

    const oldTodo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });

    if (!oldTodo) return res.status(404).json({ error: "Todo not found" });

    const todo = await prisma.todo.update({
      where: {
        id,
      },
      data: updateTodoDto.values,
    });

    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json(todo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id))
      return res.status(400).json({ error: "Invalid ID: must be a number" });

    // const todoIndex = todos.findIndex((t) => t.id === id);

    // if (todoIndex === -1)
    //   return res.status(404).json({ error: "Todo not found" });

    // todos.splice(todoIndex, 1);
    // // delete todos[todoIndex];
    const oldTodo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });
    if (!oldTodo) return res.status(404).json({ error: "Todo not found" });

    const deletedTodo = await prisma.todo.delete({
      where: {
        id,
      },
    });

    if (!deletedTodo)
      return res.status(400).json({ error: "Todo not deleted" });
    res.status(200).json({ message: "Todo deleted successfully" });
  };
}
