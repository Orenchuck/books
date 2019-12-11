import { Table, Column, Model, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Order } from 'src/entities/order.entity';
import { Book } from 'src/entities/book.entity';

@Table
export class OrderItem extends Model<OrderItem> {
  @Column ({primaryKey: true})
  id: string;

  @ForeignKey(() => Order)
  @Column
  orderId: string;

  @ForeignKey(() => Book)
  @Column
  bookId: string;

  @Column({defaultValue: 1})
  count: number;

  @Column
  amount: number;

  @BelongsTo(() => Book)
  book: Book;

  @BelongsTo(() => Order)
  author: Order;
}
