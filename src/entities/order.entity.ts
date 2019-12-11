import { Table, Column, Model, HasMany, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/entities/user.entity';
import { OrderItem } from './order-item.entity';

@Table
export class Order extends Model<Order> {
  @Column ({primaryKey: true})
  id: string;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @Column
  date: Date;

  @Column
  paymentId: string;

  @Column
  currency: string;

  @Column
  amount: number;

  @Column
  status: string;

  @Column
  isDelete: boolean;

  @HasMany(() => OrderItem)
  orderItem: OrderItem[];
}
