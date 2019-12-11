import { Controller, Get, Post, Body, HttpStatus, HttpCode, Param, Redirect, Res } from '@nestjs/common';
import { AuthService } from 'src/services/servicesSql/auth.service';
import { UserModel } from 'src/models/user.model';
import { ApiUseTags } from '@nestjs/swagger';
import { CreateUserModel } from 'src/models/create-user.model';

@Controller('auth')
@ApiUseTags('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    async login(@Body() user: CreateUserModel) {
        const loginUser = await this.authService.loginUser(user);
        return loginUser;
    }

    @Post('register')
    async registerUser(@Body() newUser: CreateUserModel): Promise<UserModel> {
        const registerUser = await this.authService.registerUser(newUser);
        return registerUser;
    }

    @Get('verify/:cypher')
    public async verifyEmail(@Param() params, @Res() res): Promise<boolean> {
        const isEmailVerified = await this.authService.verifyEmail(params.cypher);
        return res.redirect('/books');
    }

    @Get('forgot-password/:email')
    @Redirect('https://localhost/books', 302)
    async sendForgotPasswordEmail(@Param('email') email: string): Promise<UserModel> {
        const getPass = await this.authService.getForgotPass(email);
        return getPass;
    }

    @Post('refresh')
    async refreshToken(@Body() token) {
        const newToken = await this.authService.refreshToken(token);
        return newToken;
    }
}
