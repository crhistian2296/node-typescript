import { describe, expect, test } from "vitest";
import { envs } from "./envs.plugin";

describe("envs.plugin.ts", () => {
  test("should return env options", () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: "gmail",
      MAILER_EMAIL: "cristofervanhelsin@gmail.com",
      MAILER_PASSWORD: "@Vanhelsin999",
      MAILER_SECRET_KEY: "fcfikavghmvpfzwu",
      PRO: false,
      MONGO_URL: "mongodb://crhistian:123456789@localhost:27017/",
      MONGO_DB_NAME: "NOC-TEST",
      MONGO_USER: "crhistian",
      MONGO_PASS: "123456789",
      POSTGRES_URL:
        "postgresql://postgres:123456789@localhost:5432/NOC?schema=public",
      POSTGRES_DB: "NOC-TEST",
      POSTGRES_USER: "postgres",
      POSTGRES_PASSWORD: "123456789",
    });
  });
});
