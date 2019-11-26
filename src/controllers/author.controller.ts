import { Controller, Get, Param, Post, Body, Put, Delete, UseFilters, HttpException, HttpStatus } from '@nestjs/common';
import { AuthorsService } from 'src/services/author.service';
import { AuthorModel } from 'src/models/author.model';

@Controller('authors')
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
    async addAuthor(@Body() author: AuthorModel) {
        const newAuthor = await this.authorsService.insertAuthor(author);
        return newAuthor;
    }

    @Put()
    async updateAuthor(@Body() authorToUpdate: AuthorModel) {
        const author = await this.authorsService.updateAuthor(authorToUpdate);
        return author;
    }

    @Get('del/:id')
    async isDelUser(@Param('id') id: string): Promise<boolean> {
        const delAuthor = await this.authorsService.isDelAuthor(id);
        return delAuthor;
    }

    @Delete(':authorID')
    async deleteAuthor(@Param('authorID') authorID: string) {
        const authors = await this.authorsService.deleteAuthor(authorID);
        return authors;
    }
}
