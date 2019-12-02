import * as mongoose from 'mongoose';
import { Injectable, HttpException } from '@nestjs/common';
import { Model, objectid } from 'mongoose';
import { AuthorDocument, AuthorSchema } from 'src/documents/author.document';

@Injectable()
export class AuthorRepository {

    private authorModel: Model<AuthorDocument>;

    constructor() {
        this.authorModel = mongoose.model('Author', AuthorSchema);
    }

    async addAuthor(author) {
        try {
            const newAuthor = new this.authorModel(author);
            newAuthor.isDel = false;
            const saveAuthor = await newAuthor.save();
            return saveAuthor;
        } catch { throw new HttpException('Error connection with db', 504); }
    }

    async getAllAuthors(): Promise<AuthorDocument[]> {
        const authors = await this.authorModel.find().exec();
        return authors;
    }

    async findAuthorById(id: string): Promise<AuthorDocument> {
        try {
            const author = await this.authorModel.findById(id).exec();
            return author;
        } catch { throw new HttpException('Author does not exist!', 404); }
    }

    async findAuthorByName(name: string): Promise<AuthorDocument> {
        const res: AuthorDocument = await this.authorModel.findOne({ name }).exec();
        return res;
    }

    async updateAuthor(author: AuthorDocument): Promise<AuthorDocument> {
        try {
            const updatedAuthor: AuthorDocument = await this.authorModel.findByIdAndUpdate(author._id, author);
            return updatedAuthor;
        } catch { throw new HttpException('Author does not exist!', 404); }
    }

    async saveAuthor(author): Promise<boolean> {
        try {
            const newAuthor = await author.save();
            return newAuthor;
        } catch { throw new HttpException('Error connection with db', 504); }
    }

    async deleteAuthor(id: objectid) {
        const result = await this.authorModel.deleteOne({ _id: id }).exec();
        return result;
    }
}
