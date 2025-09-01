import Todo from "./Todo";

export default interface TodoRepository {
  save(save: Todo): Promise<void>;
}
