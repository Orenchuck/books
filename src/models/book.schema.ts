import * as mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

export const BookSchema = new mongoose.Schema({
  id: Number,
  title: { type: String, required: true } ,
  author: String,
  price: Number,
});

export interface Book extends mongoose.Document {

    id: string;
    title: string;
    author?: string;
    price?: number;

}