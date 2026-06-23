import { describe, expect, test, vitest } from "vitest";
import { ServerApp } from "./server-app.ts";
import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

describe("Tests server-app", () => {
  const fileName = "table-5";

  const options = {
    base: 5,
    show: false,
    limit: 10,
    fileName,
    fileDestination: "./outputs",
  };

  test("should run the server-app", () => {
    const serverApp = new ServerApp();

    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(ServerApp.run).toBeInstanceOf(Function);
  });

  test("should run the server-app with options", () => {
    const logSpy = vitest.spyOn(console, "log");
    const serverApp = new ServerApp();

    const createTableSpy = vitest.spyOn(CreateTable.prototype, "execute");
    const saveFileSpy = vitest.spyOn(SaveFile.prototype, "execute");

    ServerApp.run(options);

    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(ServerApp.run).toBeInstanceOf(Function);

    expect(logSpy).toHaveBeenCalledWith("Server running...");
    expect(logSpy).toHaveBeenLastCalledWith("File created!!:", fileName);

    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileName: options.fileName,
      fileDestination: options.fileDestination,
    });
  });

  test("should run with custom values mocked", () => {
    const logMock = vitest.fn();
    const createMock = vitest.fn().mockReturnValue("1 x 2 = 2");
    const saveFileMock = vitest.fn();

    console.log = logMock;
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith("Server running...");
    expect(createMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });
  });
});
