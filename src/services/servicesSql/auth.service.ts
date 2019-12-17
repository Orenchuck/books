import { Injectable, UnauthorizedException, HttpException, HttpStatus, HttpService } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/services/servicesSql/user.services';
import { AccessJwtPayload } from 'src/models/access-jwt-payload.model';
import { RefreshJwtPayload } from 'src/models/refresh-jwt-payload';
import { UserModel } from 'src/models/user.model';

import nodemailer = require('nodemailer');
import { UserRepository } from 'src/repositories/repoSql/user.repository';
import { CreateUserModel } from 'src/models/create-user.model';
import { environment } from 'src/enviroment/enviroment';
import { User } from 'src/entities/user.entity';
import { getRandomString } from 'src/common/random.helper';

const getEnv = environment();

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) { }

  async loginUser(user: CreateUserModel): Promise<any> {
    if (!(user && user.email && user.password)) {
      throw new HttpException('Email and password are required!', HttpStatus.UNAUTHORIZED);
    }

    const userOne: UserModel = await this.usersService.findOneByEmail(user.email);
    if (!userOne) {
      throw new HttpException('This email does not exist!', HttpStatus.NOT_FOUND);
    }

    if (userOne) {
      const passOk = await this.usersService.compareHash(user.password, userOne.password);
      if (passOk) {
        if (!userOne.active) {
          throw new HttpException('You have to verify your email', HttpStatus.UNAUTHORIZED);
        }

        const jwtPayload = await this.createJwt(userOne);
        return jwtPayload;
      }
    }

    throw new HttpException('Email or password wrong!', HttpStatus.UNAUTHORIZED);
  }

  async validateUserByJwt(payload: AccessJwtPayload): Promise<any> {
    const user: UserModel = await this.usersService.findOneByEmail(payload.email);

    if (user) {
      return this.createJwt(user);
    }
    throw new UnauthorizedException();
  }

  async createJwt(user) {
    const accessData: AccessJwtPayload = {
      email: user.email,
      roles: user.roles,
      isAccess: true,
    };
    const refreshData: RefreshJwtPayload = {
      email: user.email,
      isAccess: false,
    };
    const accessJwt = this.jwtService.sign(accessData, { expiresIn: getEnv.expiresInAccess });
    const refreshJwt = this.jwtService.sign(refreshData, { expiresIn: getEnv.expiresInRefresh });

    return {
      accessToken: accessJwt,
      refreshToken: refreshJwt,
    };
  }

  async registerUser(newUser): Promise<UserModel> {
    if (!(newUser && newUser.email && newUser.password)) {
      throw new HttpException('Username and password are required!', HttpStatus.UNAUTHORIZED);
    }

    const user: UserModel = await this.usersService.findOneByEmail(newUser.email);

    if (!user) {
      const userSave = await this.usersService.create(newUser);

      if (userSave) {
        newUser.password = undefined;
      }
      await this.sendEmail(userSave);

      return userSave;
    }
    throw new HttpException('Email exists', HttpStatus.UNAUTHORIZED);
  }

  async sendEmail(user: UserModel): Promise<boolean> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'asptestapplication@gmail.com',
        pass: 'Ghjcnj gfhjkm1',
      },
    });

    const link = 'https://localhost:443/auth/verify/' + user.cypher;
    const mailOptions = {
      from: '<foo@example.com>',
      to: user.email,
      subject: 'Verify Email',
      text: 'Verify Email',
      html: 'Hi! <br><br> Thanks for your registration<br><br>' +
        '<a href=' + link + '>Click here to activate your account</a>',
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return false;
      }
      return true;
    });

    return true;
  }

  async verifyEmail(cypher: string): Promise<boolean> {
    const resRepo: User = await this.userRepository.findOneByCypher(cypher);
    if (resRepo) {
      const userFromDb: User = await this.userRepository.findOneByEmail(resRepo.email);

      if (userFromDb) {
        userFromDb.active = true;
        userFromDb.cypher = null;
        const savedUser = await this.userRepository.saveUser(userFromDb);

        if (savedUser) {
          return true;
        }
      }
    }
    throw new HttpException('LOGIN. EMAIL CODE NOT VALID', HttpStatus.FORBIDDEN);
  }

  async getForgotPass(email: string): Promise<UserModel> {
    const emailExist: UserModel = await this.usersService.findOneByEmail(email);
    const newPass = await getRandomString();

    if (emailExist) {
      const sent: boolean = await this.sendForgotPassword(emailExist, newPass);

      if (sent) {
        emailExist.password = newPass;
        await this.usersService.updateUser(emailExist);

        return emailExist;
      }
    }

    throw new HttpException('PASSWORD IS NOT SENT. LOGIN ERROR', HttpStatus.NOT_IMPLEMENTED);
  }

  async sendForgotPassword(user: UserModel, newPass: string): Promise<boolean> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'asptestapplication@gmail.com',
        pass: 'Ghjcnj gfhjkm1',
      },
    });

    const mailOptions = {
      from: '<foo@example.com>',
      to: user.email,
      subject: 'New password',
      text: 'Your new password',
      html: 'Hi! <br><br> Here is your new password:<br><br>' + newPass,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return false;
      }
    });

    return true;
  }

  async refreshToken(token) {
    const payloadAccess = this.jwtService.decode(token.access);
    const pyloadRefresh = this.jwtService.decode(token.refresh);
    // tslint:disable-next-line: no-string-literal
    const exp = payloadAccess['exp'];
    // tslint:disable-next-line: no-string-literal
    const refreshExp = pyloadRefresh['exp'];
    const date = new Date().valueOf() / 1000;
    if (exp <= date ) {
      if (refreshExp <= date) {
        throw new HttpException('Enter your email and password', HttpStatus.UNAUTHORIZED);
      }

      const user = {
        // tslint:disable-next-line: no-string-literal
        email: payloadAccess['email'],
        // tslint:disable-next-line: no-string-literal
        role: payloadAccess['role'],
      };
      const tokens = this.createJwt(user);
      return tokens;
    }
    return token;
  }
}
