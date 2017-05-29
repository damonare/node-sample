//该文件为fs模块的测试文件
import fs from 'fs';
let data;
fs.readFile('input.txt', (err,report) => {
    data = report.toString();
    console.log("oh, look at all my money: "+report);
    fs.writeFile('test.txt', data, () => {
      console.log("can't wait to hear back from her!");
    });
});
