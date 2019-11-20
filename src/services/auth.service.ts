import { Injectable, UnauthorizedException, HttpException, HttpStatus, HttpService } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/services/user.services';
import { JwtPayload } from 'src/models/jwt-payload.model';
import { UserDocument } from 'src/documents/user.document';
import { InjectModel } from '@nestjs/mongoose';
import { EmailVerification } from 'src/documents/email-verification.interface';
import { Model } from 'mongoose';
import { ConsentRegistry } from 'src/documents/consent-registry.interface';
import { default as config } from 'src/enviroment/config';

import nodemailer = require('nodemailer');

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel('EmailVerification') private readonly emailVerificationModel: Model<EmailVerification>,
    @InjectModel('ConsentRegistry') private readonly consentRegistryModel: Model<ConsentRegistry>,
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

  // async createEmailToken(email: string): Promise<boolean> {
  //   const emailVerification = await this.emailVerificationModel.findOne({ email });
  //   if (emailVerification && ((new Date().getTime() - emailVerification.timestamp.getTime()) / 60000 < 15)) {
  //     throw new HttpException('LOGIN.EMAIL_SENDED_RECENTLY', HttpStatus.INTERNAL_SERVER_ERROR);
  //   } else {
  //     await this.emailVerificationModel.findOneAndUpdate(
  //       { email },
  //       {
  //         email,
  //         emailToken: Math.floor(Math.random() * (9000000)) + 1000000,
  //         timestamp: new Date(),
  //       },
  //       { upsert: true },
  //     );
  //     return true;
  //   }
  // }

  async sendEmail(email: string): Promise<boolean> {
    // const model = await this.emailVerificationModel.findOne({ email });
    let testAccount = await nodemailer.createTestAccount();
    // if (model && model.emailToken) {
    const transporter = nodemailer.createTransport({
      // host: 'smtp.gmail.com',
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const mailOptions = {
      from: '<foo@example.com>',
      to: email,
      subject: 'Verify Email',
      text: 'Verify Email',
      html: 'Hi! <br><br> Thanks for your registration<br><br>' +
        '<a href=' + config.host.url + ':' + config.host.port + '/auth/email/verify/' +
        // model.emailToken +
        '>Click here to activate your account</a>',
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

    return;
  }
}
