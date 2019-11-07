import { Module,  NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BooksController } from 'src/controllers/books.controller';
import { BooksService } from 'src/services/books.service';
import { HttpExceptionFilter } from 'src/common/exception.filter';
import { LoggerMiddleware } from 'src/common/middleware.request';
// import { ConfigModule } from 'nestjs-config';
// import * as path from 'path';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { ConfigService } from 'src/enviroment/config.service';
import { ConfigModel } from 'src/enviroment/config.model';

@Module({
  imports: [ConfigModel],
  controllers: [BooksController],
  providers: [BooksService, HttpExceptionFilter,  {
    provide: ConfigService,
    useValue: new ConfigService(`${process.env.NODE_ENV || 'development'}.env`),
  },
],
exports: [ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(BooksController);
  }
}
