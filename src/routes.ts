import { Router } from "express";
import todoController from "./adapter/TodoController";

const router = Router();

router.post("/todo", todoController.createTodo);
router.get("/todo", todoController.getTodo);

export default router;
