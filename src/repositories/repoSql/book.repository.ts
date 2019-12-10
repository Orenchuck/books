import { Injectable, HttpException, Inject, HttpStatus } from '@nestjs/common';
import { Book } from 'src/entities/book.entity';
import { BOOKS_REPOSITORY } from 'src/constants/constants';
import { FilterModel } from 'src/models/filter.model';

@Injectable()
export class BookRepository {
    constructor(@Inject(BOOKS_REPOSITORY) private readonly booksRepository: typeof Book) {}

    async getFilteredBooks(query): Promise<Book[]> {
        const books = await this.booksRepository.findAll(query);
        return books;
    }

    async pagination(limit, offset): Promise<Book[]> {
        const books: Book[] = await this.booksRepository.findAll<Book>({limit, offset});
        return books;
    }

    async addBook(book) {
        try {
            const newBook = this.booksRepository.create(book);
            return newBook;
        } catch { throw new HttpException('Error connection with db', HttpStatus.GATEWAY_TIMEOUT); }
    }

    async getAllBooks(): Promise<Book[]> {
        const books: Book[] = await this.booksRepository.findAll<Book>();
        return books;
    }

    async findBookById(id: string): Promise<Book> {
        try {
            const book: Book = await this.booksRepository.findOne({ where: { id }});
            return book;
        } catch { throw new HttpException('Book does not exist!', HttpStatus.NOT_FOUND); }
    }

    async findBookByTitle(title: string): Promise<Book> {
        const res: Book = await this.booksRepository.findOne({ where: { title }});
        return res;
    }

    async findBookByAuthor(author: string): Promise<Book> {
        const res: Book = await this.booksRepository.findOne({ where: { author }});
        return res;
    }

    async updateBook(book: Book): Promise<any[]> {
        try {
            const updatedBook = await this.booksRepository.update(book, {where: {id: book.id}});
            return updatedBook;
        } catch { throw new HttpException('Book does not exist!', HttpStatus.NOT_FOUND); }
    }

    async saveBook(book): Promise<boolean> {
        try {
            await book.save();
            return true;
        } catch { throw new HttpException('Error connection with db', HttpStatus.GATEWAY_TIMEOUT); }
    }

    async deleteBook(id: string) {
        const result = await this.booksRepository.destroy({ where: { id }});
        return result;
    }
}
