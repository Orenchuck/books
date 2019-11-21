import { Controller, Get, Post, Body, UseGuards, Param, Delete } from '@nestjs/common';
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

    @Get(':id')
    async getUserbyID(@Param('id') id: string) {
        const user = await this.usersService.getUserbyID(id);
        return user;
    }

    @Get('/email/:email')
    async getUserbyEmail(@Param('email') email: string) {
        const user = await this.usersService.findOneByEmail(email);
        return user;
    }

    @Delete(':id')
    async deleteBook(@Param('id') id: string) {
        const users = await this.usersService.deleteUser(id);
        return users;
    }

  //   @Get()
  //   @UseGuards(RolesGuard)
  //   testAuthRoute() {
  //     return {
  //         message: 'You did it!',
  //     };
  // }
  }
