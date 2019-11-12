import { Get, Controller, Render, Post, Body } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from 'src/services/app.service';
import { UsersService} from 'src/services/user.services';

@Controller()
export class AppController {
    constructor(private usersService: UsersService) {
    }
//     constructor(private readonly appService: AppService) {}

//   @Get()
//   root(@Res() res: Response) {
//     return res.render(
//       this.appService.getViewName(),
//       { message: 'Hello world!' },
//     );
  @Get()
  @Render('index')
  root() {
    // return { message: 'this is the login page' };
  }

  @Get()
  @Render('login')
  loginUser() {}

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
}