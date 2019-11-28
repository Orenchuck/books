import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { UsersService } from 'src/services/user.services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService,
        private usersService: UsersService) {
        super();
    }

    async validate(email: string): Promise<any> {
        console.log('qqqq');

        console.log(email);
        const pass = '$2b$10$j9isGrnwKzID4wKwlFSXDO9IICpwrA1CfWBfxWXllb/wcBFrVd4hW';

        const user = await this.validateUser(email, pass);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
