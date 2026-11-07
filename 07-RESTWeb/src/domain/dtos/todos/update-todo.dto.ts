export class UpdateTodoDto {
  private constructor(
    public readonly id: number,
    public readonly text: string,
    public readonly completedAt?: Date,
  ) {}

  get values() {
    const returnObj: Record<string, any> = {};
    if (this.text) returnObj.text = this.text;
    if (this.completedAt) returnObj.completedAt = this.completedAt;
    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    const { id, text, completedAt } = props;
    let newCompletedAt: Date | undefined;

    if (!id || isNaN(Number(id)))
      return ['Invalid input: "id" is required and must be a number'];

    if (!text && !completedAt)
      return [
        'Invalid input: at least one of "text" or "completedAt" is required',
      ];

    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (isNaN(newCompletedAt.getTime())) {
        return [
          'Invalid input: "completedAt" must be a valid date string or null',
        ];
      }
    }

    return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
  }
}
