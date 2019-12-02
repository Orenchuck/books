import { ObjectId, Document, Schema } from 'mongoose';

export interface AuthorDocument extends Document {
    _id?: Schema.Types.ObjectId;
    name?: string;
    books?: ObjectId;
    birthDate?: Date;
    deathDate?: Date;
    isDel?: boolean;
}

export const AuthorSchema = new Schema({
    id: String,
    name: String,
    books: String,
    birthDate: Date,
    deathDate: {
        type: Date,
        default: null,
    },
    isDel: {
        type: Boolean,
        required: true,
        default: false,
    },
});
