import Amount from "@/domain/amount/Amount";
import NegativeAmountException from "@/domain/amount/NegativeAmountException";
import NotAllowedCurrencyException from "@/domain/amount/NotAllowedCurrencyException";
import NoValidTodoException from "@/domain/todo/NoValidTodoException";
import Todo from "@/domain/todo/Todo";
import TodoRepository from "@/domain/todo/TodoRepository";

export default class CreateTodo {
  constructor(private todoRepository: TodoRepository) {}
  async execute(name: string, amount: number, currency: string): Promise<void> {
    try {
      const todoAmount = new Amount(amount, currency);
      const todo = new Todo(name, todoAmount);
      await this.todoRepository.save(todo);
    } catch (e) {
      if (
        e instanceof NegativeAmountException ||
        e instanceof NotAllowedCurrencyException
      ) {
        throw new NoValidTodoException("No valid Todo amount");
      }
    }
  }
}
