import { Controller, Get, Post, Body, UseGuards, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from 'src/services/user.services';
import { AuthGuard } from '@nestjs/passport';
import { UserDocument } from 'src/documents/user.document';
import { UserModel } from 'src/models/user.model';
import { RolesGuard } from 'src/common/guards/roles.guards';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @Post()
    async create(@Body() user: UserModel) {
      const newUser = await this.usersService.create(user);
      return newUser;
    }

    @Get()
    async getAllUsers(): Promise<UserModel[]> {
        const users = await this.usersService.getAllUsers();
        return users;
    }

    @Get(':id')
    async getUserbyID(@Param('id') id: string): Promise<UserModel> {
        const user = await this.usersService.getUserbyID(id);
        return user;
    }

    @Get('email/:email')
    async getUserbyEmail(@Param('email') email: string): Promise<UserModel> {
        const user = await this.usersService.findOneByEmail(email);
        return user;
    }

    @Put()
    async updateUser(@Body() userToUpdate: UserModel) {
        const user = await this.usersService.updateUser(userToUpdate);
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
