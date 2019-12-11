import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { BooksService } from 'src/services/servicesSql/books.service';
import { BookModel } from 'src/models/book.model';
import { Roles } from 'src/common/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { UserRole } from 'src/enums/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateBookModel } from 'src/models/create-book.model';
import { FilterModel } from 'src/models/filter.model';

@ApiUseTags('books')
@Controller('books')
@UseGuards(RolesGuard)
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Get('filter')
    async getFilteredBooks(@Query()filter: FilterModel): Promise<BookModel[]> {
        const filteredBooks: BookModel[] = await this.booksService.getFilteredBooks(filter);
        return filteredBooks;
    }

    @Get('pagination/:limit/:offset')
    async pagination(@Param('limit') limit: string, @Param('offset') offset: string): Promise<BookModel[]> {
        const books: BookModel[] = await this.booksService.pagination(limit, offset);
        return books;
    }

    @Get()
    async getAllBooks(): Promise<BookModel[]> {
        const books = await this.booksService.getAllBooks();
        return books;
    }

    @Get(':bookID')
    async findBookById(@Param('bookID') bookID: string): Promise<BookModel> {
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
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async addBook(@Body() book: CreateBookModel) {
        const newBook = await this.booksService.addBook(book);
        return newBook;
    }

    @Put()
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async updateBook(@Body() bookToUpdate: BookModel) {
        const book = await this.booksService.updateBook(bookToUpdate);
        return book;
    }

    @Put('del')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async isDelBook(@Body() id: string): Promise<boolean> {
        const delBook = await this.booksService.isDeleteBook(id);
        return delBook;
    }

    @Delete(':bookID')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async deleteBook(@Param('bookID') bookID: string) {
        const books = await this.booksService.deleteBook(bookID);
        return books;
    }
}
