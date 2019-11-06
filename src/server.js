// import * as fs from 'fs';
// import * as express from 'express';

const http = require('http');
const https = require('https');

// const httpsOptions = {
//     key: fs.readFileSync('./secrets/key.pem'),
//     cert: fs.readFileSync('./secrets/certificate.pem'),
// };

// const server = express();

const server80 = http.createServer();
// server80.get('*', function(req, res) {  
//     res.redirect('https://' + req.headers.host + req.url);

server80.listen(80, () => console.log('Сервер работает'));
// http(function (req, res) {
//     res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
//     res.end();
// });
// https.createServer(httpsOptions, server).listen(443, () => console.log('Сервер2 работает'));