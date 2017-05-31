'use strict';
import fs from 'fs';
import http from 'http';
import path from 'path';
import url from 'url';

const workDir = path.resolve('.');
const hostname = '127.0.0.1';
const port = 4000;

console.log('Static root dir: ' + workDir);
//创建文件服务器
const server = http.createServer((request, response) => {
    const pathname = url.parse(request.url).pathname;
    const filePath = path.join(workDir, pathname);
    fs.stat(filePath, (err, stat) => {
        if (!err && stat.isFile()) {
            response.writeHead(200);
            fs.createReadStream(filePath).pipe(response);
        } else if(!!stat.isDirectory()) {
            response.writeHead(200);
            fs.createReadStream(`${filePath}/index.html`).pipe(response);
        } else {
            console.log('404 ' + request.url);
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});
server.listen(port, hostname, () => {
    console.log('The Server is running at port:4000');
});
