// import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';

// @Middleware()
// export class CorsMiddleware implements NestMiddleware {
//     resolve(): ExpressMiddleware {
//         return (req, res, next) => {
//             // list os domains
//             res.header('Access-Control-Allow-Origin', '*');
//             // list of methods (e.g GET,HEAD,PUT,PATCH,POST,DELETE)
//             res.header('Access-Control-Allow-Methods', '*');
//             next();
//         };
//     }
// }

// export function LoggerMiddleware({ path, baseUrl, originalUrl, headers }, res, next) {
//   const logContent: string = JSON.stringify({ path: String, baseUrl: String, originalUrl: String, headers });

// console.log(logContent);
//   next();
// }

import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: Function) {
    // console.log('req: '+JSON.parse(req) + 'res: ' + JSON.stringify(res) );
    try {
      // const logContent: string = JSON.stringify({ path: String, baseUrl: String, originalUrl: String, Headers });
      // console.log(logContent);
      const offuscateRequest = JSON.parse(JSON.stringify(req.body));
      if (offuscateRequest && offuscateRequest.password) {
        offuscateRequest.password = '*******';
      }
      if (offuscateRequest && offuscateRequest.newPassword) {
        offuscateRequest.newPassword = '*******';
      }
      if (offuscateRequest && offuscateRequest.currentPassword) {
        offuscateRequest.currentPassword = '*******';
      }
      if (offuscateRequest !== {}) {
        console.log(`${new Date().toString()} - [Request] ${req.baseUrl} - ${JSON.stringify(offuscateRequest)}`);


      }
    } catch (error) { }
    next();
  }
}
