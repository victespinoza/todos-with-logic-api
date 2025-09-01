export default class NoValidTodoException extends Error {
  constructor(message: string) {
    super(message);
  }
}
