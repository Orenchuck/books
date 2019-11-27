import { Controller, Get, Param, Post, Body, Put, Delete, UseFilters, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { BooksService } from 'src/services/books.service';
import { BookModel } from 'src/models/book.model';
import { Roles } from 'src/common/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { UserRole } from 'src/models/user-role.enum';

@Controller('books')
@UseGuards(RolesGuard)
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
    @Roles(UserRole.Admin)
    async addBook(@Body() book: BookModel) {
        const newBook = await this.booksService.insertBook(book);
        return newBook;
    }

    @Put()
    @Roles(UserRole.Admin)
    async updateBook(@Body() bookToUpdate: BookModel) {
        const book = await this.booksService.updateBook(bookToUpdate);
        return book;
    }

    @Get('del/:id')
    @Roles(UserRole.Admin)
    async isDelBook(@Param('id') id: string): Promise<boolean> {
        const delBook = await this.booksService.isDelBook(id);
        return delBook;
    }

    @Delete(':bookID')
    @Roles(UserRole.Admin)
    async deleteBook(@Param('bookID') bookID: string) {
        const books = await this.booksService.deleteBook(bookID);
        return books;
    }
}
