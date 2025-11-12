import { describe, jest } from "@jest/globals";
import InvalidEmailError from "../src/errors/invalid-email.error.js";
import InvalidPayloadError from "../src/errors/invalid-payload.error.js";

mockSendEmail = jest.fn().mockResolvedValue({
  id: "mock-email-id",
});

jest.unstable_mockModule("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: mockSendEmail,
    },
  })),
}));

const { EmailService } = await import("../src/services/email.service.js");
const { Resend } = await import("resend");

describe("EmailService", () => {
  let emailService;

  beforeEach(() => {
    jest.clearAllMocks();

    EmailService.instance = null;

    emailService = new EmailService();
    emailService.emailFrom = "noreply@example.com";
    emailService.emailTo = "noreply@example.com";
  });

  describe("isEmailValid", () => {
    it("should return true for a valid email address", () => {
      expect(emailService.isEmailValid("test@example.com")).toBe(true);
    });

    it("should return false for an invalid email address", () => {
      expect(emailService.isEmailValid("invalid-email")).toBe(false);
    });
  });

  describe("validatePayload", () => {
    it("should throw InvalidPayloadError for invalid payload", () => {
      expect(() => emailService.validatePayload({})).toThrow(
        InvalidPayloadError,
      );
    });

    it("should return object containing valid email payload", () => {
      const emailPayload = {
        recipientEmail: "john@example.com",
        name: "John Doe",
        message: "Hello",
      };
      const result = emailService.validatePayload(emailPayload);
      expect(result).toEqual(emailPayload);
    });
  });

  describe("createEmail", () => {
    it("should create an email object with valid data", () => {
      const email = emailService.createEmail({
        to: emailService.emailTo,
        subject: "Subject",
        html: "Html",
      });

      expect(email).toEqual({
        from: emailService.emailFrom,
        to: emailService.emailTo,
        subject: "Subject",
        html: "Html",
      });
    });
  });

  describe("sendEmail", () => {
    it("should successfully send an email with valid data", async () => {
      const email = {
        from: emailService.emailFrom,
        to: emailService.emailTo,
        subject: "Subject",
        html: "Html",
      };

      await emailService.sendEmail(email);
      expect(mockSendEmail).toHaveBeenCalledWith({
        from: emailService.emailFrom,
        to: emailService.emailTo,
        subject: "Subject",
        html: "Html",
      });
    });
  });

  describe("handleContact", () => {
    const validPayload = {
      recipientEmail: "john@example.com",
      name: "John Doe",
      message: "Hello",
    };

    it("should successfully handle a valid contact request", async () => {
      const result = await emailService.handleContact(validPayload);

      // Verify emails were sent in the correct order
      expect(mockSendEmail).toHaveBeenCalledTimes(2);

      // First call: email to owner/admin
      expect(mockSendEmail).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          to: emailService.emailTo,
          subject: "New Contact from Campaign Landing page",
        }),
      );

      // Second call: thank you email to user
      expect(mockSendEmail).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          to: "john@example.com",
          subject: "Thank You for Reaching Out",
        }),
      );
    });
  });
});
