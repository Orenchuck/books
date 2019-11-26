import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import * as fs from 'fs';
import { BooksController } from 'src/controllers/books.controller';
import { BooksService } from 'src/services/books.service';
import { HttpExceptionFilter } from 'src/common/exception.filter';
import { LoggerMiddleware } from 'src/common/middleware.request';
import { ConfigService } from 'src/enviroment/config.service';
import { ConfigModel } from 'src/enviroment/config.model';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from 'src/models/schemas/book.schema';

import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/services/auth.service';
import { AuthController } from 'src/controllers/auth.controller';
import { JwtStrategy } from 'src/common/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from 'src/controllers/user.controllers';
import { UsersService } from 'src/services/user.services';
import { UserSchema } from 'src/documents/user.document';
import { ConfigModule } from 'nestjs-dotenv';
import * as dotenv from 'dotenv';
import { DevelopmentConfigService } from 'src/enviroment/env.dev';
import { ProductionConfigService } from 'src/enviroment/env.prod';
import { UserRepository } from 'src/repositories/user.repository';
import { AuthRepository } from './repositories/auth.repository';
import { BookRepository } from './repositories/book.repository';
import { AuthorsController } from './controllers/author.controller';
import { AuthorsService } from './services/author.service';
import { AuthorRepository } from './repositories/author.repository';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    PassportModule.register({ session: false }),
    JwtModule.register({
      secretOrPrivateKey: fs.readFileSync('src/secrets/jwtSecretKey.pem'),
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [BooksController, AuthController, UsersController, AuthorsController],
  providers: [
    BooksService,
    HttpExceptionFilter,
    {
      provide: ConfigService,
      // useValue: new ConfigService(`${process.env.NODE_ENV || 'development'}.env`),
      useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService  : ProductionConfigService,
    },
    AuthService,
    JwtStrategy,
    // // LocalStrategy,
    UsersService,
    AuthorsService,
    UserRepository,
    AuthRepository,
    BookRepository,
    AuthorRepository,
  ],
  exports: [ConfigService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(BooksController);
  }
}
