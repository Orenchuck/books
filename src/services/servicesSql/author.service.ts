import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthorRepository } from 'src/repositories/repoSql/author.repository';
import { AuthorModel } from 'src/models/author.model';
import { CreateAuthorModel } from 'src/models/create-author.model';
import { Author } from 'src/entities/author.entity';
import { generateUuid } from 'src/common/random.helper';

@Injectable()
export class AuthorsService {
    constructor(
        private authorRepository: AuthorRepository,
    ) { }

    async addAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
        const authorToCreate: Author = {
            id: await generateUuid(),
            name: author.name,
            books: author.books,
            birthDate: author.birthDate,
            deathDate: author.deathDate,
            isDelete: false,
        } as any;
        const resRepo: Author = await this.authorRepository.addAuthor(authorToCreate);
        const newAuthor: AuthorModel = {};
        if (resRepo) {
            newAuthor.id = resRepo.id;
            newAuthor.name = resRepo.name;
            newAuthor.books = resRepo.books;
            newAuthor.birthDate = resRepo.birthDate;
            newAuthor.deathDate = resRepo.deathDate;
            newAuthor.isDelete = resRepo.isDelete;
        }
        return newAuthor;
    }

    async getAllAuthors(): Promise<AuthorModel[]> {
        const authors: Author[] = await this.authorRepository.getAllAuthors();
        if (!authors) {
            throw new HttpException('You have no authors',  HttpStatus.NOT_FOUND);
        }
        const allAuthors: AuthorModel[] = [];
        for (const oneAuthor of authors) {
            const author: AuthorModel = {
                id: oneAuthor.id,
                name: oneAuthor.name,
                books: oneAuthor.books,
                birthDate: oneAuthor.birthDate,
                deathDate: oneAuthor.deathDate,
                isDelete: oneAuthor.isDelete,
            };
            allAuthors.push(author);
        }
        return allAuthors;
    }

    async findAuthorById(id: string): Promise<AuthorModel> {
        const author: AuthorModel = {};
        const resRepo: Author = await this.authorRepository.findAuthorById(id);

        if (resRepo) {
            author.id = resRepo.id;
            author.name = resRepo.name;
            author.books = resRepo.books;
            author.birthDate = resRepo.birthDate;
            author.deathDate = resRepo.deathDate;
            author.isDelete = resRepo.isDelete;
            return author;
        }
        throw new HttpException('Author does not exist!', HttpStatus.NOT_FOUND);
    }

    async findAuthorByName(name: string): Promise<AuthorModel> {
        const author: AuthorModel = {};
        const resRepo: Author = await this.authorRepository.findAuthorByName(name);
        if (resRepo) {
            author.id = resRepo.id;
            author.name = resRepo.name;
            author.books = resRepo.books;
            author.birthDate = resRepo.birthDate;
            author.deathDate = resRepo.deathDate;
            author.isDelete = resRepo.isDelete;
            return author;
        }
        throw new HttpException('Author does not exist!', HttpStatus.NOT_FOUND);
    }

    async updateAuthor(authorToUpdate: AuthorModel): Promise<boolean> {
        const updateAuthorDoc: Author = {} as any;

        if (authorToUpdate) {
            updateAuthorDoc.id = authorToUpdate.id;
            updateAuthorDoc.name = authorToUpdate.name;
            updateAuthorDoc.books = authorToUpdate.books;
            updateAuthorDoc.birthDate = authorToUpdate.birthDate;
            updateAuthorDoc.deathDate = authorToUpdate.deathDate;
        }

        const resRepo = await this.authorRepository.updateAuthor(updateAuthorDoc);
        if (resRepo) {
            return true;
        }
        throw new HttpException('Author does not exist!',  HttpStatus.NOT_FOUND);
    }

    async isDeleteAuthor(id: string): Promise<boolean> {
        const authorFromDb: Author = await this.authorRepository.findAuthorById(id);

        if (authorFromDb) {
            authorFromDb.isDelete = !authorFromDb.isDelete;
            const savedAuthor = await this.authorRepository.saveAuthor(authorFromDb);
            return savedAuthor;
        }
        throw new HttpException('Author does not exist!', HttpStatus.NOT_FOUND);
    }

    async deleteAuthor(id: string): Promise<boolean> {
        const delAuthor: Author = {} as any;
        delAuthor.id = id;
        const resRepo = await this.authorRepository.deleteAuthor(delAuthor.id);
        if (!resRepo) {
            throw new HttpException('Author does not exist!', HttpStatus.NOT_FOUND);
        }
        return true;
    }
}
