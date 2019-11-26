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

    @Get('title/:title')
    async findBookByTitle(@Param('title') title: string): Promise<BookModel> {
        const book = await this.booksService.findBookByTitle(title);
        return book;
    }

    @Get('author/:author')
    async findBookByAuthor(@Param('author') author: string): Promise<BookModel> {
        const book = await this.booksService.findBookByAuthor(author);
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

    @Get('del/:id')
    async isDelUser(@Param('id') id: string): Promise<boolean> {
        const delBook = await this.booksService.isDelBook(id);
        return delBook;
    }

    @Delete(':bookID')
    async deleteBook(@Param('bookID') bookID: string) {
        const books = await this.booksService.deleteBook(bookID);
        return books;
    }
}
