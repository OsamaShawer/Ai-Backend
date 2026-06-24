import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import communityRouter from "./communityRoutes";

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/Community";
const allowedOrigins = [
  "http://localhost:5173",
  "https://questions-and-ai.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(express.json());

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err: unknown) => {
    console.log("MongoDB connection error", err);
  });

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/community", communityRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
