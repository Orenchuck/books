import * as mongoose from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model, objectid } from 'mongoose';
import { BookDocument, BookSchema } from 'src/documents/book.document';

@Injectable()
export class BookRepository {

    private bookModel: Model<BookDocument>;

    constructor() {
        this.bookModel = mongoose.model('Book', BookSchema);
    }

    async addBook(book) {
        try {
            const newBook = new this.bookModel(book);
            const saveBook = await newBook.save();
            return saveBook;
        } catch { throw new HttpException('Error connection with db', HttpStatus.FORBIDDEN); }
    }

    async getAllBooks(): Promise<BookDocument[]> {
        const books = await this.bookModel.find().exec();
        return books;
    }

    async findBookById(id: string): Promise<BookDocument> {
        try {
            const book = await this.bookModel.findById(id).exec();
            return book;
        } catch { throw new HttpException('Book does not exist!', 404); }
    }

    async findBookByTitle(title: string): Promise<BookDocument> {
        const res: BookDocument = await this.bookModel.findOne({ title }).exec();
        return res;
    }

    async findBookByAuthor(author: string): Promise<BookDocument> {
        const res: BookDocument = await this.bookModel.findOne({ author }).exec();
        return res;
    }

    async updateBook(book: BookDocument): Promise<BookDocument> {
        try {
            const updatedBook: BookDocument = await this.bookModel.findByIdAndUpdate(book._id, book);
            return updatedBook;
        } catch { throw new HttpException('Book does not exist!', 404); }
    }

    async saveBook(book) {
        try {
            await book.save();
            return true;
        } catch { throw new HttpException('Error connection with db', HttpStatus.FORBIDDEN); }
    }

    async deleteBook(id: objectid) {
        const result = await this.bookModel.deleteOne({ _id: id }).exec();
        return result;
    }
}
