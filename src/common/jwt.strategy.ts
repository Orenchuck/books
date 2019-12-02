import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/services/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import * as fs from 'fs';
import { AccessJwtPayload } from 'src/models/access-jwt-payload.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: fs.readFileSync('src/secrets/jwtSecretKey.pem'),
        });
    }

    async validate(payload: AccessJwtPayload) {
        const user = await this.authService.validateUserByJwt(payload);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }

}
