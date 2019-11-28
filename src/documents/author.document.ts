import { Document, Schema, ObjectId } from 'mongoose';
import { BookDocument } from 'src/documents/book.document';

export interface AuthorDocument extends Document {
    _id?: ObjectId;
    name?: string;
    books?: BookDocument[];
    birthDate?: Date;
    deathDate?: Date;
    isDel?: boolean;

}

export const AuthorSchema = new Schema({
    id: String,
    name: String,
    books: Array,
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
