import { envs } from "../config/plugins/envs.plugin.js";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource.js";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-repository.impl.js";
import { EmailService } from "./email/email.service.js";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
);

const endpoint = "http://localhost:3000/";

export class Server {
  public static async start() {
    console.log("Server started...");

    // Mandar email
    const emailService = new EmailService();
    await emailService.sendEmailWithFileSystemLogs(envs.MAILER_EMAIL);

    // CronService.createJob("*/5 * * * * *", () => {
    //   console.log("Cron job executed every 5 seconds", new Date());
    //   new CheckService(fileSystemLogRepository).execute(endpoint);
    //   // new CheckService().execute("http://localhost:3000/posts");
    // });
  }
}
