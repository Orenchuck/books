import * as mongoose from 'mongoose';

export interface BookDocument extends mongoose.Document {
    _id?: mongoose.ObjectID;
    title?: string;
    author?: string;
    price?: number;
    isDel?: boolean;
}

export const BookSchema = new mongoose.Schema({
    id: String,
    title: String,
    author: String,
    price: Number,
    isDel: {
        type: Boolean,
        required: true,
        default: false,
    },
});
