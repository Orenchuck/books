export function LoggerMiddleware({ path, baseUrl, originalUrl, headers }, res, next) {
  const logContent: string = JSON.stringify({ path, baseUrl, originalUrl, headers });

  console.log(logContent);
  next();
}