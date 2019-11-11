import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

export interface User {
    email: string
}

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(
    email: string,
    password: string
    ) {

    let createdUser = new this.userModel(
      email,
      password
      );
    return await createdUser.save();

  }

  async findOneByEmail(
    email: string,
  ): Model<User> {

    return await this.userModel.findOne({email: email});

  }

}