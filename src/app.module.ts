import { Module,  NestModule, MiddlewareConsumer } from '@nestjs/common';
import * as fs from 'fs';
import { BooksController } from 'src/controllers/books.controller';
import { AppController } from 'src/controllers/app.controller';
import { BooksService } from 'src/services/books.service';
import { HttpExceptionFilter } from 'src/common/exception.filter';
import { LoggerMiddleware } from 'src/common/middleware.request';
import { ConfigService } from 'src/enviroment/config.service';
import { ConfigModel } from 'src/enviroment/config.model';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from 'src/models/book.schema';

import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/services/auth.service';
import { AuthController } from 'src/controllers/auth.controller';
import { JwtStrategy } from 'src/common/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from 'src/controllers/user.controllers';
import { UsersService } from 'src/services/user.services';
import { UserSchema } from 'src/models/user.schema';
import { AppService } from 'src/services/app.service';

@Module({
  imports: [
    ConfigModel,
    MongooseModule.forFeature([
      {name: 'Book', schema: BookSchema}, 
      {name: 'User', schema: UserSchema}]),
    MongooseModule.forRoot('mongodb+srv://root:root@cluster0-a47lw.mongodb.net/test?retryWrites=true&w=majority'),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secretOrPrivateKey: fs.readFileSync('src/secrets/jwtSecretKey.pem'),
      signOptions: {
        expiresIn: 3600
      }
    }),
  ],
  controllers: [BooksController, AuthController, UsersController, AppController],
  providers: [
    BooksService, 
    HttpExceptionFilter,  
    {
      provide: ConfigService,
      useValue: new ConfigService(`${process.env.NODE_ENV || 'development'}.env`),
    },
    AuthService, 
    JwtStrategy,
    UsersService,
    AppService,
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
