import * as mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
    id?: string;
    email?: string;
    password?: string;
}

export const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
});
