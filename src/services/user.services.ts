import { Model } from 'mongoose';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { UserModel } from 'src/models/user.model';
import { UserDocument } from 'src/documents/user.document';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UsersService {

  constructor(
    private userRepository: UserRepository,
  ) { }
    // @InjectModel('User') private UserModel: Model<UserModel>) { }
  private userDoc: UserDocument;

  async create(user: UserModel) {
    const cypher = await this.getRandomString();
    const resRepo = await this.userRepository.createUser(user, cypher);
    const newUser: UserModel = {};

    if (resRepo) {
      newUser.id = resRepo._id;
      newUser.email = resRepo.email;
      newUser.password = resRepo.password;
      newUser.role = resRepo.role;
      newUser.active = resRepo.active;
      newUser.cypher = resRepo.cyper;
    }
  }

  async findOneByEmail(email: string): Promise<UserModel> {
    const resRepo = await this.userRepository.findOneByEmail(email);
    const user: UserModel = {};

    if (resRepo) {
      user.id = resRepo._id;
      user.email = resRepo.email;
      user.password = resRepo.password;
      user.role = resRepo.role;
      user.active = resRepo.active;
      user.cypher = resRepo.cypher;
    }
    return user;
  }

  async getRandomString() {
    const random = bcrypt.genSalt(10);
    return random;
  }

  async compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
    const res = bcrypt.compare(password, hash);
    return res;
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
        user.cypher = resRepo.cypher;
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
