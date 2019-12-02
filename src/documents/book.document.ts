import { Document, Schema } from 'mongoose';

export interface BookDocument extends Document {
    _id?: Schema.Types.ObjectId;
    title?: string;
    author?: string;
    price?: number;
    isDel?: boolean;
}

export const BookSchema = new Schema({
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
