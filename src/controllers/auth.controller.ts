import { Controller, Get, Post, Body, Response, HttpStatus, HttpException, HttpCode, Param } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { UsersService } from 'src/services/user.services';
import { UserModel } from 'src/models/user.model';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
    ) {

    }

    @Post()
    @HttpCode(HttpStatus.OK)
    async login(@Response() res: any, @Body() user: UserModel) {
        if (!(user && user.email && user.password)) {
            return res.status(HttpStatus.FORBIDDEN).json({
                message: 'Email and password are required!',
            });
        }

        const userOne: UserModel = await this.userService.findOneByEmail(user.email);

        if (userOne) {
            if (await this.userService.compareHash(user.password, userOne.password)) {
                return res.status(HttpStatus.OK).json(
                    await this.authService.createJwtPayload(user));
            }
        }
        if (!userOne.active) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: 'Sorry, you have to verify your email' });
        }
        return res.status(HttpStatus.FORBIDDEN).json({ message: 'Email or password wrong!' });
    }

    // @Post('register')
    // async registerUser(
    //     @Response() res: any,
    //     @Body() newUser: UserModel,
    // ) {
    //     if (!(newUser && newUser.email && newUser.password)) {
    //         return res.status(HttpStatus.FORBIDDEN).json({
    //             message: 'Username and password are required!',
    //         });
    //     }

    //     const user = await this.userService.findOneByEmail(newUser.email);

    //     if (user) {
    //         return res.status(HttpStatus.FORBIDDEN).json({ message: 'Email exists' });
    //     } else {
    //         const userSave = await this.userService.create(newUser);

    //         if (userSave) {
    //             newUser.password = undefined;
    //         }
    //         const sent = await this.authService.sendEmail(userSave);
    //         if (sent) {
    //             console.log('REGISTRATION.USER_REGISTERED_SUCCESSFULLY');
    //         } else {
    //             console.log('REGISTRATION.ERROR.MAIL_NOT_SENT');
    //         }
    //         return res.status(HttpStatus.OK).json(userSave);
    //     }
    // }

    @Get('verify/:cypher')
    public async verifyEmail(@Param() params): Promise<boolean> {
        try {
            const isEmailVerified = await this.authService.verifyEmail(params.cypher);
            console.log('LOGIN.EMAIL_VERIFIED', isEmailVerified);
            return isEmailVerified;
        } catch (error) {
            throw new HttpException('LOGIN.ERROR', HttpStatus.FORBIDDEN);
        }
    }

    // @Get('forgot-password/:email')
    // async forgotPasswordEmail(@Param() params): Promise<boolean> {
    //     try {
    //         const EmailExist: UserModel = await this.userService.findOneByEmail(params.email);
    //         if (EmailExist) {
    //             const sent = await this.authService.sendForgotPassword(EmailExist);
    //         }
    //         return;
    //     } catch (error) {
    //         throw new HttpException('LOGIN.ERROR', HttpStatus.FORBIDDEN);
    //     }
    //     return
    // }
}
