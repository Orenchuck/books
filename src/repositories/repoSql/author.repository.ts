import { Injectable, HttpException, Inject, HttpStatus } from '@nestjs/common';
import { Author } from 'src/entities/author.entity';
import { AUTHORS_REPOSITORY } from 'src/constants/constants';

@Injectable()
export class AuthorRepository {
    constructor(@Inject(AUTHORS_REPOSITORY) private readonly authorsRepository: typeof Author) { }

    async addAuthor(author) {
        try {
            const newAuthor = this.authorsRepository.create(author);
            return newAuthor;
        } catch { throw new HttpException('Error connection with db', HttpStatus.GATEWAY_TIMEOUT); }
    }

    async getAllAuthors(): Promise<Author[]> {
        const authors = await this.authorsRepository.findAll();
        return authors;
    }

    async findAuthorById(id: string): Promise<Author> {
        try {
            const author = await this.authorsRepository.findOne({ where: { id }});
            return author;
        } catch { throw new HttpException('Author does not exist!', HttpStatus.NOT_FOUND); }
    }

    async findAuthorByName(name: string): Promise<Author> {
        const res: Author = await this.authorsRepository.findOne({ where: { name }});
        return res;
    }

    async updateAuthor(author: Author): Promise<any[]> {
        try {
            const updatedAuthor = await this.authorsRepository.update(author, {where: { id: author.id }});
            return updatedAuthor;
        } catch { throw new HttpException('Author does not exist!', HttpStatus.NOT_FOUND); }
    }

    async saveAuthor(author): Promise<boolean> {
        try {
            const newAuthor = await author.save();
            return newAuthor;
        } catch { throw new HttpException('Error connection with db', HttpStatus.GATEWAY_TIMEOUT); }
    }

    async deleteAuthor(id: string) {
        const result = await this.authorsRepository.destroy({ where: { id }});
        return result;
    }
}
