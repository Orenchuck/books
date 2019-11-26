import { Document, Schema, ObjectId } from 'mongoose';

export interface UserDocument extends Document {
    _id?: ObjectId;
    name?: string;
    birth?: Date;
    death?: Date;
    isDel?: boolean;

}

export const AuthorSchema = new Schema({
    _id: ObjectId,
    name: String,
    birth: Date,
    death: Date,
    isDel: {
        type: Boolean,
        required: true,
    },
});
