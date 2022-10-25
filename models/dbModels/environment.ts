import mongoose from 'mongoose';

export interface IEnvironmentReq extends mongoose.Document {
    name: string;
}

export interface IEnvironmentResponse {
    id: string;
    name: string;
}

export const EnvironmentSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

const Environment = mongoose.models.Environment || mongoose.model<IEnvironmentReq>('Environment', EnvironmentSchema);
export default Environment;
