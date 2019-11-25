import * as mongoose from 'mongoose';
import { UserSchema, UserDocument } from 'src/documents/user.document';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model, objectid } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { BookDocument } from 'src/documents/book.document';
import { BookModel } from 'src/models/book.model';

@Injectable()
export class BookRepository {

    private bookModel: Model<BookDocument>;

    constructor() {
        this.bookModel = mongoose.model('User', UserSchema);
    }

    async addBook(book) {
        const newBook = new this.bookModel(book);
        newBook.isDel = false;
        const saveBook = await newBook.save();
        return saveBook;
    }

    async getAllBooks(): Promise<BookDocument[]> {
        const books = await this.bookModel.find().exec();
        return books;
    }

    async findBookById(id: string): Promise<BookDocument> {
       const book = await this.bookModel.findById(id).exec();
       return book;
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
        const updatedBook: BookDocument = await this.bookModel.findByIdAndUpdate(book._id, book);
        return updatedBook;
    }

    async saveBook(book) {
        try {
            const res = await book.save();
            return true;
        } catch { throw new HttpException('error connection with db', HttpStatus.FORBIDDEN); }
    }

    async deleteBook(id: objectid) {
        const result = await this.bookModel.deleteOne({ _id: id }).exec();
        return result;
    }
}
