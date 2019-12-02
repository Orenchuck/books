import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Author extends Model<Author> {
  @Column
  name: string;

  @Column
  books: string;

  @Column
  birthDate: Date;

  @Column
  deathhDate: Date;

  @Column
  isDelete: boolean;
}
