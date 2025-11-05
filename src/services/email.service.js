import nodemailer from "nodemailer";
import InvalidEmailError from "../errors/invalid-email.error.js";
import InvalidPayloadError from "../errors/invalid-payload.error.js";
import createOwnerEmailTemplate from "../templates/owner-email-template.js";
import createSupporterEmailTemplate from "../templates/supporter-email-template.js";

export class EmailService {
  constructor() {
    if (EmailService.instance) {
      return EmailService.instance;
    }

    this.host = process.env.GMAIL_HOST;
    this.port = process.env.GMAIL_PORT;
    this.user = process.env.GMAIL_USER;
    this.pass = process.env.GMAIL_PASSWORD;
    this.emailTo = process.env.EMAIL_TO;
    this.emailFrom = process.env.EMAIL_FROM;
    this.requiredFields = ["recipientEmail", "name", "message"];

    this.transporter = nodemailer.createTransport({
      host: this.host,
      port: this.port, // ssl
      secure: false,
      auth: {
        user: this.user,
        pass: this.pass,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    EmailService.instance = this;
  }

  isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePayload(payload) {
    if (!this.requiredFields.every((field) => field in payload)) {
      throw new InvalidPayloadError("Invalid payload: missing required fields");
    }

    return {
      recipientEmail: payload.recipientEmail,
      name: payload.name,
      message: payload.message,
    };
  }

  createEmail({ to, subject, html }) {
    return {
      from: this.emailFrom,
      to,
      subject,
      html,
    };
  }

  async sendEmail(email) {
    try {
      const info = await this.transporter.sendMail(email);
      return info;
    } catch (err) {
      throw err;
    }
  }

  async handleContact(payload) {
    // Validate payload
    const info = this.validatePayload(payload);

    if (!this.isEmailValid(info.recipientEmail)) {
      throw new InvalidEmailError("Invalid email address");
    }

    const { recipientEmail, name, message } = info;

    // Generate Email Templates
    const ownerMessage = this.createEmail({
      to: this.emailTo,
      subject: "New Contact from Campaign Landing page",
      html: createOwnerEmailTemplate({ recipientEmail, name, message }),
    });

    const supporterMessage = this.createEmail({
      to: recipientEmail,
      subject: "Thank You for Reaching Out",
      html: createSupporterEmailTemplate(),
    });

    // Send Emails
    try {
      const result = await Promise.all([
        this.sendEmail(ownerMessage),
        this.sendEmail(supporterMessage),
      ]);
      const [usersInfo, clientInfo] = result;
      console.log("Email sent successfully", result);
    } catch (err) {
      console.log("Error sending email:", err);
      throw err;
    }
  }
}

export default new EmailService();
