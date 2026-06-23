"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommunitySchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    opinion: { type: String, required: true },
}, { timestamps: true });
const CommunityModel = (0, mongoose_1.model)("Community", CommunitySchema);
exports.default = CommunityModel;
