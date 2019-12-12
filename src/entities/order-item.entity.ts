import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Order } from 'src/entities/order.entity';
import { Book } from 'src/entities/book.entity';

@Table
export class OrderItem extends Model<OrderItem> {
  @Column ({
    primaryKey: true,
    type: DataType.UUID,
  })
  id: string;

  @ForeignKey(() => Order)
  @Column({unique: false})
  orderId: string;

  @ForeignKey(() => Book)
  @Column({unique: false})
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
