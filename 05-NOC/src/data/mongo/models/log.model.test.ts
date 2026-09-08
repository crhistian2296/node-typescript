import mongoose from "mongoose";
import { afterEach, beforeAll, describe, expect, test } from "vitest";
import { LogSeverityLevel } from "../../../domain/entities/log.entity";
import { MongoDatabase } from "../init";
import { LogModel } from "./log.model";

describe("log.model.ts", () => {
  // Test cases for the Log model
  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!,
    });
  });

  afterEach(() => {
    mongoose.connection.close();
  });

  test("should return LogModel", async () => {
    const logData = {
      origin: "test-origin",
      message: "Test log message",
      level: "low" as LogSeverityLevel,
    };

    const log = await LogModel.create(logData);
    expect(log).toBeInstanceOf(LogModel);
    expect(log).toMatchObject({
      ...logData,
      createdAt: expect.any(Date),
      _id: expect.any(mongoose.Types.ObjectId),
    });
    await LogModel.findByIdAndDelete(log._id); // Clean up after test
  });

  test("should return the schema object", () => {
    const schema = LogModel.schema.obj;

    expect(schema).toMatchObject({
      level: {
        type: expect.any(Function),
        enum: ["low", "medium", "high"],
        default: "low",
      },
      message: { type: expect.any(Function), required: true },
      createdAt: { type: expect.any(Function), default: expect.any(Date) },
      origin: { type: expect.any(Function) },
    });
  });
});
