import { Injectable, HttpException, Inject } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserModel } from 'src/models/user.model';
import { AUTH_REPOSITORY } from 'src/constants/constants';

@Injectable()
export class AuthRepository {
    constructor(@Inject(AUTH_REPOSITORY) private readonly authRepository: typeof User) {}

    async verifyEmail(cypher: string): Promise<User> {
        const emailVerif = await this.authRepository.findOne({where: { cypher }});
        return emailVerif;
    }

    async saveUser(user: User): Promise<boolean> {
            await user.save();
            return true;
    }
}
