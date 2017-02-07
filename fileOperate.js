//该文件为fs模块的测试文件
var fs = require('fs');
var data;
fs.readFile('input.txt', function(err,report) {
    data=report.toString();
    console.log("oh, look at all my money: "+report);
    fs.writeFile('test.txt', data, function() {
      console.log("can't wait to hear back from her!");
    });
});
fs.renameSync("C:/Users/Administrator/AppData/Local/Temp/upload_e99348f6439b7dddf07d761646a3b977",'D:/Xampp/htdocs/node-sample/3.jpg')
