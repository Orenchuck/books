import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { HttpExceptionFilter } from 'src/common/exception.filter';
import { LoggerMiddleware } from 'src/common/middleware.request';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const http = require('http');
  const https = require('https');

  const httpsOptions = {
    key: fs.readFileSync('src/secrets/key.pem'),
    cert: fs.readFileSync('src/secrets/certificate.pem'),
  };

  const server = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();

  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(LoggerMiddleware);

  http.createServer(server).listen(80, () => console.log('80 work'));
  https.createServer(httpsOptions, server).listen(443, () => console.log('443 work'));
  }
  bootstrap();




  

// port80.use(requireHTTPS);
// app.get('/', (request, response) => {
//   console.log(request.url);
//   response.send('Hello, /');});

  // (function (req, res, next) {
  //   res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  //   res.redirect('https://localhost:443');
  //   res.end();
  //   next();
  // });

  //port80.listen(80, () => console.log('80 work'));
  // http(function (req, res) {
  //   res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  //   res.end();
  // });
  // await https.createServer(httpsOptions, server).listen(443, () => console.log('443 work'));
