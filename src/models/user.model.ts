import * as mongoose from 'mongoose';
import { UserSchema } from 'src/models/schemas/user.schema';

// export interface User {
//   email: string;
//   password: string;
// }

// export const user = mongoose.model('User', UserSchema);

export class User {
  email?: string;
  password?: string;
  role?: string;
  active?: boolean;
  cypher?: string;
}
