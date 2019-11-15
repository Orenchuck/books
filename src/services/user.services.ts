import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/documents/user.document';

export interface User {
  email: string;
  password: string;
}

@Injectable()
export class UsersService {

  private saltRounds = 10;

  constructor(@InjectModel('User') private userModel: Model<User>) { }

  async create(user: UserDocument) {
    const createdUser = new this.userModel(user);

    createdUser.password = await this.getHash(createdUser.password);
    return await createdUser.save();

  }

  async findOneByEmail(
    email: string,
  ): Model<User> {

    return await this.userModel.findOne({ email });

  }

async getHash(password: string): Promise<string> {
  return bcrypt.hash(password, this.saltRounds);
}

  async compareHash(
    password: string | undefined,
    hash: string | undefined,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

}
