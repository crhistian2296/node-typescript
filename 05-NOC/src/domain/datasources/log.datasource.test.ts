import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDataSource } from "./log.datasource";

describe("log.datasource.ts", () => {
  const newLog = new LogEntity({
    level: LogSeverityLevel.low,
    message: "testing",
    origin: "log.datasources.test.ts",
  });

  class MockLogDatasource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [newLog];
    }
  }

  test("should test the abstract class", async () => {
    const mockLogDatasource = new MockLogDatasource();

    expect(mockLogDatasource).toBeDefined();
    expect(mockLogDatasource.saveLog).toBeDefined();
    expect(mockLogDatasource.saveLog).toBeDefined();
    expect(typeof mockLogDatasource.getLogs).toBe("function");
    expect(typeof mockLogDatasource.getLogs).toBe("function");

    await mockLogDatasource.saveLog(newLog);
    const logs = await mockLogDatasource.getLogs(LogSeverityLevel.low);
    expect(logs).toEqual([newLog]);
    expect(logs[0].level).toBe(LogSeverityLevel.low);
  });
});
