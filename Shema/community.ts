import  { Schema, model, Document } from "mongoose";

interface InterfaceCommunity extends Document {
    username: string;
    opinion: string;
    createdAt: Date;
}

const CommunitySchema = new Schema<InterfaceCommunity>({
    username: { type: String, required: true },
    opinion: { type: String, required: true },
}, { timestamps: true });

const CommunityModel = model<InterfaceCommunity>("Community", CommunitySchema);
export default CommunityModel;