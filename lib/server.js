'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.firstStart = undefined;

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//引入http模块赋值给http变量
var firstStart = exports.firstStart = function firstStart(route, handle) {
    //调用http对象方法createServer构建服务器
    _http2.default.createServer(function (request, response) {
        var pathname = _url2.default.parse(request.url).pathname;
        route(handle, pathname, response, request);
        console.log("一次服务器请求触发");
    }).listen(8888);
    // 终端打印如下信息
    console.log('Server running at http://127.0.0.1:8888/');
};