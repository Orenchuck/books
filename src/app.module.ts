import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import * as fs from 'fs';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/common/jwt.strategy';

import { HttpExceptionFilter } from 'src/common/exception.filter';
import { LoggerMiddleware } from 'src/common/middleware.request';

import { BooksController } from 'src/controllers/books.controller';
import { BooksService } from 'src/services/servicesSql/books.service';
import { BookRepository } from 'src/repositories/repoSql/book.repository';

import { AuthService } from 'src/services/servicesSql/auth.service';
import { AuthController } from 'src/controllers/auth.controller';

import { UsersController } from 'src/controllers/user.controllers';
import { UsersService } from 'src/services/servicesSql/user.services';
import { UserRepository } from 'src/repositories/repoSql/user.repository';

import { AuthorsController } from 'src/controllers/author.controller';
import { AuthorsService } from 'src/services/servicesSql/author.service';
import { AuthorRepository } from 'src/repositories/repoSql/author.repository';

import { databaseProviders } from 'src/providers/database.provider';
import { booksProviders } from 'src/providers/books.provider';
import { authorsBooksProviders } from 'src/providers/authors-books.provider';
import { authorsProviders } from 'src/providers/authors.provider';
import { userProviders } from 'src/providers/users.provider';
import { orderItemProviders } from 'src/providers/order-item.provider';
import { orderProviders } from 'src/providers/order.provider';

import { OrdersController } from 'src/controllers/order.controller';
import { OrdersService } from 'src/services/servicesSql/order.service';
import { OrderRepository } from 'src/repositories/repoSql/order.repository';

import { AuthorBooksController } from 'src/controllers/author-book.controller';
import { AuthorBooksService } from 'src/services/servicesSql/author-book.service';
import { AuthorBookRepository } from 'src/repositories/repoSql/author-book.repository';

import { OrderItemsController } from 'src/controllers/order-item.controller';
import { OrderItemsService } from 'src/services/servicesSql/order-item.service';
import { OrderItemRepository } from 'src/repositories/repoSql/order-item.repository';
import { StripeModule } from 'nestjs-stripe';


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: fs.readFileSync('src/secrets/jwtSecretKey.pem'),
    }),
    StripeModule.forRoot({
      apiKey: 'sk_test_OcjwM7VYcSRwBBNU7gbLFpt400jxaeH5MN',
    }),
  ],
  controllers: [
    BooksController,
    AuthController,
    UsersController,
    AuthorsController,
    OrdersController,
    OrderItemsController,
    AuthorBooksController,
  ],
  providers: [
    BooksService,
    HttpExceptionFilter,
    AuthService,
    JwtStrategy,
    UsersService,
    AuthorsService,
    UserRepository,
    BookRepository,
    AuthorRepository,
    OrdersService,
    OrderRepository,
    OrderItemsService,
    OrderItemRepository,
    AuthorBooksService,
    AuthorBookRepository,
    ...databaseProviders,
    ...booksProviders,
    ...authorsBooksProviders,
    ...authorsProviders,
    ...userProviders,
    ...orderItemProviders,
    ...orderProviders,
  ],
  exports: [UsersService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/');
  }
}
