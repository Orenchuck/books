import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from 'src/services/user.services';
import { AuthGuard } from '@nestjs/passport';
import { UserDocument } from 'src/documents/user.document';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @Post()
    async create(
        @Body() user: UserDocument,
    ) {
      const newUser = await this.usersService.create(
       user,
      );
      return newUser;
    }
  }
