import * as mongoose from 'mongoose';

export class CreateAuthorModel {
    name?: string;
    books?: mongoose.Schema.Types.ObjectId;
    birthDate?: Date;
    deathDate?: Date;
  }
