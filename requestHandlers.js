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
*/

var querystring = require("querystring");

function start(response, postData) {
    console.log('Start!!!');
    //尝试下列阻塞代码
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

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" method="post">' +
        '<textarea name="text" rows="20" cols="60"></textarea>' +
        '<input type="submit" value="Submit text" />' +
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

function upload(response, postData) {
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.write("You've sent the text: " +
        querystring.parse(postData).text);
    response.end();
}
exports.start = start;
exports.upload = upload;
