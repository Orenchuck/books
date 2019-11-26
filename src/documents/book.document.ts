import * as mongoose from 'mongoose';

export interface BookDocument extends mongoose.Document {
    _id?: mongoose.ObjectID;
    title?: string;
    author?: string;
    price?: number;
    isDel?: boolean;
}

export const BookSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    price: {
        type: Number,
    },
    isDel: {
        type: Boolean,
        required: true,
        default: false,
    },
});
