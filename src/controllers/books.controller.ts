import { Controller, Get, Param, Post, Body, Query, Delete, UseFilters, HttpException, HttpStatus } from '@nestjs/common';
import { BooksService } from 'src/services/books.service';
import { ConfigService } from 'src/enviroment/config.service';

@Controller('books')
export class BooksController {
    constructor(
        private readonly booksService: BooksService,
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

    @Post()
    addBook(
        @Body('title') bookTitle: string,
        @Body('author') bookAuthor: string,
        @Body('price') bookPrice: number
    ): any {
        const generatedId = this.booksService.insertBook(
            bookTitle,
            bookAuthor,
            bookPrice
        );
        return { id: generatedId };
    }

    @Delete()
    async deleteBook(@Query() query) {
        const books = await this.booksService.deleteBook(query.bookID);
        return books;
    }
}