import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/services/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import * as fs from 'fs';

export interface JwtPayload {
    email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService){

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: fs.readFileSync('src/secrets/jwtSecretKey.pem'),
        });

    }

    async validate(payload: JwtPayload){

        const user = await this.authService.validateUserByJwt(payload);

        if(!user){
            throw new UnauthorizedException();
        }

        return user;

    }

}