//引入http模块赋值给http变量
import http from 'http';
import url from 'url';

export const firstStart = (route, handle) => {
    //调用http对象方法createServer构建服务器
    http.createServer((request, response) => {
        const pathname = url.parse(request.url).pathname;
        route(handle, pathname, response, request);
        console.log("一次服务器请求触发");
    }).listen(8888);
    // 终端打印如下信息
    console.log('Server running at http://127.0.0.1:8888/');
}
