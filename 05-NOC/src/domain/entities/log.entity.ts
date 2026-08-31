export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { message, level, origin, createdAt = new Date() } = options;

    this.level = level;
    this.message = message;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  private static objLogIsValid(log: LogEntityOptions): boolean {
    const { message, level, createdAt, origin } = log;

    if (!level || !message || !createdAt || !origin) return false;
    return true;
  }

  // "{"level":"low","message":"This is a low severity log","createdAt":"2023-06-01T12:00:00.000Z"}"
  static fromData<T extends string | Record<string, any>>(data: T): LogEntity {
    let obj: Record<string, any>;

    // Si es string, parsear JSON
    if (typeof data === "string") {
      obj = data.length ? JSON.parse(data) : {};
    } else {
      // Si es objeto, usar directamente
      obj = data;
    }

    const { message, level, createdAt, origin } = obj;

    if (!LogEntity.objLogIsValid(obj as LogEntityOptions)) {
      throw new Error(`Invalid log object: ${JSON.stringify(obj)}`);
    }

    const log = new LogEntity({
      level,
      message,
      createdAt,
      origin,
    });

    return log;
  }
}
