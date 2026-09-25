import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { MongoDatabase } from "../../data/mongo";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { MongoLogDatasource } from "./mongo-log.datasource";

describe("mongo-log-datasources.ts", () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  const logDataSource = new MongoLogDatasource();

  test("should create a log", async () => {
    const logSpy = vitest.spyOn(console, "log");

    const log = new LogEntity({
      level: LogSeverityLevel.medium,
      message: "test message",
      origin: "mongo-log.datasource.test.ts",
    });

    await logDataSource.saveLog(log);
    expect(logSpy).toHaveBeenCalledWith(
      "Mongo log created:",
      expect.any(String),
    );
  });

  test("should get logs", async () => {
    const mediumSeverityLogs = await logDataSource.getLogs(
      LogSeverityLevel.medium,
    );

    expect(mediumSeverityLogs.at(-1)?.level).toBe(LogSeverityLevel.medium);
  });
});
