/*
引入Node.js 模块， child_process。之所以用它，是为了实现一个既简单又实用的非阻塞操作：exec()
*/

// var exec = require('child_process').exec;

/*
querystring从字面上的意思就是查询字符串，是node的内置模块，一般是对http请求所带的数据进行解析。querystring模块只提供4个方法，在我看来，这4个方法是相对应的。
这4个方法分别是querystring.parse和querystring.stringify,querystring.escape和querystring.unescape。
querystring.stringify()序列化;
querystring.parse()反序列化;
querystring.escape()编码;
querystring.unescape()解码;
fs模块可对本地文件进行操作，也是node内置模块，具体方法可看官方文档
formidable模块是Felix Geisendörfer开发的。它对解析上传的文件数据做了很好的抽象。
*/

import querystring from 'querystring';
import fs from 'fs'
import formidable from 'formidable';
//引入外部模块，数据库
import { insert } from './database';

export const start = (response, postData) => {
    console.log('Start!!!');
    //尝试下列阻塞代码，感受下阻塞和非阻塞的区别
    // function sleep(time){
    //     var startTime=new Date().getTime();
    //     while(new Date().getTime()<startTime+time);
    // }
    // sleep(10000);

    /*
    exec()做了什么呢？它从 Node.js 来执行一个 shell 命令。在上述例子中，
    我们用它来获取当前目录下所有的文件（ “ls -lah”） ,然后，当/start URL
    请求的时候将文件信息输出到浏览器中
    */

    // exec("ls-lah", function(error, stdout, stderr) {
    //     response.writeHead(200, {
    //         "Content-Type": "text/plain"
    //     });
    //     response.write(stdout);
    //     response.end();
    // });

    const body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" ' +
        'content="text/html; charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" ' +
        'method="post">' +
        '<input type="file" name="upload">' +
        '<input type="submit" value="Upload file" />' +
        '</form>' +
        '</body>' +
        '</html>';
    // 发送 HTTP 头部
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    response.write(body);
    response.end();
}

export const upload = (response, request) => {
    const form = new formidable.IncomingForm();
    console.log("About to parse");
    form.parse(request, (error, fields, files) => {
        /*
        使用fs相关API将要上传的临时文件转变为本地文件，方便显示。
        */
        //返回一个新建的 ReadStream 对象
        const readStream = fs.createReadStream(files.upload.path);
        //返回一个新建的 WriteStream 对象
        const writeStream = fs.createWriteStream("./1.jpg");
        readStream.pipe(writeStream);
        readStream.on('end', function() {
            fs.unlinkSync(files.upload.path);
        });
        //如果您没有安装mongodb数据库或是使用的其他数据库记得将下面这句注释
        insert('1.jpg',files.upload.path)
        // 发送 HTTP 头部
	    // HTTP 状态值: 200 : OK
	    // 内容类型: text/html
        response.writeHead(200, {
            "Content-Type": "text/html"
        });
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

export const show = (response, postData) => {
    console.log("Request handler 'show' was called.");
    //浏览器输入http://localhost:8888/show查看效果
    fs.readFile("./1.jpg", "binary", (error, file) => {
        if (error) {
            response.writeHead(500, {
                "Content-Type": "text/plain"
            });
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {
                "Content-Type": "image/jpg"
            });
            response.write(file, "binary");
            response.end();
        }
    });
}
