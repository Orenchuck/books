import * as mongoose from 'mongoose';
import { AuthorSchema } from 'src/models/schemas/author.schema';

const author = mongoose.model('Author', AuthorSchema);
