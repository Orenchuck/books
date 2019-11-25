import { Controller, Get, Param, Post, Body, Put, Delete, UseFilters, HttpException, HttpStatus } from '@nestjs/common';
import { BooksService } from 'src/services/books.service';
import { BookModel } from 'src/models/book.model';
// import { ConfigService } from 'src/enviroment/config.service';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Get()
    async getBooks(): Promise<BookModel[]> {
        const books = await this.booksService.getBooks();
        return books;
    }

    @Get(':bookID')
    async getBook(@Param('bookID') bookID: string): Promise<BookModel> {
        const book = await this.booksService.findBookById(bookID);
        return book;
    }

    @Post()
    async addBook(@Body() book: BookModel) {
        const newBook = await this.booksService.insertBook(book);
        return newBook;
    }

    @Put()
    async updateBook(@Body() bookToUpdate: BookModel) {
        const book = await this.booksService.updateBook(bookToUpdate);
        return book;
    }

    @Delete(':bookID')
    async deleteBook(@Param('bookID') bookID: string) {
        const books = await this.booksService.deleteBook(bookID);
        return books;
    }
}
