import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { Book } from 'src/entities/book.entity';

@Table
export class Img extends Model<Img> {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @ForeignKey(() => Book)
    @Column
    bookId: string;

    @Column
    mimetype: string;

    @Column
    size: number;

    @Column({
        type: DataType.STRING(3000),
    })
    img: string;

    @Column
    isDelete: boolean;
}
