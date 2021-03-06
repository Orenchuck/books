import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { AuthorsService } from 'src/services/servicesSql/author.service';
import { AuthorModel } from 'src/models/author.model';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { Roles } from 'src/common/roles.decorator';
import { UserRole } from 'src/enums/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateAuthorModel } from 'src/models/create-author.model';

@ApiUseTags('authors')
@Controller('authors')
@UseGuards(RolesGuard)
export class AuthorsController {
    constructor(private readonly authorsService: AuthorsService) { }

    @Get()
    async getAllAuthors(): Promise<AuthorModel[]> {
        const authors = await this.authorsService.getAllAuthors();
        return authors;
    }

    @Get(':authorID')
    async findAuthorById(@Param('authorID') authorID: string): Promise<AuthorModel> {
        const author = await this.authorsService.findAuthorById(authorID);
        return author;
    }

    @Get('name/:name')
    async findAuthorByName(@Param('name') name: string): Promise<AuthorModel> {
        const author = await this.authorsService.findAuthorByName(name);
        return author;
    }

    @Post()
    @Roles(UserRole.Admin)
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async addAuthor(@Body() author: CreateAuthorModel): Promise<AuthorModel> {
        const newAuthor = await this.authorsService.addAuthor(author);
        return newAuthor;
    }

    @Put()
    @Roles(UserRole.Admin)
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async updateAuthor(@Body() authorToUpdate: AuthorModel): Promise<boolean> {
        const author = await this.authorsService.updateAuthor(authorToUpdate);
        return author;
    }

    @Put('del')
    @Roles(UserRole.Admin)
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async isDelAuthor(@Body() id: string): Promise<boolean> {
        const delAuthor = await this.authorsService.isDeleteAuthor(id);
        return delAuthor;
    }

    @Delete(':authorID')
    @Roles(UserRole.Admin)
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async deleteAuthor(@Param('authorID') authorID: string): Promise<boolean> {
        const authors = await this.authorsService.deleteAuthor(authorID);
        return authors;
    }
}
