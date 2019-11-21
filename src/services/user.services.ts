import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/models/user.model';

@Injectable()
export class UsersService {

  private saltRounds = 10;

  constructor(@InjectModel('User') private userModel: Model<User>) { }

  async create(user: User) {
      const createdUser = new this.userModel(user);
      const rand = Math.floor(Math.random() * (9000000)) + 1000000;
      const cypher = 'n' + rand;

      createdUser.password = await bcrypt.hash(createdUser.password, this.saltRounds);
      createdUser.role = 'User';
      createdUser.active = false;
      createdUser.cypher = cypher;
      return await createdUser.save();
  }

  async findOneByEmail(email: string): Model<User> {
    return await this.userModel.findOne({ email });
  }

  async compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

}
