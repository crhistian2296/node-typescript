import { envs } from "../../../config/plugins/envs.plugin";
import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository.js";
import { SendEmailLogs } from "./send-email-logs";

describe("send-email-logs.ts", () => {
  const mockEmailService: any = {
    transporter: {},
    sendEmail: vitest.fn().mockReturnValue(true),
    sendEmailWithFileSystemLogs: vitest.fn().mockReturnValue(true),
  };

  const mockLogRepository: LogRepository = {
    saveLog: vitest.fn(),
    getLogs: vitest.fn(),
  };

  const sendEmailLogs = new SendEmailLogs(mockEmailService, mockLogRepository);

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  test("should call sendEmail and saveLog", async () => {
    const result = await sendEmailLogs.execute(envs.MAILER_EMAIL);

    expect(result).toBeTruthy();
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledOnce();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity),
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "low",
      message:
        "Email with logs sent successfully to cristofervanhelsin@gmail.com",
      origin: "send-logs.ts",
    });
  });

  test("should log in case of error", async () => {
    mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

    const result = await sendEmailLogs.execute(envs.MAILER_EMAIL);

    expect(result).toBeFalsy();
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledOnce();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity),
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "high",
      message:
        "Error sending email with logs: Error: Error sending email with logs:",
      origin: "send-logs.ts",
    });
  });
});
