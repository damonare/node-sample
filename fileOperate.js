var fs = require('fs');
var data;
fs.readFile('input.txt', function(err,report) {
    data=report.toString();
    console.log("oh, look at all my money: "+report);
    fs.writeFile('test.txt', data, function() {
      console.log("can't wait to hear back from her!");
    });
});
