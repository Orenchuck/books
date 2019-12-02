import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Book extends Model<Book> {
  @Column
  title: string;

  @Column
  author: string;

  @Column
  price: number;

  @Column
  isDelete: boolean;
}
