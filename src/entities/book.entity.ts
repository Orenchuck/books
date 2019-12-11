import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { AuthorsBooks } from 'src/entities/authors-books.entity';

@Table
export class Book extends Model<Book> {
  @Column ({primaryKey: true})
  id: string;

  @Column
  title: string;

  @Column
  price: number;

  @Column
  isDelete: boolean;

  @HasMany(() => AuthorsBooks)
  authorBooks: AuthorsBooks[];
}
