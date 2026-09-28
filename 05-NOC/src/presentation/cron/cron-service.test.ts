import { CronService } from "./cron-service";

describe("cron-service.ts", () => {
  beforeEach(() => {
    vitest.clearAllMocks();
  });

  const mockTick = vitest.fn();

  test("should create a job", () => {
    const job = CronService.createJob("* * * * * *", mockTick);

    setTimeout((done) => {
      expect(mockTick).toHaveBeenCalledTimes(2);
      job.stop();
      done();
    }, 2000);
  });
});
