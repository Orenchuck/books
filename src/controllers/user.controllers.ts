import { Controller, Get, Post, Body, UseGuards, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from 'src/services/servicesSql/user.services';
import { UserModel } from 'src/models/user.model';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { Roles } from 'src/common/roles.decorator';
import { UserRole } from 'src/models/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserModel } from 'src/models/create-user.model';

@Controller('users')
@ApiUseTags('user')
@UseGuards(RolesGuard)
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @Post()
    async create(@Body() user: CreateUserModel): Promise<UserModel> {
      const newUser = await this.usersService.create(user);
      return newUser;
    }

    @Get()
    // @Roles(UserRole.Admin)
    // @UseGuards(AuthGuard('jwt'))
    // @ApiBearerAuth()
    async getAllUsers(): Promise<UserModel[]> {
        const users = await this.usersService.getAllUsers();
        return users;
    }

    @Get(':id')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getUserbyID(@Param('id') id: string): Promise<UserModel> {
        const user = await this.usersService.getUserbyID(id);
        return user;
    }

    @Get('email/:email')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async findUserbyEmail(@Param('email') email: string): Promise<UserModel> {
        const user = await this.usersService.findOneByEmail(email);
        return user;
    }

    @Put()
    // @Roles(UserRole.Admin, UserRole.User)
    // @UseGuards(AuthGuard('jwt'))
    // @ApiBearerAuth()
    async updateUser(@Body() userToUpdate: UserModel): Promise<boolean> {
        const user = await this.usersService.updateUser(userToUpdate);
        return user;
    }

    @Get('del/:id')
    @Roles(UserRole.Admin, UserRole.User)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async isDelUser(@Param('id') id: string): Promise<boolean> {
        const delUser = await this.usersService.isDeleteUser(id);
        return delUser;
    }

    @Delete(':id')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async deleteUser(@Param('id') id: string): Promise<boolean> {
        const users = await this.usersService.deleteUser(id);
        return users;
    }
  }
