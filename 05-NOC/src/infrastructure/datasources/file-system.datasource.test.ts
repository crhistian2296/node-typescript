import fs from "fs";
import path from "path";
import { FileSystemDatasource } from "./file-system.datasource";
describe("file-system.datasource.ts", () => {
  const logPath = path.join(__dirname, "../../../logs");
  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  test("should create log files if they do not exists", () => {
    // Se crea el directorio y archivos de logs
    new FileSystemDatasource();

    const files = fs.readdirSync(logPath);
    expect(files).toEqual(["logs-high.log", "logs-low.log", "logs-medium.log"]);
  });
});
