import { Controller, Get, Param, Post, Body, Query, Delete, UseFilters, HttpException, HttpStatus } from '@nestjs/common';
import { BooksService } from 'src/services/books.service';
import { ConfigService } from 'src/enviroment/config.service';

@Controller('books')
export class BooksController {
    constructor(
        private booksService: BooksService,
        private configService: ConfigService
    ) { }

    @Get()
    async getBooks() {
        const books = await this.booksService.getBooks();
        return books;
    }

    @Get(':bookID')
    async getBook(@Param('bookID') bookID) {
        const book = await this.booksService.getBook(bookID);
        return book;
    }

    @Delete()
    async deleteBook(@Query() query) {
        const books = await this.booksService.deleteBook(query.bookID);
        return books;
    }
}