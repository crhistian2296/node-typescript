import { CheckService } from "../domain/use-case/checks/check-service.js";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource.js";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-repository.impl.js";
import { CronService } from "./cron/cron-service.js";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
);

const endpoint = "http://localhost:3000/";

export class Server {
  public static async start() {
    console.log("Server started");

    CronService.createJob("*/5 * * * * *", () => {
      console.log("Cron job executed every 5 seconds", new Date());
      new CheckService(fileSystemLogRepository).execute(endpoint);
      // new CheckService().execute("http://localhost:3000/posts");
    });
  }
}
