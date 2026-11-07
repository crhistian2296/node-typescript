export class CreateTodoDto {
  private constructor(public readonly text: string) {}

  static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {
    const { text } = props;
    if (!text || typeof text !== "string") {
      return ['Invalid input: "text" is required and must be a string'];
    }
    return [undefined, new CreateTodoDto(text)];
  }
}
