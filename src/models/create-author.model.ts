import * as mongoose from 'mongoose';

export class AuthorModel {
    id?: string;
    name?: string;
    books?: mongoose.Schema.Types.ObjectId;
    birthDate?: Date;
    deathDate?: Date;
    isDel?: boolean;
  }
