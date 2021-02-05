import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const heartDataSchema = new Schema(
    {
        date: { type: String, required: true, unique: true },
        heartData: { type: Object, required: true }
    },
    {
        timestamps: true
    }
);

export const heartDataset = mongoose.model('heartDataset', heartDataSchema);

