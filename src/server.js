import express from "express";
import "dotenv/config";

import emailService from "./services/email.service.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/contact", async (req, res) => {
  try {
    await emailService.sendEmail(req.body);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    if (error instanceof InvalidEmailError) {
      console.error(error);
      res.status(400).json({ error: "Invalid email address" });
    } else {
      console.error(error);
      res.status(500).json({ error: "Error sending email" });
    }
  }
});
