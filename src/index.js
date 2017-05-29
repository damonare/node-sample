/*
本node应用实现了一个文件上传功能，涉及知识点有：服务端JavaScript、函数式编程、阻塞与非阻塞、回调、事件、内部和外部模块等等。可谓麻雀虽小，五脏俱全。
*/
//引入server,router,requestHandlers模块
import { firstStart } from './server';
import { route } from './router';
import { start, upload, show } from './requestHandlers';
//创建handle对象
const handle = {};
handle['/'] = start;
handle['/start'] = start;
handle['/upload'] = upload;
handle['/show'] = show;
//进行函数传递
firstStart(route, handle);
