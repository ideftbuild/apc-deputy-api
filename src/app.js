import express from "express";
import cors from "cors";
import contactRoute from "./routes/contact.route.js";

const app = express();

const allowedOrigins = [
  'https://apc-deputy-landing.vercel.app',  
  'http://localhost:5173',       
  'http://localhost:3000',        
]

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/contact", contactRoute); // ✅ mount the route on the main app

export default app;
