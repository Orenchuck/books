import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { AuthorBooksService } from 'src/services/servicesSql/author-book.service';
import { BookModel } from 'src/models/book.model';
import { Roles } from 'src/common/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { UserRole } from 'src/enums/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthorBookModel } from 'src/models/author-book.model';

@ApiUseTags('authorBooks')
@Controller('authorBooks')
@UseGuards(RolesGuard)
export class AuthorBooksController {
    constructor(private readonly authorBooksService: AuthorBooksService) { }

    @Get()
    async getAllData(): Promise<AuthorBookModel[]> {
        const data = await this.authorBooksService.getAllData();
        return data;
    }

    @Get(':bookID')
    async findBookById(@Param('bookID') bookID: string): Promise<AuthorBookModel[]> {
        const book: AuthorBookModel[] = await this.authorBooksService.findBookById(bookID);
        return book;
    }

    @Get('author/:authorID')
    async findAuthorById(@Param('authorID') authorID: string): Promise<AuthorBookModel[]> {
        const author: AuthorBookModel[] = await this.authorBooksService.findAuthorById(authorID);
        return author;
    }

    @Post()
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async addData(@Body() data: AuthorBookModel) {
        const newData = await this.authorBooksService.addData(data);
        return newData;
    }

    @Delete(':bookID')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async deleteBook(@Param('bookID') bookID: string) {
        const books = await this.authorBooksService.deleteBook(bookID);
        return books;
    }

    @Delete('author/:authorID')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async deleteAuthor(@Param('bookID') bookID: string) {
        const author = await this.authorBooksService.deleteAuthor(bookID);
        return author;
    }
}
