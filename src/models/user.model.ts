import * as mongoose from 'mongoose';
import { UserSchema } from 'src/models/schemas/user.schema';

export interface User {
  email: string;
  password: string;
}

const user = mongoose.model('User', UserSchema);
