import NoValidTodoException from "@/domain/todo/NoValidTodoException";
import TodoInMemoryRepository from "@/infrastructure/todo/TodoInMemoryRepository";
import CreateTodo from "@/useCase/CreateTodo";
import ListTodo from "@/useCase/ListTodo";
import { Request, Response } from "express";

class TodoController {
  async createTodo(req: Request, res: Response) {
    try {
      const name = req.body["name"];
      const amount = req.body["amount"];
      const currency = req.body["currency"];

      const todoRepository = new TodoInMemoryRepository();
      const createTodo = new CreateTodo(todoRepository);
      await createTodo.execute(name, amount, currency);
      res.status(201).send("Created");
    } catch (e) {
      if (e instanceof NoValidTodoException) {
        res.status(400).send(e.message);
      } else {
        res.status(500).send("Unexpected error");
      }
    }
  }

  async getTodo(req: Request, res: Response) {
    const todoRepository = new TodoInMemoryRepository();
    const listTodo = new ListTodo(todoRepository);
    const todos = await listTodo.execute();
    console.info(todos);
    res.status(200).send(todos);
  }
}

export default new TodoController();
