import { Injectable, UnauthorizedException, HttpException, HttpStatus, HttpService } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/services/user.services';
import { JwtPayload } from 'src/models/jwt-payload.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from 'src/models/user.model';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from 'src/repositories/auth.repository';

import nodemailer = require('nodemailer');
import { UserRepository } from 'src/repositories/user.repository';
import { UserDocument } from 'src/documents/user.document';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
  ) {
  }

  async loginUser(user: UserModel) {
    if (!(user && user.email && user.password)) {
      throw new HttpException('Email and password are required!', HttpStatus.FORBIDDEN);
    }

    const userOne: UserModel = await this.usersService.findOneByEmail(user.email);

    if (userOne) {
      if (await this.usersService.compareHash(user.password, userOne.password)) {
        const jwtPayload = await this.createJwtPayload(user);
        return jwtPayload;
      }
    }

    if (!userOne.active) {
      throw new HttpException('Sorry, you have to verify your email', HttpStatus.FORBIDDEN);
    }

    throw new HttpException('Email or password wrong!', HttpStatus.FORBIDDEN);
  }

  async validateUserByJwt(payload: JwtPayload) {
    const user = await this.usersService.findOneByEmail(payload.email);

    if (user) {
      return this.createJwtPayload(user);
    }
    throw new UnauthorizedException();
  }

  async createJwtPayload(user) {
    const data: JwtPayload = {
      email: user.email,
      role: user.role,
    };
    const accessJwt = this.jwtService.sign(data);
    return {
      expiresIn: 3600,
      token: accessJwt,
    };
  }

  async registerUser(newUser) {
    if (!(newUser && newUser.email && newUser.password)) {
      throw new HttpException('Username and password are required!', HttpStatus.FORBIDDEN);
    }

    const user = await this.usersService.findOneByEmail(newUser.email);

    if (!user) {
      const userSave = await this.usersService.create(newUser);

      if (userSave) {
        newUser.password = undefined;
      }
      const sent = await this.sendEmail(userSave);
      if (!sent) {
        // tslint:disable-next-line: no-console
        console.log('REGISTRATION.ERROR.MAIL_NOT_SENT');
      }
      // tslint:disable-next-line: no-console
      console.log('REGISTRATION.USER_REGISTERED_SUCCESSFULLY');
      return userSave;
    }
    throw new HttpException('Email exists', HttpStatus.FORBIDDEN);
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
        // console.log('error ' + error);
        return false;
      }
      // tslint:disable-next-line: no-console
      console.log('Message sent: %s', info.messageId);
      return true;
    });

    return true;
  }

  async verifyEmail(cypher: string): Promise<boolean> {
    const resRepo = await this.authRepository.verifyEmail(cypher);
    if (resRepo) {
      const userFromDb: UserDocument = await this.userRepository.findOneByEmail(resRepo.email);

      if (userFromDb) {
        userFromDb.active = true;
        userFromDb.cypher = undefined;
        const savedUser = await this.authRepository.saveUser(userFromDb);

        if (savedUser) {
          return true;
        }
      }
    }
    throw new HttpException('LOGIN.EMAIL_CODE_NOT_VALID', HttpStatus.FORBIDDEN);
  }

  //   async setPassword(user: User): Promise<boolean> {
  //     const pass = Math.random().toString(36).slice(2);
  //     user.password = await bcrypt.hash(pass, 10);
  //     return await user.save();
  //   }

  //   async sendForgotPassword(user: User): Promise<boolean> {

  //     return
  //   }
}
