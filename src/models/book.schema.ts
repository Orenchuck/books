import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
  id: Number,
  title: { type: String, required: true } ,
  author: String,
  price: Number,
});

export interface Book {

    id: number;
    title: string;
    author?: string;
    price?: number;

}