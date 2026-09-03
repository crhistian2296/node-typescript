import { LogDataSource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { db } from "../../prisma/db";

const prisma = db.orm.public;
enum severityLevelMap {
  high = "HIGH",
  medium = "MEDIUM",
  low = "LOW",
}

export class PostgresLogDataSource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    let { message, origin } = log;
    let level = severityLevelMap[log.level];
    const newLog = await prisma.LogModel.create({
      level,
      message,
      origin,
    });
    console.log("Postgres log created:", newLog.id);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    let level = severityLevelMap[severityLevel];
    const logs = await prisma.LogModel.where({ level }).all();
    return logs.map(LogEntity.fromData);
  }
}
