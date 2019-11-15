import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  price: Number,
});

export interface Book extends mongoose.Document {

  title?: string;
  author?: string;
  price?: number;

}
