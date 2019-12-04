import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import * as fs from 'fs';
import { BooksController } from 'src/controllers/books.controller';
import { BooksService } from 'src/services/books.service';
import { HttpExceptionFilter } from 'src/common/exception.filter';
import { LoggerMiddleware } from 'src/common/middleware.request';

import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/services/auth.service';
import { AuthController } from 'src/controllers/auth.controller';
import { JwtStrategy } from 'src/common/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from 'src/controllers/user.controllers';
import { UsersService } from 'src/services/servicesSql/user.services';
import { UserRepository } from 'src/repositories/repoSql/user.repository';
import { AuthRepository } from 'src/repositories/auth.repository';
import { BookRepository } from 'src/repositories/book.repository';
import { AuthorsController } from 'src/controllers/author.controller';
import { AuthorsService } from 'src/services/author.service';
import { AuthorRepository } from 'src/repositories/author.repository';
import { databaseProviders } from 'src/providers/database.provider';
import { booksProviders } from 'src/providers/books.provider';
import { authorsBooksProviders } from 'src/providers/authors-books.provider';
import { authorsProviders } from 'src/providers/authors.provider';
import { userProviders } from 'src/providers/users.provider';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secretOrPrivateKey: fs.readFileSync('src/secrets/jwtSecretKey.pem'),
    }),
  ],
  controllers: [BooksController, AuthController, UsersController, AuthorsController],
  providers: [
    BooksService,
    HttpExceptionFilter,
    AuthService,
    JwtStrategy,
    UsersService,
    AuthorsService,
    UserRepository,
    AuthRepository,
    BookRepository,
    AuthorRepository,
    ...databaseProviders,
    ...booksProviders,
    ...authorsBooksProviders,
    ...authorsProviders,
    ...userProviders,
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
