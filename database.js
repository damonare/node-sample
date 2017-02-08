//引入mongodb模块
var mongodb = require('mongodb');
//初始化连接数据库，mongodb默认端口27017
var server = new mongodb.Server('localhost', 27017, {
    auto_reconnect: true
});
//新建数据库名称learn
var db = new mongodb.Db('learn', server, {
    safe: true
});
console.log("database is running")

function insert(fileName, filePath) {
    db.open(function(err, db) {
        if (!err) {
            /*
            新建“表”pictures,这里仅为了演示node操作数据库的方式。因此只存储了文件名和文件路径。而且mongodb适合合保存JSON数据，不适合保存文件，可以考虑在JSON里面保存文件的路径名。如果实在需要把mongodb当成分布式文件系统，请用户GridFS
            */
            db.collection('pictures', function(err, collection) {
                collection.insert({
                    filename: fileName,
                    filepath: filePath
                }, function(err, docs) {
                    console.log(docs);
                    db.close();
                });
                //数据库查询
                // collection.find().toArray((err, docs) => {
                //     if (err) {
                //         throw err;
                //     } else {
                //         data = docs;
                //         db.close();
                //     }
                // });
            })
        } else {
            console.log(err);
        }
    });
}

exports.insert = insert;
