import express from "express";
import cors from "cors";
import contactRoute from "./routes/contact.route.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://apc-deputy-landing.vercel.app"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());
app.use("/contact", contactRoute); // ✅ mount the route on the main app

export default app;
