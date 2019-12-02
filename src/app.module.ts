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
import { UsersService } from 'src/services/user.services';
import * as dotenv from 'dotenv';
import { UserRepository } from 'src/repositories/user.repository';
import { AuthRepository } from 'src/repositories/auth.repository';
import { BookRepository } from 'src/repositories/book.repository';
import { AuthorsController } from 'src/controllers/author.controller';
import { AuthorsService } from 'src/services/author.service';
import { AuthorRepository } from 'src/repositories/author.repository';

dotenv.config();

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
