import { LogEntity, LogSeverityLevel } from "../../entities/log.entity.js";
import { LogRepository } from "../../repository/log.repository.js";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

const fileName = "check-service-multiple.ts";
export class CheckServiceMultiple implements CheckServiceUseCase {
  constructor(
    private readonly logRepositories: LogRepository[],
    private readonly successCallback: SuccessCallback = console.log,
    private readonly errorCallback: ErrorCallback = console.error,
  ) {}

  private callLogsRepositories(log: LogEntity): void {
    this.logRepositories.forEach((repo) => repo.saveLog(log));
  }

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);

      if (!req.ok) {
        throw new Error(
          `Error on service ${url}: ${req.status} - ${req.statusText}`,
        );
      }
      // console.log(`Service ${url} is up and running`);
      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Service ${url} is up and running`,
        origin: fileName,
      });
      this.callLogsRepositories(log);
      this.successCallback();
      return true;
    } catch (error) {
      if (error instanceof Error) {
        // console.error(`Error checking service ${url}: ${error.message}`);
        const errorMessage = `Error checking service ${url}: ${error.message}`;
        const log = new LogEntity({
          level: LogSeverityLevel.high,
          message: errorMessage,
          origin: fileName,
        });
        this.callLogsRepositories(log);
        this.errorCallback(error.message);
      }
      return false; // Return false if the error is not an instance of Error
    } finally {
    }
    // Implementation for checking the URL
  }
}
