import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthorRepository } from 'src/repositories/author.repository';
import { AuthorModel } from 'src/models/author.model';
import { AuthorDocument } from 'src/documents/author.document';
import { CreateAuthorModel } from 'src/models/create-author.model';

@Injectable()
export class AuthorsService {
    constructor(
        private authorRepository: AuthorRepository,
    ) { }

    async addAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
        const resRepo: AuthorDocument = await this.authorRepository.addAuthor(author);
        const newAuthor: AuthorModel = {};
        if (resRepo) {
            newAuthor.id = resRepo._id;
            newAuthor.name = resRepo.name;
            newAuthor.books = resRepo.books;
            newAuthor.birthDate = resRepo.birthDate;
            newAuthor.deathDate = resRepo.deathDate;
            newAuthor.isDel = resRepo.isDel;
        }
        return newAuthor;
    }

    async getAllAuthors(): Promise<AuthorModel[]> {
        const authors: AuthorDocument[] = await this.authorRepository.getAllAuthors();
        if (!authors) {
            throw new HttpException('You have no authors',  HttpStatus.NOT_FOUND);
        }
        const allAuthors: AuthorModel[] = [];
        for (const oneAuthor of authors) {
            const author: AuthorModel = {
                id: oneAuthor._id,
                name: oneAuthor.name,
                books: oneAuthor.books,
                birthDate: oneAuthor.birthDate,
                deathDate: oneAuthor.deathDate,
                isDel: oneAuthor.isDel,
            };
            allAuthors.push(author);
        }
        return allAuthors;
    }

    async findAuthorById(id: string): Promise<AuthorModel> {
        const author: AuthorModel = {};
        const resRepo: AuthorDocument = await this.authorRepository.findAuthorById(id);

        if (resRepo) {
            author.id = resRepo._id;
            author.name = resRepo.name;
            author.books = resRepo.books;
            author.birthDate = resRepo.birthDate;
            author.deathDate = resRepo.deathDate;
            author.isDel = resRepo.isDel;
            return author;
        }
        throw new HttpException('Author does not exist!', HttpStatus.NOT_FOUND);
    }

    async findAuthorByName(name: string): Promise<AuthorModel> {
        const author: AuthorModel = {};
        const resRepo: AuthorDocument = await this.authorRepository.findAuthorByName(name);
        if (resRepo) {
            author.id = resRepo._id;
            author.name = resRepo.name;
            author.books = resRepo.books;
            author.birthDate = resRepo.birthDate;
            author.deathDate = resRepo.deathDate;
            author.isDel = resRepo.isDel;
            return author;
        }
        throw new HttpException('Author does not exist!', HttpStatus.NOT_FOUND);
    }

    async updateAuthor(userToUpdate: AuthorModel): Promise<AuthorModel> {
        const updatedAuthor: AuthorModel = {};
        const updateAuthorDoc: AuthorDocument = {};

        if (userToUpdate) {
            updateAuthorDoc._id = userToUpdate.id;
            updateAuthorDoc.name = userToUpdate.name;
            updateAuthorDoc.books = userToUpdate.books;
            updateAuthorDoc.birthDate = userToUpdate.birthDate;
            updateAuthorDoc.deathDate = userToUpdate.deathDate;
        }

        const resRepo: AuthorDocument = await this.authorRepository.updateAuthor(updateAuthorDoc);
        if (resRepo) {
            updatedAuthor.id = resRepo._id;
            updatedAuthor.name = resRepo.name;
            updatedAuthor.books = resRepo.books;
            updatedAuthor.birthDate = resRepo.birthDate;
            updatedAuthor.deathDate = resRepo.deathDate;
            updatedAuthor.isDel = resRepo.isDel;

            return updatedAuthor;
        }
        throw new HttpException('Author does not exist!',  HttpStatus.NOT_FOUND);
    }

    async isDelAuthor(id: string): Promise<boolean> {
        const authorFromDb: AuthorDocument = await this.authorRepository.findAuthorById(id);

        if (authorFromDb) {
            authorFromDb.isDel = !authorFromDb.isDel;
            const savedAuthor = await this.authorRepository.saveAuthor(authorFromDb);
            return savedAuthor;
        }
        throw new HttpException('Author does not exist!', HttpStatus.NOT_FOUND);
    }

    async deleteAuthor(id: string): Promise<boolean> {
        const delAuthor: AuthorDocument = {};
        delAuthor._id = id;
        const resRepo = await this.authorRepository.deleteAuthor(delAuthor._id);
        if (resRepo.n === 0) {
            throw new HttpException('Author does not exist!', HttpStatus.NOT_FOUND);
        }
        // tslint:disable-next-line: no-console
        console.log('Successfull del');
        return true;
    }
}
