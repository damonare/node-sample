'use strict';

var _server = require('./server');

var _router = require('./router');

var _requestHandlers = require('./requestHandlers');

//创建handle对象
var handle = {}; /*
                 本node应用实现了一个文件上传功能，涉及知识点有：服务端JavaScript、函数式编程、阻塞与非阻塞、回调、事件、内部和外部模块等等。可谓麻雀虽小，五脏俱全。
                 */
//引入server,router,requestHandlers模块

handle['/'] = _requestHandlers.start;
handle['/start'] = _requestHandlers.start;
handle['/upload'] = _requestHandlers.upload;
handle['/show'] = _requestHandlers.show;
//进行函数传递
(0, _server.firstStart)(_router.route, handle);