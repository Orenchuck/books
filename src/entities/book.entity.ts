import { Table, Column, Model, HasOne, HasMany, DataType } from 'sequelize-typescript';
import { AuthorsBooks } from 'src/entities/authors-books.entity';
import { Img } from 'src/entities/img.entity';

@Table
export class Book extends Model<Book> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
  })
  id: string;

  @Column
  title: string;

  @Column
  price: number;

  @Column
  isDelete: boolean;

  @HasMany(() => AuthorsBooks)
  authorBooks: AuthorsBooks[];

  @HasOne(() => Img)
  img: Img;
}
