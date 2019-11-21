import { Injectable, UnauthorizedException, HttpException, HttpStatus, HttpService } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/services/user.services';
import { JwtPayload } from 'src/models/jwt-payload.model';
// import { UserDocument } from 'src/documents/user.document';
import { InjectModel } from '@nestjs/mongoose';
// import { EmailVerification } from 'src/documents/email-verification.interface';
import { Model } from 'mongoose';
// import { ConsentRegistry } from 'src/documents/consent-registry.interface';
// import { default as config } from 'src/enviroment/config';
import { User } from 'src/models/user.model';

import nodemailer = require('nodemailer');

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    // @InjectModel('EmailVerification') private readonly emailVerificationModel: Model<EmailVerification>,
    // @InjectModel('ConsentRegistry') private readonly consentRegistryModel: Model<ConsentRegistry>,
    @InjectModel('User') private userModel: Model<User>,
  ) {
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
      role: user.role,
    };
    const accessJwt = this.jwtService.sign(data);
    // const refreshJwt = this.jwtService.sign(data);
    // tslint:disable-next-line: no-console
    console.log(accessJwt);
    return {
      expiresIn: 3600,
      token: accessJwt,
    };
  }

  async sendEmail(user: User): Promise<boolean> {
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
        console.log('error ' + error);
        return false;
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      return true;
    });

    return true;
  }

  async verifyEmail(cypher: string): Promise<boolean> {
    const emailVerif = await this.userModel.findOne({ cypher });
    if (emailVerif && emailVerif.email) {
      const userFromDb = await this.userModel.findOne({ email: emailVerif.email });
      if (userFromDb) {
        userFromDb.activate = true;
        const savedUser = await userFromDb.save();
        await emailVerif.remove();
        return savedUser;
      }
    } else {
      throw new HttpException('LOGIN.EMAIL_CODE_NOT_VALID', HttpStatus.FORBIDDEN);
    }
  }
}
