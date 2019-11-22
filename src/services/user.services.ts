import { Model } from 'mongoose';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { UserModel } from 'src/models/user.model';
import { UserDocument } from 'src/documents/user.document';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UsersService {

  private saltRounds = 10;

  constructor(
    private userRepository: UserRepository,
  ) { }
  //   @InjectModel('User') private userModel: Model<User>) { }
  // private userDoc: UserDocument;

  // async create(user: UserModel) {
  //   const createdUser = new this.userModel(user);
  //   const rand = Math.floor(Math.random() * (9000000)) + 1000000;
  //   const cypher = 'n' + rand;

  //   createdUser.password = await bcrypt.hash(createdUser.password, this.saltRounds);
  //   createdUser.role = 'User';
  //   createdUser.active = false;
  //   createdUser.cypher = cypher;
  //   return await createdUser.save();
  // }

  async findOneByEmail(email: string): Promise<UserModel> {
    const resRepo = await this.userRepository.findOneByEmail(email);
    const user: UserModel = {};

    if (resRepo) {
      user.id = resRepo._id;
      user.email = resRepo.email;
      user.password = resRepo.password;
      user.role = resRepo.role;
      user.active = resRepo.active;
      user.cypher = resRepo.cyper;
    }
    return user;
  }

  async compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async getAllUsers(): Promise<UserModel[]> {
    const resRepo: UserDocument[] = await this.userRepository.getAllUsers();
    const users: UserModel[] = [];

    if (resRepo) {
      for (const oneUser of resRepo) {
        const user: UserModel = {};
        user.id = oneUser._id;
        user.email = oneUser.email;
        user.password = oneUser.password;
        user.role = oneUser.role;
        user.active = oneUser.active;

        users.push(user);
      }
    }
    return users;
  }

  async getUserbyID(id: string): Promise<UserModel> {
    const user: UserModel = {};
    try {
      const resRepo: UserDocument = await this.userRepository.getUserbyID(id);
      if (resRepo) {
        user.id = resRepo._id;
        user.email = resRepo.email;
        user.password = resRepo.password;
        user.role = resRepo.role;
        user.active = resRepo.active;
        user.cypher = resRepo.cyper;
      }
      return user;
    } catch (error) {
      throw new HttpException('User does not exist!', 404);
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    const delUser: UserDocument = {};
    delUser._id = id;
    const resRepo = await this.userRepository.deleteUser(delUser._id);
    if (resRepo.n === 0) {
      throw new HttpException('User does not exist!', 404);
    }
    console.log('Successfull del');
    return true;
  }
}
