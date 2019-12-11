import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { AuthorsBooks } from 'src/entities/authors-books.entity';

@Table
export class Author extends Model<Author> {
  @Column ({primaryKey: true})
  id: string;

  @Column
  name: string;

  @Column
  birthDate: Date;

  @Column
  deathDate: Date;

  @Column
  isDelete: boolean;

  @HasMany(() => AuthorsBooks)
    authorBooks: AuthorsBooks[];
}
