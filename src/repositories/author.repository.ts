import * as mongoose from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model, objectid } from 'mongoose';
import { AuthorDocument, AuthorSchema } from 'src/documents/author.document';
import { AuthorModel } from 'src/models/author.model';

@Injectable()
export class AuthorRepository {

    private authorModel: Model<AuthorDocument>;

    constructor() {
        this.authorModel = mongoose.model('Author', AuthorSchema);
    }

    async addAuthor(author) {
        const newAuthor = new this.authorModel(author);
        // newAuthor.isDel = false;
        const saveAuthor = await newAuthor.save();
        // const saveAuthor = this.saveAuthor(newAuthor);
        return saveAuthor;
    }

    async getAllAuthors(): Promise<AuthorDocument[]> {
        const authors = await this.authorModel.find().exec();
        return authors;
    }

    async findAuthorById(id: string): Promise<AuthorDocument> {
       const author = await this.authorModel.findById(id).exec();
       return author;
    }

    async findAuthorByName(name: string): Promise<AuthorDocument> {
        const res: AuthorDocument = await this.authorModel.findOne({ name }).exec();
        return res;
    }

    async updateAuthor(author: AuthorDocument): Promise<AuthorDocument> {
        console.log(author._id);
        
        const updatedAuthor: AuthorDocument = await this.authorModel.findByIdAndUpdate(author._id, author);
        return updatedAuthor;
    }

    async saveAuthor(author) {
        try {
            const newAuthor = await author.save();
            return newAuthor;
        } catch { throw new HttpException('error connection with db', HttpStatus.FORBIDDEN); }
    }

    async deleteAuthor(id: objectid) {
        const result = await this.authorModel.deleteOne({ _id: id }).exec();
        return result;
    }
}
