import { Controller, Get, Post, Body, HttpStatus, HttpException, HttpCode, Param, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { UserModel } from 'src/models/user.model';
import { RolesGuard } from 'src/common/guards/roles.guards';

@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

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

    @Get('forgot-password/:email')
    async forgotPasswordEmail(@Param('email') email: string): Promise<UserModel> {
        try {
            const getPass = this.authService.getForgotPass(email);
            return getPass;
        } catch (error) {
            throw new HttpException('LOGIN.ERROR', HttpStatus.FORBIDDEN);
        }
    }
}
