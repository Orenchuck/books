import { Injectable, HttpException, Inject, HttpStatus } from '@nestjs/common';
import { AuthorsBooks } from 'src/entities/authors-books.entity';
import { AUTHORS_BOOKS_REPOSITORY } from 'src/constants/constants';

@Injectable()
export class AuthorBookRepository {
    constructor(@Inject(AUTHORS_BOOKS_REPOSITORY) private readonly authorBooksRepository: typeof AuthorsBooks) { }

    async addData(data) {
        try {
            const newData = this.authorBooksRepository.create(data);
            return newData;
        } catch { throw new HttpException('Error connection with db', HttpStatus.GATEWAY_TIMEOUT); }
    }

    async getAllData(): Promise<AuthorsBooks[]> {
        const data: AuthorsBooks[] = await this.authorBooksRepository.findAll<AuthorsBooks>();
        return data;
    }

    async findBookById(id: string): Promise<AuthorsBooks[]> {
        const book: AuthorsBooks[] = await this.authorBooksRepository.findAll({ where: { bookId: id } });
        return book;
    }

    async findAuthorById(id: string): Promise<AuthorsBooks[]> {
        const author: AuthorsBooks[] = await this.authorBooksRepository.findAll({ where: { authorId: id } });
        return author;
    }

    async deleteBook(id: string) {
        const result = await this.authorBooksRepository.destroy({ where: { bookId: id } });
        return result;
    }

    async deleteAuthor(id: string) {
        const result = await this.authorBooksRepository.destroy({ where: { authorId: id } });
        return result;
    }
}
