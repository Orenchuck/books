import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/services/user.services';
import { JwtPayload } from 'src/common/jwt.strategy';

// export class LoginUser {
//     readonly email: string;
//     readonly password: string;
// }

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService, 
        private jwtService: JwtService
        ){
    }

    async validateUserByPassword(loginAttempt) {
        let userToAttempt = await this.usersService.findOneByEmail(loginAttempt.email);
        
        return new Promise((resolve) => {
            userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {
    
                if(err) throw new UnauthorizedException();
    
                if(isMatch){
                    resolve(this.createJwtPayload(userToAttempt));
    
                } else {
                    throw new UnauthorizedException();
                }
            });
        });
    }

    async validateUserByJwt(payload: JwtPayload) { 

        let user = await this.usersService.findOneByEmail(payload.email);

        if(user){
            return this.createJwtPayload(user);
        } else {
            throw new UnauthorizedException();
        }

    }

    createJwtPayload(user){

        let data: JwtPayload = {
            email: user.email
        };

        let jwt = this.jwtService.sign(data);

        return {
            expiresIn: 3600,
            token: jwt            
        }
    }
}