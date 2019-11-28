import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { HttpExceptionFilter } from 'src/common/exception.filter';
import { LoggerMiddleware } from 'src/common/middleware.request';
import * as fs from 'fs';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';

async function bootstrap() {
  const http = require('http');
  const https = require('https');
  const { MongoClient } = require('mongodb');

  const httpsOptions = {
    key: fs.readFileSync('src/secrets/key.pem'),
    cert: fs.readFileSync('src/secrets/certificate.pem'),
  };

  const server = express();

  mongoose.connect(process.env.MONGO_LOCAL, { useNewUrlParser: true, useFindAndModify: false });

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
  );
  await app.init();
  dotenv.config();

  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(LoggerMiddleware);

  await https.createServer(httpsOptions, server).listen(process.env.PORT);
  await http.createServer((req, res) => {
    // tslint:disable-next-line: no-console
    console.log(`https://${req.headers.host}${req.url}`);
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
  }).listen(80);

}
bootstrap();
