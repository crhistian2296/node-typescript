import { envs } from "../config/plugins/envs.plugin.js";
import { LogSeverityLevel } from "../domain/entities/log.entity.js";
import { SendEmailLogs } from "../domain/use-case/email/send-logs.js";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource.js";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-repository.impl.js";
import { EmailService } from "./email/email.service.js";

const logRepository = new LogRepositoryImpl(
  // new FileSystemDatasource(),
  new MongoLogDatasource(),
);

const emailService = new EmailService();

const endpoint = "http://googdfsdfle.com/";

export class Server {
  public static async start() {
    console.log("Server started...");

    // Mandar email
    // await emailService.sendEmailWithFileSystemLogs([
    //   envs.MAILER_EMAIL,
    //   "ca.garcia.urbano@gmail.com",
    // ]);

    // Refactorizado para usar el caso de uso SendEmailLogs
    new SendEmailLogs(emailService, logRepository).execute([envs.MAILER_EMAIL]);

    const logsHigh = await logRepository.getLogs(LogSeverityLevel.high);

    console.log("high logs:", logsHigh);

    // CronService.createJob("*/5 * * * * *", () => {
    //   console.log("Cron job executed every 5 seconds", new Date());
    //   new CheckService(logRepository).execute(endpoint);
    //   // new CheckService().execute("http://localhost:3000/posts");
    // });
  }
}
