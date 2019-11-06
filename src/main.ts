import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { HttpExceptionFilter } from 'src/common/exception.filter';
import { LoggerMiddleware } from 'src/common/middleware.request';
import * as fs from 'fs';
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
  const serverHttps = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(LoggerMiddleware);

  server.set('port', process.env.PORT || 80);
  server.get("*", function (req, res, next) {
    res.redirect("https://" + req.headers.host + "/" + req.path);
  });

  await app.listen(3000, () => console.log('3000 work'));
  await https.createServer(httpsOptions, serverHttps).listen(443, () => console.log('443 work'));
  const port80 = await http.createServer(function (req, res, next) {
    () => console.log(req, res);

    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.redirect('https://localhost:443');
    res.end();
    next();
  });

  port80.listen(80, () => console.log('80 work'));
  // http(function (req, res) {
  //   res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  //   res.end();
  // });
  // await https.createServer(httpsOptions, server).listen(443, () => console.log('443 work'));
}
bootstrap();
