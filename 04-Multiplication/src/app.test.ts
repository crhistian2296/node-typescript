import { describe, expect, test, vitest } from "vitest";
import { ServerApp } from "./presentation/server-app";

describe("Test app.ts", async () => {
  test("should run the main function", async () => {
    const serverMock = vitest.fn();
    ServerApp.run = serverMock;

    const args = [
      "node",
      "app.ts",
      "-b",
      "10",
      "-l",
      "5",
      "-s",
      "-n",
      "test-file",
      "-d",
      "test-path",
    ];
    process.argv = args;

    await import("./app");

    expect(serverMock).toHaveBeenCalledTimes(1);
    expect(serverMock).toHaveBeenCalledWith({
      base: 10,
      show: true,
      limit: 5,
      fileName: "test-file",
      fileDestination: "test-path",
    });
  });
});
