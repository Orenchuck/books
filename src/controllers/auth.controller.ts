
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }

    @Post() 
    async login(
        @Body('email') userEmail: string,
        @Body('password') userPassword: string
    ){
        return await this.authService.validateUserByPassword(
            {userEmail,
            userPassword}
        );
    }

}