import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserModel } from 'src/models/user.model';
import { UserDocument } from 'src/documents/user.document';
import { UserRepository } from 'src/repositories/user.repository';
import { AuthRepository } from 'src/repositories/auth.repository';
import { CreateUserModel } from 'src/models/create-user.model';

@Injectable()
export class UsersService {

  constructor(
    private userRepository: UserRepository,
    private authRepository: AuthRepository,
  ) { }

  async create(user: CreateUserModel): Promise<UserModel> {
    const cypher: string = await this.getRandomString();
    const resRepo: UserDocument = await this.userRepository.create(user, cypher);
    const newUser: UserModel = {};

    if (resRepo) {
      newUser.id = resRepo._id;
      newUser.email = resRepo.email;
      newUser.password = resRepo.password;
      // newUser.roles = resRepo.roles;
      newUser.active = resRepo.active;
      newUser.cypher = resRepo.cypher;
      newUser.isDelete = resRepo.isDelete;
    }
    return newUser;
  }

  async findOneByEmail(email: string): Promise<UserModel> {
    const resRepo: UserDocument = await this.userRepository.findOneByEmail(email);
    const user: UserModel = {};

    if (resRepo) {
      user.id = resRepo._id;
      user.email = resRepo.email;
      user.password = resRepo.password;
      // user.roles = resRepo.roles;
      user.active = resRepo.active;
      user.cypher = resRepo.cypher;
      user.isDelete = resRepo.isDelete;

      return user;
    }
    return resRepo;
  }

  async getRandomString(): Promise<string> {
    const abc = 'abcdefghijklmnopqrstuvwxyz';
    let res = '';
    while (res.length < 10) {
      res += abc[Math.floor(Math.random() * abc.length)];
    }
    return res;
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
        // user.roles = oneUser.roles;
        user.active = oneUser.active;
        user.isDelete = oneUser.isDelete;

        users.push(user);
      }
      return users;
    }
    throw new HttpException('You have no users', HttpStatus.NOT_FOUND);
  }

  async getUserbyID(id: string): Promise<UserModel> {
    const user: UserModel = {};
    const resRepo: UserDocument = await this.userRepository.getUserbyID(id);
    if (resRepo) {
      user.id = resRepo._id;
      user.email = resRepo.email;
      user.password = resRepo.password;
      // user.roles = resRepo.roles;
      user.active = resRepo.active;
      user.cypher = resRepo.cypher;
      user.isDelete = resRepo.isDelete;

      return user;
    }
    throw new HttpException('User does not exist!', HttpStatus.NOT_FOUND);
  }

  async updateUser(userToUpdate: UserModel): Promise<UserModel> {
    const saltRounds = 10;
    userToUpdate.password = await bcrypt.hash(userToUpdate.password, saltRounds);
    const userDoc: UserDocument = {
      _id: userToUpdate.id,
      email: userToUpdate.email,
      password: userToUpdate.password,
      // roles: userToUpdate.roles,
      active: userToUpdate.active,
      cypher: userToUpdate.cypher,
      isDelete: userToUpdate.isDelete,
    };
    const res = await this.userRepository.updateUser(userDoc);

    if (!res) {
      throw new HttpException('User does not exist!', HttpStatus.NOT_FOUND);
    }

    return res;
  }

  async isDeleteUser(id: string): Promise<boolean> {
    const userFromDb: UserDocument = await this.userRepository.getUserbyID(id);

    if (userFromDb) {
      userFromDb.isDelete = !userFromDb.isDelete;
      const savedUser = await this.authRepository.saveUser(userFromDb);
      return savedUser;
    }
    throw new HttpException('User does not exist!', HttpStatus.NOT_FOUND);
  }

  async deleteUser(id: string): Promise<boolean> {
    const delUser: UserDocument = {};
    delUser._id = id;
    const resRepo = await this.userRepository.deleteUser(delUser._id);
    if (resRepo.n === 0) {
      throw new HttpException('User does not exist!', HttpStatus.NOT_FOUND);
    }
    // tslint:disable-next-line: no-console
    console.log('Successfull del');
    return true;
  }
}
