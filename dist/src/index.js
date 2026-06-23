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
app.use(express_1.default.json());
mongoose_1.default.connect("mongodb://localhost:27017/Community")
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => {
    console.log("MongoDB connection error", err);
});
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["*", "GET", "POST", "PUT", "DELETE"],
}));
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api/community", communityRoutes_1.default);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
