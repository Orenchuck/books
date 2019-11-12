import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { HttpExceptionFilter } from 'src/common/exception.filter';
import { LoggerMiddleware } from 'src/common/middleware.request';
import { join } from 'path';
import * as fs from 'fs';
import { ExpressAdapter, NestExpressApplication  } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const http = require('http');
  const https = require('https');
  // const dotenv = require('dotenv');

  // if (process.env.NODE_ENV !== 'production') {
  //   dotenv.load();
  // }

  const httpsOptions = {
    key: fs.readFileSync('src/secrets/key.pem'),
    cert: fs.readFileSync('src/secrets/certificate.pem'),
  };

  const server = express();

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule, 
    new ExpressAdapter(server)
  );
  await app.init();

  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(LoggerMiddleware);
  app.useStaticAssets(join(__dirname, '.', 'public'));
  app.setBaseViewsDir(join(__dirname, '.', 'views'));
  app.setViewEngine('hbs');

  await http.createServer((req, res) => {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
  }).listen(80);
  await https.createServer(httpsOptions, server).listen(443);
  
}
bootstrap();