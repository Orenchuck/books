import { Controller, Get, Post, Body, UseGuards, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from 'src/services/user.services';
import { UserModel } from 'src/models/user.model';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { Roles } from 'src/common/roles.decorator';
import { UserRole } from 'src/models/user-role.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
@UseGuards(RolesGuard)
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() user: UserModel) {
      const newUser = await this.usersService.create(user);
      return newUser;
    }

    @Get()
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    async getAllUsers(): Promise<UserModel[]> {
        const users = await this.usersService.getAllUsers();
        return users;
    }

    @Get(':id')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    async getUserbyID(@Param('id') id: string): Promise<UserModel> {
        const user = await this.usersService.getUserbyID(id);
        return user;
    }

    @Get('email/:email')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    async getUserbyEmail(@Param('email') email: string): Promise<UserModel> {
        const user = await this.usersService.findOneByEmail(email);
        return user;
    }

    @Put()
    @Roles(UserRole.Admin, UserRole.User)
    @UseGuards(AuthGuard('jwt'))
    async updateUser(@Body() userToUpdate: UserModel) {
        const user = await this.usersService.updateUser(userToUpdate);
        return user;
    }

    @Get('del/:id')
    @Roles(UserRole.Admin, UserRole.User)
    @UseGuards(AuthGuard('jwt'))
    async isDelUser(@Param('id') id: string): Promise<boolean> {
        const delUser = await this.usersService.isDelUser(id);
        return delUser;
    }

    @Delete(':id')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    async deleteUser(@Param('id') id: string) {
        const users = await this.usersService.deleteUser(id);
        return users;
    }
  }
