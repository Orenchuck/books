import { Injectable, HttpException } from '@nestjs/common';
import { BookRepository } from 'src/repositories/book.repository';
import { BookModel } from 'src/models/book.model';
import { BookDocument } from 'src/documents/book.document';

@Injectable()
export class BooksService {
    constructor(
        private bookRepository: BookRepository,
    ) { }

    async insertBook(book: BookModel) {
        const resRepo = await this.bookRepository.addBook(book);
        const newBook: BookModel = {};
        if (resRepo) {
            newBook.id = resRepo.id;
            newBook.title = resRepo.title;
            newBook.author = resRepo.author;
            newBook.price = resRepo.price;
            newBook.isDel = resRepo.isDel;
        }
        return newBook;
    }

    async getBooks(): Promise<BookModel[]> {
        const books = await this.bookRepository.getAllBooks();
        if (!books) {
            throw new HttpException('You have no books', 404);
        }
        const allBooks: BookModel[] = [];
        for (const oneBook of books) {
            const book: BookModel = {
                id: oneBook._id,
                title: oneBook.title,
                author: oneBook.author,
                price: oneBook.price,
                isDel: oneBook.isDel,
            };
            allBooks.push(book);
        }
        return allBooks;
    }

    async findBookById(id: string): Promise<BookModel> {
        const book: BookModel = {};
        try {
            const resRepo: BookDocument = await this.bookRepository.findBookById(id);
            if (resRepo) {
                book.id = resRepo._id;
                book.title = resRepo.title;
                book.author = resRepo.author;
                book.price = resRepo.price;
                book.isDel = resRepo.isDel;
            }
            return book;
        } catch (error) {
            throw new HttpException('Book does not exist!', 404);
        }
    }

    async findBookByTitle(title: string): Promise<BookModel> {
        const book: BookModel = {};
        const resRepo = await this.bookRepository.findBookByTitle(title);
        if (resRepo) {
            book.id = resRepo._id;
            book.title = resRepo.title;
            book.author = resRepo.author;
            book.price = resRepo.price;
            book.isDel = resRepo.isDel;
            return book;
        }
        throw new HttpException('Book does not exist!', 404);
    }

    async findBookByAuthor(author: string): Promise<BookModel> {
        const book: BookModel = {};
        try {
            const resRepo: BookDocument = await this.bookRepository.findBookByAuthor(author);
            if (resRepo) {
                book.id = resRepo._id;
                book.title = resRepo.title;
                book.author = resRepo.author;
                book.price = resRepo.price;
                book.isDel = resRepo.isDel;
            }
            return book;
        } catch (error) {
            throw new HttpException('Book does not exist!', 404);
        }
    }

    async updateBook(userToUpdate: BookModel): Promise<BookModel> {
        const updatedBook: BookModel = {};
        const updateBookDoc: BookDocument = {};

        if (userToUpdate) {
            updateBookDoc._id = userToUpdate.id;
            updateBookDoc.title = userToUpdate.title;
            updateBookDoc.author = userToUpdate.author;
            updateBookDoc.price = userToUpdate.price;
        }

        const resRepo: BookDocument = await this.bookRepository.updateBook(updateBookDoc);
        if (resRepo) {
            updatedBook.id = resRepo._id;
            updatedBook.title = resRepo.title;
            updatedBook.author = resRepo.author;
            updatedBook.price = resRepo.price;
            updatedBook.isDel = resRepo.isDel;
        }

        return updatedBook;
    }

    async isDelBook(id: string) {
        const bookFromDb: BookDocument = await this.bookRepository.findBookById(id);

        if (bookFromDb) {
            bookFromDb.isDel = !bookFromDb.isDel;
            const savedBook = await this.bookRepository.saveBook(bookFromDb);
            return savedBook;
        }
    }

    async deleteBook(id: string): Promise<boolean> {
        const delBook: BookDocument = {};
        delBook._id = id;
        const resRepo = await this.bookRepository.deleteBook(delBook._id);
        if (resRepo.n === 0) {
            throw new HttpException('Book does not exist!', 404);
        }
        // tslint:disable-next-line: no-console
        console.log('Successfull del');
        return true;
    }
}
