import { Sequelize } from 'sequelize-typescript';
import { Book } from 'src/entities/book.entity';
import { Author } from 'src/entities/author.entity';
import { User } from 'src/entities/user.entity';
import { AuthorsBooks } from 'src/entities/authors-books.entity';
import { environment } from 'src/enviroment/enviroment';
import { Order } from 'src/entities/order.entity';
import { OrderItem } from 'src/entities/order-item.entity';
import { Img } from 'src/entities/img.entity';

const getEnv = environment();

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'root',
      });
      sequelize.addModels([Book, Author, User, AuthorsBooks, Order, OrderItem, Img]);
      await sequelize.sync();
      return sequelize;
        },
    },
];
