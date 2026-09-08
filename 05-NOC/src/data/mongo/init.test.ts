import mongoose from "mongoose";
import { afterEach, describe, expect, test } from "vitest";
import { MongoDatabase } from "./init";

describe("init MongoDB", () => {
  afterEach(() => {
    mongoose.connection.close();
  });

  test("should connect to MongoDB", async () => {
    const connected = await MongoDatabase.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!,
    });
    expect(connected).toBe(true);
  });
  test("should throw error if connection fails", async () => {
    try {
      const connected2 = await MongoDatabase.connect({
        dbName: "NOC-TEST",
        mongoUrl: "mongodb://crhistian:123456@localhost:27017/",
      });
      expect(connected2).toThrow(Error);
    } catch (error) {
      const errorMessage = (error as Error).message;
      expect(errorMessage).toContain("Authentication failed.");
    }
  });
});
