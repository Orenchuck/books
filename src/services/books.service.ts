import { Injectable, HttpException } from '@nestjs/common';
import { ConfigService } from 'src/enviroment/config.service';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from 'src/models/schemas/book.schema';
import { Model } from 'mongoose';

@Injectable()
export class BooksService {
    // private isAuthEnabled: boolean;
    private books: Book[] = [];
    constructor(
        // config: ConfigService,
        @InjectModel('Book') private readonly bookModel: Model<Book>,
    ) {
        // this.isAuthEnabled = config.get('IS_AUTH_ENABLED') === 'true';
    }

    async insertBook(
        title: string,
        author?: string,
        price?: number,
    ) {
        const newBook = new this.bookModel({
            title,
            author,
            price,
        });
        const result = await newBook.save();
        return result.id as string;
    }

    async getBooks() {
        const books = await this.bookModel.find().exec();
        return books.map(book => ({
            id: book.id,
            title: book.title,
            author: book.author,
            price: book.price,
        }));
    }

    async getBook(bookID: string) {
        const book = await this.findBook(bookID);
        const test: Book = {};

        return test;
    }

    private async findBook(id: string): Promise<Book> {
        let book;
        try {
            book = await this.bookModel.findById(id).exec();
        } catch (error) {
            throw new HttpException('Book does not exist!', 404);
        }
        if (!book) {
            throw new HttpException('Book does not exist!', 404);
        }
        return book;
    }

    async deleteBook(bookID: string) {
        const result = await this.bookModel.deleteOne({ _id: bookID }).exec();
        if (result.n === 0) {
            throw new HttpException('Book does not exist!', 404);
        }
    }
}
