import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/services/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import * as fs from 'fs';
import * as passport from 'passport';

export interface JwtPayload {
    email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: fs.readFileSync('src/secrets/jwtSecretKey.pem'),
        },
        );
    }

    // public async verify(req, payload, done) {
    //     const isValid = await this.authService.validateUser(payload);
    //     if (!isValid) {
    //       return done('Unauthorized', false);
    //     }
    //     done(null, payload);
    //   }

    async validate(payload: JwtPayload) {

        const user = await this.authService.validateUserByJwt(payload);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;

    }

}
