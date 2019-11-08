import { Injectable, HttpException } from '@nestjs/common';
import { BOOKS } from '../mocks/books.mock';
import { ConfigService } from 'src/enviroment/config.service';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from 'src/models/book.schema';
import { Model } from 'mongoose';

@Injectable()
export class BooksService {
    // books = BOOKS;
    private isAuthEnabled: boolean;
    private books: Book[] = [];
    constructor(
        config: ConfigService,
        @InjectModel('Book') private readonly bookModel: Model<Book>
        ) {
        this.isAuthEnabled = config.get('IS_AUTH_ENABLED') === 'true';
    }

    async insertBook (
        title: string,
        author?: string,
        price?: number,
        ) {
            const newBook = new this.bookModel ({
                title,
                author,
                price,
            });
            const result = await newBook.save();
            console.log(result);
            return 'id';
        }

    getBooks(): Promise<any> {
        return new Promise(resolve => {
            resolve(this.books);
        });
    }
    getBook(bookID): Promise<any> {
        let id = Number(bookID);
        return new Promise(resolve => {
            const book = this.books.find(book => book.id === id);
            if (!book) {
                throw new HttpException('Book does not exist!', 404);
            }
            resolve(book);
        });
    }
    addBook(book): Promise<any> {
        return new Promise(resolve => {
            this.books.push(book);
            resolve(this.books);
        });
    }
    deleteBook(bookID): Promise<any> {
        let id = Number(bookID);
        return new Promise(resolve => {
            let index = this.books.findIndex(book => book.id === id);
            if (index === -1) {
                throw new HttpException('Book does not exist!', 404);
            }
            this.books.splice(1, index);
            resolve(this.books);
        });
    }
}