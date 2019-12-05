import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BookRepository } from 'src/repositories/repoSql/book.repository';
import { BookModel } from 'src/models/book.model';
import { CreateBookModel } from 'src/models/create-book.model';
import { Book } from 'src/entities/book.entity';

@Injectable()
export class BooksService {
    constructor(
        private bookRepository: BookRepository,
    ) { }

    async addBook(book: CreateBookModel): Promise<BookModel> {
        const resRepo: Book = await this.bookRepository.addBook(book);
        const newBook: BookModel = {};
        if (resRepo) {
            newBook.id = resRepo.id;
            newBook.title = resRepo.title;
            newBook.author = resRepo.author;
            newBook.price = resRepo.price;
            newBook.isDelete = resRepo.isDelete;
        }
        return newBook;
    }

    async getAllBooks(): Promise<BookModel[]> {
        const books: Book[] = await this.bookRepository.getAllBooks();
        if (!books) {
            throw new HttpException('You have no books', HttpStatus.NOT_FOUND);
        }
        const allBooks: BookModel[] = [];
        for (const oneBook of books) {
            const book: BookModel = {
                id: oneBook.id,
                title: oneBook.title,
                author: oneBook.author,
                price: oneBook.price,
                isDelete: oneBook.isDelete,
            };
            allBooks.push(book);
        }
        return allBooks;
    }

    async findBookById(id: string): Promise<BookModel> {
        const book: BookModel = {};
        const resRepo: Book = await this.bookRepository.findBookById(id);

        if (resRepo) {
            book.id = resRepo.id;
            book.title = resRepo.title;
            book.author = resRepo.author;
            book.price = resRepo.price;
            book.isDelete = resRepo.isDelete;
            return book;
        }
        throw new HttpException('Book does not exist!', HttpStatus.NOT_FOUND);
    }

    async findBookByTitle(title: string): Promise<BookModel> {
        const book: BookModel = {};
        const resRepo: Book = await this.bookRepository.findBookByTitle(title);
        if (resRepo) {
            book.id = resRepo.id;
            book.title = resRepo.title;
            book.author = resRepo.author;
            book.price = resRepo.price;
            book.isDelete = resRepo.isDelete;
            return book;
        }
        throw new HttpException('Book does not exist!', HttpStatus.NOT_FOUND);
    }

    async findBookByAuthor(author: string): Promise<BookModel> {
        const book: BookModel = {};
        const resRepo: Book = await this.bookRepository.findBookByAuthor(author);
        if (resRepo) {
            book.id = resRepo.id;
            book.title = resRepo.title;
            book.author = resRepo.author;
            book.price = resRepo.price;
            book.isDelete = resRepo.isDelete;
            return book;
        }
        throw new HttpException('Book does not exist!', HttpStatus.NOT_FOUND);
    }

    async updateBook(userToUpdate: BookModel): Promise<boolean> {
        const updatedBook: BookModel = {};
        const updateBookDoc: Book = {} as any;

        if (userToUpdate) {
            updateBookDoc.id = userToUpdate.id;
            updateBookDoc.title = userToUpdate.title;
            updateBookDoc.author = userToUpdate.author;
            updateBookDoc.price = userToUpdate.price;
        }

        const resRepo = await this.bookRepository.updateBook(updateBookDoc);
        if (resRepo) {
            // updatedBook.id = resRepo.id;
            // updatedBook.title = resRepo.title;
            // updatedBook.author = resRepo.author;
            // updatedBook.price = resRepo.price;
            // updatedBook.isDelete = resRepo.isDelete;

            return true;
        }
        throw new HttpException('Book does not exist!', HttpStatus.NOT_FOUND);
    }

    async isDeleteBook(id: string): Promise<boolean> {
        const bookFromDb: Book = await this.bookRepository.findBookById(id);

        if (bookFromDb) {
            bookFromDb.isDelete = !bookFromDb.isDelete;
            const savedBook: boolean = await this.bookRepository.saveBook(bookFromDb);
            return savedBook;
        }
        throw new HttpException('Book does not exist!', HttpStatus.NOT_FOUND);
    }

    async deleteBook(id: string): Promise<boolean> {
        const delBook: Book = {} as any;
        delBook.id = id;
        const resRepo = await this.bookRepository.deleteBook(delBook.id);
        if (!resRepo) {
            throw new HttpException('Book does not exist!', HttpStatus.NOT_FOUND);
        }
        return true;
    }
}
