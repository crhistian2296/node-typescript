import fs from "fs";
import { afterEach, describe, expect, test, vitest } from "vitest";
import { SaveFile } from "./save-file.use-case";
describe("SaveFileUseCase", () => {
  afterEach(() => {
    // clean up

    if (fs.existsSync("outputs")) fs.rmSync("outputs", { recursive: true });
    if (fs.existsSync("outputs")) fs.rmSync("outputs", { recursive: true });
    vitest.clearAllMocks();
  });

  test("should save file with default values", () => {
    const saveFile = new SaveFile();
    const options = { fileContent: "test-content" };

    const result = saveFile.execute(options);
    const filePath = "outputs/table.txt";

    expect(result).toBe(true);
    const fileExist = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

    expect(fileExist).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });

  test("should save file witch dustom values", () => {
    const options = {
      fileContent: "custom content",
      fileDestination: "outputs",
      fileName: "custom-table-name",
    };

    const saveFile = new SaveFile();

    const result = saveFile.execute(options);
    const filePath = `${options.fileDestination}/${options.fileName}.txt`;

    expect(result).toBe(true);
    const fileExist = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

    expect(fileExist).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });

  test("should return false if file cannot be created", () => {
    const saveFile = new SaveFile();

    const mkdirSpy = vitest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("mkdirSync Mocked error");
    });

    const result = saveFile.execute({ fileContent: "test" });

    expect(result).toBe(false);
    expect(mkdirSpy).toHaveBeenCalled();

    mkdirSpy.mockRestore();
  });

  test("should return false if file cannot be created", () => {
    const saveFile = new SaveFile();

    const writeFileSpy = vitest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {
        throw new Error("writeFileSync Mocked error");
      });

    const result = saveFile.execute({ fileContent: "test" });

    expect(result).toBe(false);
    expect(writeFileSpy).toHaveBeenCalled();

    writeFileSpy.mockRestore();
  });
});
