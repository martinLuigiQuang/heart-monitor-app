import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const testSchema = new Schema(
    {
        date: { type: String, required: true, unique: true },
        heartData: { type: Object, required: true }
    },
    {
        timestamps: true
    }
);

export const test = mongoose.model('test', testSchema);

