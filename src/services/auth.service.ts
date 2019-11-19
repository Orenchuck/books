import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/services/user.services';
import { JwtPayload } from 'src/models/jwt-payload.model';
import { UserDocument } from 'src/documents/user.document';

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
    const refresh = this.jwtService.sign(data);
    // tslint:disable-next-line: no-console
    console.log(data, jwt);

    return {
      expiresIn: 3600,
      token: jwt,
      refresh,
    };
  }
}
