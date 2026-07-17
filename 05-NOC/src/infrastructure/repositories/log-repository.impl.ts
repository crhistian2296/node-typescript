import { LogDataSource } from "../../domain/datasources/log.datasources.js";
import {
  LogEntity,
  LogSeverityLevel,
} from "../../domain/entities/log.entity.js";
import { LogRepository } from "../../domain/repository/log.repository.js";

export class LogRepositoryImpl extends LogRepository {
  constructor(private readonly logDataSource: LogDataSource) {
    super();
  }

  saveLog(log: LogEntity): Promise<void> {
    return this.logDataSource.saveLog(log);
  }
  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDataSource.getLogs(severityLevel);
  }
}
