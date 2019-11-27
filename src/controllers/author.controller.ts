import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { AuthorsService } from 'src/services/author.service';
import { AuthorModel } from 'src/models/author.model';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { Roles } from 'src/common/roles.decorator';
import { UserRole } from 'src/models/user-role.enum';

@Controller('authors')
@UseGuards(RolesGuard)
export class AuthorsController {
    constructor(private readonly authorsService: AuthorsService) { }

    @Get()
    async getAuthors(): Promise<AuthorModel[]> {
        const authors = await this.authorsService.getAuthors();
        return authors;
    }

    @Get(':authorID')
    async getAuthor(@Param('authorID') authorID: string): Promise<AuthorModel> {
        const author = await this.authorsService.findAuthorById(authorID);
        return author;
    }

    @Get('name/:name')
    async findAuthorByTitle(@Param('name') name: string): Promise<AuthorModel> {
        const author = await this.authorsService.findAuthorByName(name);
        return author;
    }

    @Post()
    @Roles(UserRole.Admin)
    async addAuthor(@Body() author: AuthorModel) {
        const newAuthor = await this.authorsService.insertAuthor(author);
        return newAuthor;
    }

    @Put()
    @Roles(UserRole.Admin)
    async updateAuthor(@Body() authorToUpdate: AuthorModel) {
        const author = await this.authorsService.updateAuthor(authorToUpdate);
        return author;
    }

    @Get('del/:id')
    @Roles(UserRole.Admin)
    async isDelUser(@Param('id') id: string): Promise<boolean> {
        const delAuthor = await this.authorsService.isDelAuthor(id);
        return delAuthor;
    }

    @Delete(':authorID')
    @Roles(UserRole.Admin)
    async deleteAuthor(@Param('authorID') authorID: string) {
        const authors = await this.authorsService.deleteAuthor(authorID);
        return authors;
    }
}
