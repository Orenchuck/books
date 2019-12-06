import { Sequelize } from 'sequelize-typescript';
import { Book } from 'src/entities/book.entity';
import { Author } from 'src/entities/author.entity';
import { User } from 'src/entities/user.entity';
import { AuthorsBooks } from 'src/entities/authors-books.entity';
import { environment } from 'src/enviroment/enviroment';
import { Order } from 'src/entities/order.entity';
import { OrderItem } from 'src/entities/order-item.entity';

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
      sequelize.addModels([Book, Author, User, AuthorsBooks, Order, OrderItem]);
      await sequelize.sync();
      return sequelize;
        // useFactory: async () => {
        //     const sequelize = new Sequelize({});
        //     // tslint:disable-next-line: no-string-literal
        //     sequelize['dialect'] = getEnv.sqlDialect,
        //         // tslint:disable-next-line: no-string-literal
        //         sequelize['host'] = getEnv.host,
        //         // tslint:disable-next-line: no-string-literal
        //         sequelize['port'] = getEnv.sqlPort,
        //         // tslint:disable-next-line: no-string-literal
        //         sequelize['username'] = getEnv.sqlUsername,
        //         // tslint:disable-next-line: no-string-literal
        //         sequelize['password'] = getEnv.sqlPassword,
        //         // tslint:disable-next-line: no-string-literal
        //         sequelize['database'] = getEnv.sqlDBname,

        //         sequelize.addModels([Book, Author, User, AuthorsBooks]);
        //     await sequelize.sync();
        //     return sequelize;
        },
    },
];
