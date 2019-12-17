import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthorBookRepository } from 'src/repositories/repoSql/author-book.repository';
import { AuthorBookModel } from 'src/models/author-book.model';
import { AuthorsBooks } from 'src/entities/authors-books.entity';

@Injectable()
export class AuthorBooksService {
    constructor(
        private authorBooksRepository: AuthorBookRepository,
    ) { }

    async addData(book: AuthorBookModel): Promise<AuthorBookModel> {
        const resRepo: AuthorsBooks = await this.authorBooksRepository.addData(book);
        const newData: AuthorBookModel = {};
        if (resRepo) {
            newData.bookId = resRepo.bookId;
            newData.authorId = resRepo.authorId;
        }
        return newData;
    }

    async getAllData(): Promise<AuthorBookModel[]> {
        const data: AuthorsBooks[] = await this.authorBooksRepository.getAllData();
        // if (!data) {
        //     throw new HttpException('You have no books', HttpStatus.NOT_FOUND);
        // }
        const allBooks: AuthorBookModel[] = [];
        for (const oneBook of data) {
            const book: AuthorBookModel = {
                bookId: oneBook.bookId,
                authorId: oneBook.authorId,
            };
            allBooks.push(book);
        }
        return allBooks;
    }

    async findBookById(id: string): Promise<AuthorBookModel[]> {
        const books: AuthorBookModel[] = [];
        const resRepo: AuthorsBooks[] = await this.authorBooksRepository.findBookById(id);
        for (const oneBook of resRepo) {
            const book: AuthorBookModel = {
                bookId: oneBook.bookId,
                authorId: oneBook.authorId,
            };
            books.push(book);
        }
        return books;
    }

    async findAuthorById(id: string): Promise<AuthorBookModel[]> {
        const author: AuthorBookModel[] = [];
        const resRepo: AuthorsBooks[] = await this.authorBooksRepository.findAuthorById(id);
        for (const oneBook of resRepo) {
            const book: AuthorBookModel = {
                bookId: oneBook.bookId,
                authorId: oneBook.authorId,
            };
            author.push(book);
        }
        return author;
    }

    async deleteBook(bookId: string): Promise<boolean> {
        const resRepo = await this.authorBooksRepository.deleteBook(bookId);
        if (!resRepo) {
            throw new HttpException('Book does not exist!', HttpStatus.NOT_FOUND);
        }
        return true;
    }

    async deleteAuthor(authorId: string): Promise<boolean> {
        const resRepo = await this.authorBooksRepository.deleteAuthor(authorId);
        if (!resRepo) {
            throw new HttpException('Book does not exist!', HttpStatus.NOT_FOUND);
        }
        return true;
    }
}
