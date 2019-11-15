import { Document, Schema, ObjectId } from 'mongoose';

export interface UserDocument extends Document {
    _id?: ObjectId;
    firstName?: string;
    lastName?: string;
    biography?: string;

}

export const AuthorSchema = new Schema({
    _id: ObjectId,
    firstName: String,
    lastName: String,
    biography: String,
});
