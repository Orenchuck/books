import * as mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
    id?: string;
    email?: string;
    password?: string;
}
