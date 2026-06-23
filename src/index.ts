import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import communityRouter from "./communityRoutes";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Community")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err: unknown) => {
        console.log("MongoDB connection error", err);
    });

app.use(cors({
    origin: "https://questions-and-ai.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/community", communityRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});