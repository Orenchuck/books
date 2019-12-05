import { Table, Column, Model, ForeignKey, PrimaryKey, BelongsTo } from 'sequelize-typescript';
import { Author } from 'src/entities/author.entity';
import { Book } from 'src/entities/book.entity';

@Table
export class AuthorsBooks extends Model<AuthorsBooks> {

    @ForeignKey(() => Author)
    @PrimaryKey
    @Column
    authorId: string;

    @ForeignKey(() => Book)
    @PrimaryKey
    @Column
    bookId: string;

    @BelongsTo(() => Book)
    book: Book;

    @BelongsTo(() => Author)
    author: Author;

}
