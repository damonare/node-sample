/*
本node应用实现了一个文件上传功能，涉及知识点有：服务端JavaScript、函数式编程、阻塞与非阻塞、回调、事件、内部和外部模块等等。可谓麻雀虽小，五脏俱全。
*/
//引入server,router,requestHandlers模块
var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');
//创建handle对象
var handle = {};
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
handle['/show'] = requestHandlers.show;
//进行函数传递
server.start(router.route,handle);
