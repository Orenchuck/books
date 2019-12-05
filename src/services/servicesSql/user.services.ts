import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserModel } from 'src/models/user.model';
import { UserRepository } from 'src/repositories/repoSql/user.repository';
// import { AuthRepository } from 'src/repositories/repoSql/auth.repository';
import { CreateUserModel } from 'src/models/create-user.model';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    private userRepository: UserRepository,
    // private authRepository: AuthRepository,
  ) { }

  async create(user: CreateUserModel): Promise<UserModel> {
    const saltRounds = 10;
    const cypher: string = await this.getRandomString();
    const userToCreate: User = {} as any;

    userToCreate.email = user.email;
    userToCreate.password = await bcrypt.hash(user.password, saltRounds);
    userToCreate.roles = 'User';
    userToCreate.cypher = cypher;
    userToCreate.active = false;
    userToCreate.isDelete = false;
    userToCreate.id = await this.getRandomString();

    const resRepo = await this.userRepository.create(userToCreate);
    const newUser: UserModel = {};

    if (resRepo) {
      newUser.id = resRepo.id;
      newUser.email = resRepo.email;
      newUser.password = resRepo.password;
      newUser.roles = resRepo.roles;
      newUser.active = resRepo.active;
      newUser.cypher = resRepo.cypher;
      newUser.isDelete = resRepo.isDelete;
    }
    return newUser;
  }

  async findOneByEmail(email: string): Promise<UserModel> {
    const resRepo: User = await this.userRepository.findOneByEmail(email);
    const user: UserModel = {};

    if (resRepo) {
      user.id = resRepo.id;
      user.email = resRepo.email;
      user.password = resRepo.password;
      user.roles = resRepo.roles;
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
    const resRepo: User[] = await this.userRepository.getAllUsers();
    const users: UserModel[] = [];

    if (resRepo) {
      for (const oneUser of resRepo) {
        const user: UserModel = {};
        user.id = oneUser.id;
        user.email = oneUser.email;
        user.password = oneUser.password;
        user.roles = oneUser.roles;
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
    console.log('id' + id);
    
    const resRepo: User = await this.userRepository.getUserbyID(id);
    if (resRepo) {
      user.id = resRepo.id;
      user.email = resRepo.email;
      user.password = resRepo.password;
      user.roles = resRepo.roles;
      user.active = resRepo.active;
      user.cypher = resRepo.cypher;
      user.isDelete = resRepo.isDelete;

      return user;
    }
    throw new HttpException('User does not exist!', HttpStatus.NOT_FOUND);
  }

  async updateUser(userToUpdate: UserModel) {
    const saltRounds = 10;
    userToUpdate.password = await bcrypt.hash(userToUpdate.password, saltRounds);
    const userDoc: User = {} as any;
    userDoc.id = userToUpdate.id;
    userDoc.email = userToUpdate.email;
    userDoc.password = userToUpdate.password;
    userDoc.roles = userToUpdate.roles;
    userDoc.active = userToUpdate.active;
    userDoc.cypher = userToUpdate.cypher;
    userDoc.isDelete = userToUpdate.isDelete;
    const res = await this.userRepository.updateUser(userDoc);

    if (!res) {
      throw new HttpException('User does not exist!', HttpStatus.NOT_FOUND);
    }

    return true;
  }

  // async isDeleteUser(id: string): Promise<boolean> {
  //   const userFromDb: User = await this.userRepository.getUserbyID(id);

  //   if (userFromDb) {
  //     userFromDb.isDelete = !userFromDb.isDelete;
  //     const savedUser = await this.authRepository.saveUser(userFromDb);
  //     return savedUser;
  //   }
  //   throw new HttpException('User does not exist!', HttpStatus.NOT_FOUND);
  // }

  async deleteUser(id: string): Promise<boolean> {
    const delUser: User = {} as User;
    delUser.id = id;
    const resRepo = await this.userRepository.deleteUser(delUser.id);
    if (!resRepo) {
      throw new HttpException('User does not exist!', HttpStatus.NOT_FOUND);
    }
    return true;
  }
}
