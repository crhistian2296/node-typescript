import { LogEntity, LogSeverityLevel } from "../entities/log.entity.js";

export abstract class LogDataRepository {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
