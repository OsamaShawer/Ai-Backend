import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import communityRouter from "./communityRoutes";
const PORT = process.env.PORT || 3000

const app = express();
app.use(express.json());
app.use(cors({
    origin: "https://questions-and-ai.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
//                mongodb+srv://osamashawar7_db_user:zc8XZauuhaQ94It1@cluster0.wyrwbv5.mongodb.net/?appName=Cluster0/community?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://osamashawar7_db_user:zc8XZauuhaQ94It1@cluster0.wyrwbv5.mongodb.net/?appName=Cluster0/community?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err: unknown) => {
        console.log("MongoDB connection error", err);
    });




app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/community", communityRouter);

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});