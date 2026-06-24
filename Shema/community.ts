import  { Schema, model, Document } from "mongoose";

interface InterfaceCommunity extends Document {
    opinion: string;
    createdAt: Date;
}

const CommunitySchema = new Schema<InterfaceCommunity>({
    opinion: { type: String, required: true },
}, { timestamps: true });

const CommunityModel = model<InterfaceCommunity>("Community", CommunitySchema);
export default CommunityModel;