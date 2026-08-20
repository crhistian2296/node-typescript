import { envs } from "../config/plugins/envs.plugin.js";
import { SendEmailLogs } from "../domain/use-case/email/send-logs.js";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource.js";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-repository.impl.js";
import { EmailService } from "./email/email.service.js";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
);
const emailService = new EmailService();

// const endpoint = "http://localhost:3000/";

export class Server {
  public static async start() {
    console.log("Server started...");

    // Mandar email
    // await emailService.sendEmailWithFileSystemLogs([
    //   envs.MAILER_EMAIL,
    //   "ca.garcia.urbano@gmail.com",
    // ]);

    // Refactorizado para usar el caso de uso SendEmailLogs
    new SendEmailLogs(emailService, fileSystemLogRepository).execute([
      envs.MAILER_EMAIL,
      "ca.garcia.urbano@gmail.com",
    ]);

    // CronService.createJob("*/5 * * * * *", () => {
    //   console.log("Cron job executed every 5 seconds", new Date());
    //   new CheckService(fileSystemLogRepository).execute(endpoint);
    //   // new CheckService().execute("http://localhost:3000/posts");
    // });
  }
}
