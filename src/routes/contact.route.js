import express from "express";
import emailService from "../services/email.service.js";
import InvalidEmailError from "../errors/invalid-email.error.js";
import InvalidPayloadError from "../errors/invalid-payload.error.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    await emailService.handleContact(req.body);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    if (
      error instanceof InvalidEmailError ||
      error instanceof InvalidPayloadError
    ) {
      console.error(error);
      res.status(400).json({ error: error.message });
    } else {
      console.error(error);
      res.status(500).json({ error: "Error sending email" });
    }
  }
});

export default router;
