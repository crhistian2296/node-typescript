import { CheckService } from "../domain/use-case/checks/check-service.js";
import { CronService } from "./cron/cron-service.js";

export class Server {
  public static async start() {
    console.log("Server started");

    CronService.createJob("*/5 * * * * *", () => {
      console.log("Cron job executed every 5 seconds", new Date());
      new CheckService().execute("https://google.com");
      // new CheckService().execute("http://localhost:3000/posts");
    });
  }
}
