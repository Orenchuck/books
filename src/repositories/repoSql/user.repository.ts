import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
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

    async findOneByCypher(cypher: string): Promise<User> {
        const res: User = await this.usersRepository.findOne({ where: { cypher } });
        return res;
    }

    async getAllUsers(): Promise<User[]> {
        const allUsers: User[] = await this.usersRepository.findAll<User>();
        return allUsers;
    }

    async getUserbyID(id: string): Promise<User> {
            const user: User = await this.usersRepository.findOne({ where: { id } });
            return user;
    }

    async getUserforDel(id): Promise<User> {
        const user: User = await this.usersRepository.findOne({ where: { id: id.id } });
        return user;
    }

    async updateUser(userToUpdate: User): Promise<any[]> {
        const updatedUser = await this.usersRepository.update<User>(userToUpdate, { where: { id: userToUpdate.id } });
        return updatedUser;
    }

    async updateUserPass(userToUpdate: User): Promise<any[]> {
        const updatedUser = await this.usersRepository.update<User>(userToUpdate, { where: { id: userToUpdate.id } });
        return updatedUser;
    }

    async saveUser(user: User): Promise<boolean> {
        await user.save();
        return true;
    }

    async deleteUser(id: string) {
        const result = await this.usersRepository.destroy({ where: { id } });
        return result;
    }
}
