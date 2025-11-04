import express from "express";
import contactRoute from "./routes/contact.route.js";

const app = express();

app.use(express.json());
app.use("/contact", contactRoute); // ✅ mount the route on the main app

export default app;
