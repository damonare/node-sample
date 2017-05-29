//引入mongodb模块
import mongodb from 'mongodb';
//初始化连接数据库，mongodb默认端口27017
const server = new mongodb.Server('localhost', 27017, {
    auto_reconnect: true
});
//新建数据库名称learn
const db = new mongodb.Db('learn', server, {
    safe: true
});
console.log("database is running")

export const insert = (fileName, filePath) => {
    db.open((err, db) => {
        if (!err) {
            /*
            新建“表”pictures,这里仅为了演示node操作数据库的方式。因此只存储了文件名和文件路径。而且mongodb适合合保存JSON数据，不适合保存文件，可以考虑在JSON里面保存文件的路径名。如果实在需要把mongodb当成分布式文件系统，请用户GridFS
            */
            db.collection('pictures', (err, collection) => {
                collection.insert({
                    filename: fileName,
                    filepath: filePath
                }, (err, docs) => {
                    console.log(docs);
                    db.close();
                });
            })
        } else {
            console.log(err);
        }
    });
}
