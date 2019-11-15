import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = (exception instanceof HttpException) ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.UNAUTHORIZED) {
      return response.status(status).render('views/401'); }
    if (status === HttpStatus.NOT_FOUND) {
      return response.status(status).render('views/404'); }
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
        if (process.env.NODE_ENV === 'production') {
          console.error(exception.stack);
          return response.status(status).render('views/500');
        }
        else {
          const message = exception.stack;
          return response.status(status).send(message);
        }
      }

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
