"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const community_1 = __importDefault(require("../Shema/community"));
const communityRouter = (0, express_1.Router)();
communityRouter.post("/opinion", async (req, res) => {
    try {
        const opinion = req.body.opinion?.trim();
        if (!opinion) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
            });
        }
        await community_1.default.create({ opinion });
        return res.status(201).json({
            success: true,
            message: "Opinion submitted successfully",
        });
    }
    catch (error) {
        console.error("Failed to submit community opinion", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
communityRouter.get("/opinions", async (_req, res) => {
    try {
        const opinions = await community_1.default.find().sort({ createdAt: -1 }).lean();
        return res.json(opinions.map((opinion) => ({
            id: opinion._id,
            opinion: opinion.opinion,
            createdAt: opinion.createdAt,
        })));
    }
    catch (error) {
        console.error("Failed to fetch community opinions", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.default = communityRouter;
