import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/services/user.services';
import { JwtPayload } from 'src/common/jwt.strategy';
import { UserDocument } from 'src/documents/user.document';

// export class LoginUser {
//   readonly email: string;
//   readonly password: string;
// }

// tslint:disable-next-line: max-classes-per-file
@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async validateUserByPassword(loginAttempt: UserDocument) {
    const userToAttempt = await this.usersService.findOneByEmail(loginAttempt.email);

    this.createJwtPayload(userToAttempt);
  }

  async validateUserByJwt(payload: JwtPayload) {

    const user = await this.usersService.findOneByEmail(payload.email);

    if (user) {
      return this.createJwtPayload(user);
    } else {
      throw new UnauthorizedException();
    }

  }

  createJwtPayload(user) {

    const data: JwtPayload = {
      email: user.email,
    };

    const jwt = this.jwtService.sign(data);
    console.log(data, jwt);
    

    return {
      expiresIn: 3600,
      token: jwt,
    };
  }
}

// @Injectable()
// export class AuthService {
//   constructor(private readonly usersService: UsersService) {}

//   async validateUser(username: string, pass: string): Promise<any> {
//     const user = await this.usersService.findOne(username);
//     if (user && user.password === pass) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }
// }
