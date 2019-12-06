import { Table, Column, Model, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Order } from 'src/entities/order.entity';
import { Book } from 'src/entities/book.entity';

@Table
export class OrderItem extends Model<OrderItem> {
  @Column ({primaryKey: true})
  orderItemId: string;

  @ForeignKey(() => Order)
  @Column
  orderId: string;

  @ForeignKey(() => Book)
  @Column
  bookId: string;

  @Column
  amount: number;

  @Column
  count: number;

  @BelongsTo(() => Book)
  book: Book;

  @BelongsTo(() => Order)
  author: Order;

}