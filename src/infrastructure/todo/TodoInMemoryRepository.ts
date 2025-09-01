import Todo from "@/domain/todo/Todo";
import TodoRepository from "@/domain/todo/TodoRepository";

const memory = new Map<string, Todo>();

export default class TodoInMemoryRepository implements TodoRepository {
  async save(todo: Todo): Promise<void> {
    if (memory.has(todo.name)) throw new Error("Todo already exists");
    memory.set(todo.name, todo);
  }
}
