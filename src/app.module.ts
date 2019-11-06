import { Module,  NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BooksController } from 'src/controllers/books.controller';
import { BooksService } from 'src/services/books.service';
import { HttpExceptionFilter } from 'src/common/exception.filter';
import { LoggerMiddleware } from 'src/common/middleware.request';
// import { ConfigModule } from 'nestjs-config';
// import * as path from 'path';
import { EasyconfigModule } from 'nestjs-easyconfig';

@Module({
  imports: [EasyconfigModule.register({ path: 'src/enviroment/.env' })],
  controllers: [BooksController],
  providers: [BooksService, HttpExceptionFilter
],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(BooksController);
  }
}
