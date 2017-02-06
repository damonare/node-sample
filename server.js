//引入http模块赋值给http变量
var http = require("http");
var url=require('url');
//调用http对象方法createServer构建服务器
function start(route,handle){
    http.createServer(function(request, response) {
        var pathname=url.parse(request.url).pathname;
        route(handle,pathname);
        console.log("一次服务器请求触发");
        // 发送 HTTP 头部
        // HTTP 状态值: 200 : OK
        // 内容类型: text/plain
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });

            // 发送响应数据 "Hello World"
        response.write("Hello World by response.write");
        response.end();
    }).listen(8888);
    // 终端打印如下信息
    console.log('Server running at http://127.0.0.1:8888/');
}
exports.start=start;
