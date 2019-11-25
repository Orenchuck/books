import { Document, Schema, ObjectId } from 'mongoose';

export interface UserDocument extends Document {
    _id?: ObjectId;
    firstName?: string;
    lastName?: string;
    birth?: Date;
    death?: Date;
    isDel?: boolean;

}

export const AuthorSchema = new Schema({
    _id: ObjectId,
    firstName: String,
    lastName: String,
    birth: Date,
    death: Date,
    isDel: Boolean,
});
