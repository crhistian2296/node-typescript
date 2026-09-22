import { LogEntity, LogSeverityLevel } from "./log.entity";

describe("log.entity.ts", () => {
  test("should create a LogEntity instance", () => {
    const log = new LogEntity({
      level: LogSeverityLevel.low,
      message: "testing",
      origin: "log.entity.test.ts",
    });
    expect(log).toBeInstanceOf(LogEntity);
    expect(log.level).toBe(LogSeverityLevel.low);
    expect(log.message).toBe("testing");
    expect(log.origin).toBe("log.entity.test.ts");
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("should create a LogEntity instance from an object", () => {
    const logObj = {
      level: LogSeverityLevel.low,
      message: "testing",
      origin: "log.entity.test.ts",
      createdAt: new Date(),
    };
    expect(LogEntity.fromData(logObj)).toBeInstanceOf(LogEntity);
    expect(logObj.level).toBe(LogSeverityLevel.low);
    expect(logObj.message).toBe("testing");
    expect(logObj.origin).toBe("log.entity.test.ts");
    expect(logObj.createdAt).toBeInstanceOf(Date);
  });

  test("should create a LogEntity instance from an string", () => {
    const logString =
      '{"level":"low","message":"Service http://google.com/ is up and running","createdAt":"2026-09-02T01:21:30.231Z","origin":"check-service.ts"}';
    const logObj = LogEntity.fromData(logString);

    expect(LogEntity.fromData(logString)).toBeInstanceOf(LogEntity);
    expect(logObj.level).toBe(LogSeverityLevel.low);
    expect(logObj.message).toBe("Service http://google.com/ is up and running");
    expect(logObj.origin).toBe("check-service.ts");
    expect(new Date(logObj.createdAt)).toBeInstanceOf(Date);
  });

  test("should fail to create a LogEntity instance from an object", () => {
    const logObj = {
      level: LogSeverityLevel.low,
      message: "testing",
      origin: "log.entity.test.ts",
    };
    try {
      LogEntity.fromData(logObj);
    } catch (error) {
      const errorMessage = (error as Error).message;
      expect(errorMessage).toContain("Invalid log object:");
    }
  });
});
