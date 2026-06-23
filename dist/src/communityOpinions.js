"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addOpinion = addOpinion;
exports.getOpinions = getOpinions;
const communityOpinions = [];
function addOpinion(username, opinion) {
    const newOpinion = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
        username,
        opinion,
        createdAt: new Date(),
    };
    communityOpinions.push(newOpinion);
    return newOpinion;
}
function getOpinions() {
    return communityOpinions;
}
