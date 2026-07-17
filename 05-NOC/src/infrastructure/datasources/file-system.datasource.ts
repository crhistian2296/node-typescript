import fs from "fs";
import { LogDataSource } from "../../domain/datasources/log.datasources.js";
import {
  LogEntity,
  LogSeverityLevel,
} from "../../domain/entities/log.entity.js";

export class FileSystemDatasource implements LogDataSource {
  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/logs-low.log";
  private readonly mediumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath = "logs/logs-high.log";
  private readonly allPaths = [
    this.allLogsPath,
    this.mediumLogsPath,
    this.highLogsPath,
  ];

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) fs.mkdirSync(this.logPath);

    this.allPaths.forEach((path) => {
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, "");
      }
    });
  };

  saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`;

    fs.appendFileSync(this.allLogsPath, logAsJson);

    if (newLog.level === LogSeverityLevel.low) return Promise.resolve();
    if (newLog.level === LogSeverityLevel.medium)
      fs.appendFileSync(this.mediumLogsPath, logAsJson);
    if (newLog.level === LogSeverityLevel.high)
      fs.appendFileSync(this.highLogsPath, logAsJson);

    return Promise.resolve();
  }

  private getLogsFromFile = (filePath: string): LogEntity[] => {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const logsAsEntities = fileContent.split("\n").map(LogEntity.fromJson);

    return logsAsEntities;
  };

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    // throw new Error("Method not implemented.");
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath);
      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);
      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath);
      default:
        throw new Error(`Invalid severity level: ${severityLevel}`);
    }
  }
}
