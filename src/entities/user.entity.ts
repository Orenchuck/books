import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Order } from 'src/entities/order.entity';

@Table
export class User extends Model<User> {
  @Column ({primaryKey: true})
  id: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  roles: string;

  @Column
  active: boolean;

  @Column
  cypher: string;

  @Column
  isDelete: boolean;

  @HasMany(() => Order)
  order: Order[];
}
