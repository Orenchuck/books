import { Controller, Get, Param, Post, Body, Query, Delete, UseFilters, HttpException, HttpStatus } from '@nestjs/common';
import { BooksService } from 'src/services/books.service';
import { CreateBookDTO } from 'src/books/dto/create-book.dto';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) { }

    @Get()
    async getBooks() {
        const books = await this.booksService.getBooks();
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        return books;
    }

    @Get(':bookID')
    async getBook(@Param('bookID') bookID) {
        const book = await this.booksService.getBook(bookID);
        return book;
    }

    @Post()
    async addBook(@Body() createBookDTO: CreateBookDTO) {
        const book = await this.booksService.addBook(createBookDTO);
        return book;
    }

    @Delete()
    async deleteBook(@Query() query) {
        const books = await this.booksService.deleteBook(query.bookID);
        return books;
    }
}