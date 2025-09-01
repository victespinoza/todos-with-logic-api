import Todo from "./Todo";

export default interface TodoRepository {
  getAll(): Promise<Todo[]>;
  save(save: Todo): Promise<void>;
}
