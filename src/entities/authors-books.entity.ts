import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
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
}
