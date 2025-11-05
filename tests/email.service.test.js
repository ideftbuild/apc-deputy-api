import { jest } from "@jest/globals";
import InvalidEmailError from "../src/errors/invalid-email.error.js";

const mockSendMail = jest.fn();
jest.unstable_mockModule("nodemailer", () => ({
  default: {
    createTransport: jest.fn(() => ({
      sendMail: mockSendMail,
    })),
  },
}));

const { EmailService } = await import("../src/services/email.service.js");
const nodemailer = (await import("nodemailer")).default;

describe("EmailService", () => {
  let emailService;

  beforeEach(() => {
    jest.clearAllMocks();

    EmailService.instance = null;

    emailService = new EmailService();
  });

  describe("isEmailValid", () => {
    it("should return true for a valid email address", () => {
      expect(emailService.isEmailValid("test@example.com")).toBe(true);
    });

    it("should return false for an invalid email address", () => {
      expect(emailService.isEmailValid("invalid-email")).toBe(false);
    });
  });

  describe("sendEmail", () => {
    const email = {
      from: "from@example.com",
      to: "to@example.com",
      subject: "Subject",
      html: "Html",
    };

    it("should successfully send an email with valid data", async () => {
      const mockSuccessResponse = { messageId: "mocked-id-123" };
      mockSendMail.mockResolvedValue(mockSuccessResponse);

      const result = await emailService.sendEmail(email);

      expect(nodemailer.createTransport).toHaveBeenCalledTimes(1);

      expect(mockSendMail).toHaveBeenCalledTimes(1);

      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          from: "from@example.com",
          to: "to@example.com",
          subject: "Subject",
          html: "Html",
        }),
      );

      expect(result).toBe(mockSuccessResponse);
    });

    // it("should throw an InvalidEmailError for an invalid email address", async () => {
    //   const invalidEmail = "not-a-valid-email";

    //   await expect(
    //     emailService.sendEmail(
    //       invalidEmail,
    //       testPayload.name,
    //       testPayload.message,
    //     ),
    //   ).rejects.toThrow(InvalidEmailError);

    //   await expect(
    //     emailService.sendEmail(
    //       invalidEmail,
    //       testPayload.name,
    //       testPayload.message,
    //     ),
    //   ).rejects.toThrow("Invalid email address");

    //   expect(mockSendMail).not.toHaveBeenCalled();
    // });
  });
});
