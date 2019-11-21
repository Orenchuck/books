import { Controller, Get, Param, Post, Body, Query, Delete, UseFilters, HttpException, HttpStatus } from '@nestjs/common';
import { BooksService } from 'src/services/books.service';
// import { ConfigService } from 'src/enviroment/config.service';

@Controller('books')
export class BooksController {
    constructor(
        private readonly booksService: BooksService,
        // private configService: ConfigService,
    ) { }

    @Get()
    async getBooks() {
        const books = await this.booksService.getBooks();
        return books;
    }

    @Get(':bookID')
    async getBook(@Param('bookID') bookID: string) {
        const book = await this.booksService.findBook(bookID);
        return book;
    }

    @Post()
    async addBook(
        @Body('title') bookTitle: string,
        @Body('author') bookAuthor: string,
        @Body('price') bookPrice: number,
    ) {
        const generatedId = await this.booksService.insertBook(
            bookTitle,
            bookAuthor,
            bookPrice,
        );
        return { id: generatedId };
    }

    @Delete(':bookID')
    async deleteBook(@Param('bookID') bookID: string) {
        const books = await this.booksService.deleteBook(bookID);
        return books;
    }
}
