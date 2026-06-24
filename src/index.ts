import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import communityRouter from "./communityRoutes";

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || "mongodb+srv://osamashawar7_db_user:zc8XZauuhaQ94It1@cluster0.wyrwbv5.mongodb.net/community?retryWrites=true&w=majority&appName=Cluster0";
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
      // Allow direct browser visits (no origin) or explicit matches
      if (!origin || allowedOrigins.includes(origin) || origin === "null") {
        callback(null, true);
      } else {
        // Return a standard CORS failure message instead of a breaking Express Error object
        callback(null, false);
      }
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
