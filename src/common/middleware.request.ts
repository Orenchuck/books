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

export function LoggerMiddleware({ path, baseUrl, originalUrl, headers }, res, next) {
  const logContent: string = JSON.stringify({ path, baseUrl, originalUrl, headers });

console.log(logContent);
  next();
}
