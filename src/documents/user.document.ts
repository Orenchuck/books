import * as mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
    _id?: mongoose.ObjectID;
    email?: string;
    password?: string;
    roles?: string;
    active?: boolean;
    cypher?: string;
    isDelete?: boolean;
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
    roles: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
    cypher: String,
    isDelete: {
        type: Boolean,
        required: true,
    },
});
