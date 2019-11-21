import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { UsersService } from 'src/services/user.services';
import { AuthGuard } from '@nestjs/passport';
import { UserDocument } from 'src/documents/user.document';
import { RolesGuard } from 'src/common/guards/roles.guards';

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

    @Get()
    async getAllUsers() {
        const users = await this.usersService.getAllUsers();
        return users;
    }

    @Get(':bookID')
    async getUserbyID(@Param('bookID') id: string) {
        const book = await this.usersService.getUserbyID(id);
        return book;
    }

  //   @Get()
  //   @UseGuards(RolesGuard)
  //   testAuthRoute() {
  //     return {
  //         message: 'You did it!',
  //     };
  // }
  }
