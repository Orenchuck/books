import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/services/user.services';
import { AuthGuard } from '@nestjs/passport';
import * as bodyParser from 'body-parser';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @Post() 
    async create(
        @Body('email') userEmail: string,
        @Body('password') userPassword: string
    ) {
       const newUser = await this.usersService.create(
            userEmail,
            userPassword
        );        
        return newUser;
    }

    @Get('test')
    @UseGuards(AuthGuard())
    testAuthRoute(){
        return {
            message: 'You did it!'
        }
    }
}