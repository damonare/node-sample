'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var data = void 0; //该文件为fs模块的测试文件

_fs2.default.readFile('input.txt', function (err, report) {
    data = report.toString();
    console.log("oh, look at all my money: " + report);
    _fs2.default.writeFile('test.txt', data, function () {
        console.log("can't wait to hear back from her!");
    });
});