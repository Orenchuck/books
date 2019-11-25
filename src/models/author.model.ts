import { ObjectId } from 'mongoose';

export class AuthorModel {
    _id?: ObjectId;
    firstName?: string;
    lastName?: string;
    birth?: Date;
    death?: Date;
    isDel?: boolean;
  }
