import { EmailService } from "../../../presentation/email/email.service.js";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity.js";
import { LogRepository } from "../../repository/log.repository.js";

interface SendLogsEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

const fileName = "send-logs.ts";
export class SendEmailLogs implements SendLogsEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository,
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
      if (!sent) throw new Error("Error sending email with logs:");
      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Email with logs sent successfully to ${to}`,
        origin: fileName,
      });
      this.logRepository.saveLog(log);
    } catch (error) {
      console.error(error);
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: `Error sending email with logs: ${error}`,
        origin: fileName,
      });
      this.logRepository.saveLog(log);
      return false;
    }
    return true;
  }
}
