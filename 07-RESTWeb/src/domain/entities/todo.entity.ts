export interface TodoOptions {
  id: number;
  text: string;
  completedAt: Date | null;
}

export class TodoEntity {
  constructor(
    public readonly id: number,
    public readonly text: string,
    public readonly completedAt: Date | null,
  ) {}

  get isCompleted(): boolean {
    return this.completedAt !== null;
  }

  private static todoIsValid(todo: TodoOptions): boolean {
    const { id, text, completedAt } = todo;
    let completedAtAux: Date | null = null;

    if (!id || !text) return false;

    if (completedAt) {
      completedAtAux = new Date(completedAt);
      if (isNaN(completedAtAux.getTime())) return false;
    }
    return true;
  }

  static fromData<T extends string | Record<string, any>>(data: T): TodoEntity {
    let obj: TodoOptions;

    // Si es string, parsear JSON
    if (typeof data === "string") {
      obj = data.length ? JSON.parse(data) : {};
    } else {
      // Si es objeto, usar directamente
      obj = data as TodoOptions;
    }

    const { id, text, completedAt } = obj;

    if (!TodoEntity.todoIsValid(obj)) {
      console.log(obj);
      throw new Error(`Invalid todo object: id and text are required`);
    }

    return new TodoEntity(id, text, completedAt ? new Date(completedAt) : null);
  }
}
