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

  // "{"level":"low","message":"This is a low severity log","createdAt":"2023-06-01T12:00:00.000Z"}"
  static fromJson(json: string): LogEntity {
    const { message, level, createdAt, origin } = JSON.parse(json);

    // const { parsedMessage, parsedLevel, parsedCreatedAt } =
    //   this.formatValidation(level, message, createdAt);

    const log = new LogEntity({
      level,
      message,
      createdAt,
      origin,
    });
    return log;
  }

  // private static formatValidation(level: any, message: any, createdAt: any) {
  //   if (
  //     !level ||
  //     !Object.values(LogSeverityLevel).includes(level as LogSeverityLevel) ||
  //     !message ||
  //     typeof message !== "string" ||
  //     !createdAt ||
  //     !(new Date(createdAt) instanceof Date)
  //   )
  //     throw new Error("Invalid log format");

  //   const parsedCreatedAt = new Date(createdAt);
  //   const parsedMessage = message as string;
  //   const parsedLevel = level as LogSeverityLevel;
  //   return { parsedMessage, parsedLevel, parsedCreatedAt };
  // }
}
