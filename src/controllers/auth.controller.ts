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
    async login(@Body() user: UserModel) {
        const loginUser = await this.authService.loginUser(user);
        return loginUser;
    }

    @Post('register')
    async registerUser(@Body() newUser: UserModel) {
        const registerUser = await this.authService.registerUser(newUser);
        return registerUser;
    }

    @Get('verify/:cypher')
    public async verifyEmail(@Param() params): Promise<boolean> {
        try {
            const isEmailVerified = await this.authService.verifyEmail(params.cypher);
            // tslint:disable-next-line: no-console
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
