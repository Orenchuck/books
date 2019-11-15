import * as mongoose from 'mongoose';
import { BookSchema } from 'src/models/schemas/book.schema';

const book = mongoose.model('Book', BookSchema);
