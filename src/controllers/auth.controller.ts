import { Controller, Get, Post, Body, HttpStatus, HttpCode, Param } from '@nestjs/common';
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
    public async verifyEmail(@Param() params): Promise<boolean> {
        const isEmailVerified = await this.authService.verifyEmail(params.cypher);
        return isEmailVerified;
    }

    @Get('forgot-password/:email')
    async sendForgotPasswordEmail(@Param('email') email: string): Promise<UserModel> {
            const getPass = this.authService.getForgotPass(email);
            return getPass;
    }

    @Post('refresh')
    async refreshToken(@Body() token) {
            const newToken = this.authService.refreshToken(token);
            return newToken;
    }
}
