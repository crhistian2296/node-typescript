import fs from "fs";
import path from "path";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
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

  test("should save a log in logs-low.log", () => {
    const logDataSource = new FileSystemDatasource();
    const log = new LogEntity({
      message: "test",
      level: LogSeverityLevel.low,
      origin: "file-system.datasource.test.ts",
    });

    logDataSource.saveLog(log);

    const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, "utf-8");
    // console.log(allLogs)
    expect(allLogs).toContain(JSON.stringify(log));
  });

  test("should save a log in logs-medium.log", () => {
    const logDataSource = new FileSystemDatasource();
    const log = new LogEntity({
      message: "test",
      level: LogSeverityLevel.medium,
      origin: "file-system.datasource.test.ts",
    });

    logDataSource.saveLog(log);

    const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, "utf-8");
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, "utf-8");

    expect(allLogs).toContain(JSON.stringify(log));
    expect(mediumLogs).toContain(JSON.stringify(log));
  });

  test("should save a log in logs-high.log", () => {
    const logDataSource = new FileSystemDatasource();
    const log = new LogEntity({
      message: "test",
      level: LogSeverityLevel.high,
      origin: "file-system.datasource.test.ts",
    });

    logDataSource.saveLog(log);

    const allLogs = fs.readFileSync(`${logPath}/logs-high.log`, "utf-8");
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, "utf-8");

    expect(allLogs).toContain(JSON.stringify(log));
    expect(highLogs).toContain(JSON.stringify(log));
  });

  test("should return all logs", async () => {
    const logDataSource = new FileSystemDatasource();

    const lowLog = new LogEntity({
      message: "test",
      level: LogSeverityLevel.low,
      origin: "file-system.datasource.test.ts",
    });

    const mediumLog = new LogEntity({
      message: "test",
      level: LogSeverityLevel.medium,
      origin: "file-system.datasource.test.ts",
    });

    const highLog = new LogEntity({
      message: "test",
      level: LogSeverityLevel.high,
      origin: "file-system.datasource.test.ts",
    });

    logDataSource.saveLog(lowLog);
    logDataSource.saveLog(mediumLog);
    logDataSource.saveLog(highLog);

    const logsLow = await logDataSource.getLogs(LogSeverityLevel.low);
    const logsMedium = await logDataSource.getLogs(LogSeverityLevel.medium);
    const logsHigh = await logDataSource.getLogs(LogSeverityLevel.high);

    expect(logsLow).toEqual(
      expect.arrayContaining([lowLog, mediumLog, highLog]),
    );
    expect(logsMedium).toEqual(expect.arrayContaining([mediumLog]));
    expect(logsHigh).toEqual(expect.arrayContaining([highLog]));
  });

  test("should throw an error if severity level is not defined", async () => {
    const logDataSource = new FileSystemDatasource();
    const customLevel = "hyper-high" as LogSeverityLevel;

    try {
      const levelError = await logDataSource.getLogs(customLevel);
    } catch (error) {
      const errorMessage = `${error}`;
      expect(errorMessage).toBe("Error: Invalid severity level: hyper-high");
    }
  });
});
