import * as mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
    _id?: mongoose.ObjectID;
    email?: string;
    password?: string;
    roles?: string;
    active?: boolean;
    cypher?: string;
    isDel?: boolean;
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
        default: 'User',
    },
    active: {
        type: Boolean,
        required: true,
        default: false,
    },
    cypher: String,
    isDel: {
        type: Boolean,
        required: true,
        default: false,
    },
});
