import { CronJob } from "cron/dist/job.js";

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {
  static createJob(cronTime: CronTime, onTick: OnTick): CronJob {
    let counter = 0;

    const job = new CronJob(cronTime, onTick);
    job.start();

    return job;
  }
}
