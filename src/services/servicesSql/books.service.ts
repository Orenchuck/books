import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BookRepository } from 'src/repositories/repoSql/book.repository';
import { BookModel } from 'src/models/book.model';
import { CreateBookModel } from 'src/models/create-book.model';
import { Book } from 'src/entities/book.entity';
import { generateUuid } from 'src/common/random.helper';
import { FilterModel } from 'src/models/filter.model';
// tslint:disable-next-line: no-var-requires
const Sequelize = require('sequelize');

@Injectable()
export class BooksService {
    constructor(
        private bookRepository: BookRepository,
    ) { }

    async getFilteredBooks(filter: FilterModel): Promise<BookModel[]> {
        const Op = Sequelize.Op;
        const query = {where: {}} as any;
        const price = {};
        if (filter.priceFrom) {
           price[Op.gte] = filter.priceFrom;
        }
        if (filter.priceTo) {
            price[Op.lte] = filter.priceTo;
        }
        if (Object.keys(price).length !== 0) {
            query.where.price = price;
        }
        if (filter.title) {
            query.where.title = {[Op.regexp]: filter.title};
        }
        if (filter.author) {
            query.where.author = {[Op.regexp]: filter.author};
        }
        const filteredBooks = await this.bookRepository.getFilteredBooks(query);

        return filteredBooks;
    }

    async pagination(limit, offset) {
        if (+limit < 0 && +offset < 0) {
            const allBooks = this.bookRepository.getAllBooks();
            return allBooks;
        }
        const books = this.bookRepository.pagination(+limit, +offset);
        return books;
    }

    async addBook(book: CreateBookModel): Promise<BookModel> {
        const bookToCreate: Book = {
            id: await generateUuid(),
            title: book.title,
            author: book.author,
            price: book.price,
            isDelete: false,
        } as any;
        const resRepo: Book = await this.bookRepository.addBook(bookToCreate);
        const newBook: BookModel = {};
        if (resRepo) {
            newBook.id = resRepo.id;
            newBook.title = resRepo.title;
            // newBook.author = resRepo.author;
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
                // author: oneBook.author,
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
            // book.author = resRepo.author;
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
            // book.author = resRepo.author;
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
            // book.author = resRepo.author;
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
            // updateBookDoc.author = userToUpdate.author;
            updateBookDoc.price = userToUpdate.price;
        }

        const resRepo = await this.bookRepository.updateBook(updateBookDoc);
        if (resRepo) {
            return true;
        }
        throw new HttpException('Book does not exist!', HttpStatus.NOT_FOUND);
    }

    async isDeleteBook(id: string): Promise<boolean> {
        const bookFromDb: Book = await this.bookRepository.findBookForDel(id);

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
