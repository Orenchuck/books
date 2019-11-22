import * as mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
    _id?: mongoose.ObjectID;
    email?: string;
    password?: string;
    role?: string;
    active?: boolean;
    cyper?: string;
}

export const UserSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
    cypher: {
        type: String,
    },
});
