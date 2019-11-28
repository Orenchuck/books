import * as mongoose from 'mongoose';

export const AuthorSchema = new mongoose.Schema({
    name: {
        firstName: String,
        lastName: String,
    },
    biography: String,
});
