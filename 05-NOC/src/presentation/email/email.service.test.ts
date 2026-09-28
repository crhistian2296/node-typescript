import nodemailer from "nodemailer";
import { EmailService, SendMailOptions } from "./email.service";

describe("email.service.ts", () => {
  beforeEach(() => {
    vitest.clearAllMocks();
  });

  const mockSendMail = vitest.fn();

  // Mock al createTransport
  nodemailer.createTransport = vitest.fn().mockReturnValue({
    sendMail: mockSendMail,
  });

  const emailService = new EmailService();

  test("should send an email", async () => {
    const options: SendMailOptions = {
      to: "cristofervanhelsin@gmail.com",
      subject: "test",
      htmlBody: "<h1>Test</h1>",
    };

    await emailService.sendEmail(options);
    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: "<h1>Test</h1>",
      subject: "test",
      to: "cristofervanhelsin@gmail.com",
    });
  });

  test("should send an email with attachements", async () => {
    const email = "cristofervanhelsin@gmail.com";
    await emailService.sendEmailWithFileSystemLogs(email);

    expect(mockSendMail).toHaveBeenCalledWith({
      to: email,
      subject: " Logs de sistema - NOC",
      html: expect.any(String),
      attachments: expect.arrayContaining([
        {
          filename: "logs-low.log",
          path: "./logs/logs-low.log",
        },
        {
          filename: "logs-medium.log",
          path: "./logs/logs-medium.log",
        },
        {
          filename: "logs-high.log",
          path: "./logs/logs-high.log",
        },
      ]),
    });
  });
});
