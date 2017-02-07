//引入http模块赋值给http变量
var http = require("http");
var url = require('url');
//调用http对象方法createServer构建服务器
function start(route, handle) {
    http.createServer(function(request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        //设置了接收数据的编码格式为UTF-8，注册“data”事件的监听器，在 data 事件回调中收集所有的 POST 数据
        request.setEncoding("utf8");
        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            console.log("Received POST data chunk '" +
                postDataChunk + "'.");
        });
        //注册“end”事件的监听器，当接收到所有数据，触发 end 事件后，其回调函数调用请求路由，并将数据传递给它。
        request.addListener("end", function() {
            route(handle, pathname, response, postData);
        });
        console.log("一次服务器请求触发");
        
    }).listen(8888);
    // 终端打印如下信息
    console.log('Server running at http://127.0.0.1:8888/');
}
exports.start = start;
