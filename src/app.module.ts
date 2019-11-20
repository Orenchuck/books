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
import { UserSchema } from 'src/models/schemas/user.schema';
import { ConfigModule } from 'nestjs-dotenv';
import * as dotenv from 'dotenv';
import { EmailVerificationSchema } from 'src/models/schemas/emailVerification.schema';
import { ConsentRegistrySchema } from 'src/models/schemas/consent-registry.schema';
import { DevelopmentConfigService } from 'src/enviroment/env.dev';
import { ProductionConfigService } from 'src/enviroment/env.prod';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    MongooseModule.forFeature([
      // book, author, user,
      { name: 'Book', schema: BookSchema },
      { name: 'User', schema: UserSchema },
      { name: 'EmailVerification', schema: EmailVerificationSchema },
      { name: 'ConsentRegistry', schema: ConsentRegistrySchema },
    ]),
    MongooseModule.forRoot(process.env.MONGO_URI),
    PassportModule.register({ session: false }),
    JwtModule.register({
      secretOrPrivateKey: fs.readFileSync('src/secrets/jwtSecretKey.pem'),
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [BooksController, AuthController, UsersController],
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
    // LocalStrategy,
    UsersService,
  ],
  exports: [
    ConfigService,
    UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(BooksController);
  }
}
