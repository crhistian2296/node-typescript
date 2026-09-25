import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { db } from "../../prisma/db";
import { PostgresLogDataSource } from "./postgres-log.datasource";

describe("postgres-log-datasources.ts", () => {
  const logDataSource = new PostgresLogDataSource();

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.close();
  });

  test("should create a log", async () => {
    const logSpy = vitest.spyOn(console, "log");

    const log = new LogEntity({
      level: LogSeverityLevel.medium,
      message: "test message",
      origin: "mongo-log.datasource.test.ts",
    });

    await logDataSource.saveLog(log);
    expect(logSpy).toHaveBeenCalledWith(
      "Postgres log created:",
      expect.any(Number),
    );
  });

  test("should get logs", async () => {
    const mediumSeverityLogs = await logDataSource.getLogs(
      LogSeverityLevel.medium,
    );

    expect(mediumSeverityLogs.at(-1)?.level.toLowerCase()).toBe(
      LogSeverityLevel.medium,
    );
  });
});
