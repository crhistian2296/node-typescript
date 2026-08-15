import nodemailer from "nodemailer";
import { Attachment } from "nodemailer/lib/mailer/index.js";
import { envs } from "../../config/plugins/envs.plugin.js";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachments {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sentInfo = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      console.log(sentInfo);

      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = " Logs de sistema - NOC";
    const htmlBody = `
      <h1>Logs de sistema - NOC</h1>
      <p>This is a test email.</p>
      <p>Ver logs adjuntos.</p>`;

    const attachments: Attachments[] = [
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
    ];

    return this.sendEmail({
      to,
      subject,
      htmlBody,
      attachments,
    });
  }
}
