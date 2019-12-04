import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { UserModel } from 'src/models/user.model';
import { USERS_REPOSITORY } from 'src/constants/constants';

@Injectable()
export class UserRepository {
    constructor(@Inject(USERS_REPOSITORY) private readonly usersRepository: typeof User) {
    }

    async create(user: User) {
        const newUser = await this.usersRepository.create(user);

        return newUser;
    }

    async findOneByEmail(email: string): Promise<User> {
        const res: User = await this.usersRepository.findOne({ where: { email } });
        return res;
    }

    async getAllUsers(): Promise<User[]> {
        const allUsers: User[] = await this.usersRepository.findAll<User>();
        return allUsers;
    }

    async getUserbyID(id: string): Promise<User> {
        try {
            const user: User = await this.usersRepository.findOne({ where: { id } });
            return user;
        } catch { throw new HttpException('User does not exist!', HttpStatus.NOT_FOUND); }
    }

    async updateUser(userToUpdate: User): Promise<any[]> {
            const updatedUser = await this.usersRepository.update<User>(userToUpdate, { where: { id: userToUpdate.id } });
            return updatedUser;
    }

    async deleteUser(id: string) {
        const result = await this.usersRepository.destroy({ where: { id } });
        return result;
    }
}
