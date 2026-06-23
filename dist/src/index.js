"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const communityRoutes_1 = __importDefault(require("./communityRoutes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/Community";
const allowedOrigins = [
    "http://localhost:5173",
    "https://questions-and-ai.vercel.app",
    process.env.FRONTEND_URL,
].filter(Boolean);
app.use(express_1.default.json());
mongoose_1.default.connect(mongoUri)
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => {
    console.log("MongoDB connection error", err);
});
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.get("/health", (req, res) => {
    res.json({ ok: true });
});
app.use("/api/community", communityRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
