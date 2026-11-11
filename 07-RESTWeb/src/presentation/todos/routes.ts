import { Router } from "express";
import { TodoDatasourceImpl } from "../../infrastructure/datasource/todo.datasource.impl.js";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository.impl.js";
import { TodosController } from "./controller.js";

export class TodosRoutes {
  static get routes(): Router {
    const router = Router();
    const prismaDatasource = new TodoDatasourceImpl();
    const todoRepository = new TodoRepositoryImpl(prismaDatasource);
    const todosController = new TodosController(todoRepository);

    //* Routes
    router.get("/", todosController.getTodos);
    router.get("/:id", todosController.getTodoById);
    router.post("/", todosController.createTodo);
    router.put("/:id", todosController.updateTodo);
    router.delete("/:id", todosController.deleteTodo);
    return router;
  }
}
