import Todo from "@/domain/todo/Todo";
import NoValidTodoException from "@/domain/todo/NoValidTodoException";
import TodoRepository from "@/domain/todo/TodoRepository";
import CreateTodo from "@/useCase/CreateTodo";
import Amount from "@/domain/amount/Amount";

describe("Create Todo Should", () => {
  let todoRepository: TodoRepository;
  beforeEach(() => {
    todoRepository = {} as TodoRepository;
    todoRepository.save = jest.fn();
  });

  it("Create a Todo", async () => {
    const name = "deposit";
    const amount = 1000;
    const currency = "USD";
    const todo = new Todo(name, new Amount(amount, currency));

    const action = new CreateTodo(todoRepository);
    await action.execute(name, amount, currency);
    expect(todoRepository.save).toHaveBeenCalledWith(todo);
  });

  it("Throw error if got an invalid amount", () => {
    const name = "deposit";
    const amount = -1000;
    const currency = "USD";

    const action = new CreateTodo(todoRepository);
    expect(() => action.execute(name, amount, currency)).rejects.toThrow(
      NoValidTodoException
    );
  });
});
