import { Model } from 'mongoose';
import { Injectable, HttpException } from '@nestjs/common';
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

  async getAllUsers() {
    const users = await this.userModel.find().exec();
    return users.map(user => ({
        id: user.id,
        email: user.email,
        password: user.password,
        role: user.role,
        active: user.active,
    }));
}

 async getUserbyID(id: string): Promise<User> {
  let user;
  try {
      user = await this.userModel.findById(id).exec();
  } catch (error) {
      throw new HttpException('Book does not exist!', 404);
  }
  if (!user) {
      throw new HttpException('Book does not exist!', 404);
  }
  return user;
}

}
