import * as mongoose from 'mongoose';
import { UserSchema } from 'src/models/schemas/user.schema';

export const user = mongoose.model('Author', UserSchema);
