import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { HttpExceptionFilter } from 'src/common/exception.filter';
import * as fs from 'fs';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as mongoose from 'mongoose';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { environment } from 'src/enviroment/enviroment';

async function bootstrap() {
  const http = require('http');
  const https = require('https');

  const httpsOptions = {
    key: fs.readFileSync('src/secrets/key.pem'),
    cert: fs.readFileSync('src/secrets/certificate.pem'),
  };

  const server = express();
  const getEnv = environment();

  mongoose.connect(getEnv.mongoUri, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
  );

  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Books')
    .setVersion('1.0')
    .setSchemes('https')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.init();
  await https.createServer(httpsOptions, server).listen(getEnv.httpsPort);
  await http.createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
  }).listen(getEnv.httpPort);
}

bootstrap();
