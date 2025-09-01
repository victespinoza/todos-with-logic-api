import TodoResponseDTO from "@/adapter/TodoResponseDTO";
import Todo from "@/domain/todo/Todo";
import TodoRepository from "@/domain/todo/TodoRepository";

export default class ListTodo {
  constructor(private todoRepository: TodoRepository) {}

  async execute(): Promise<TodoResponseDTO[]> {
    return (await this.todoRepository.getAll()).map(toTodoDTO);
  }
}

const toTodoDTO = ({
  name,
  amount: { currency, amount },
}: Todo): TodoResponseDTO => {
  return {
    name,
    currency,
    amount,
  };
};
