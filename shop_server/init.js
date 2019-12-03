// 这个文件是为了初始化mongoose,连接数据库
const mongoose = require("mongoose");
const db = "mongodb://localhost/shop";


// 引入User的schema 先npm i glob --save
const glob = require("glob");
const path = require("path");
// 暴露初始化schema模型，因为不只有一个schema,所以*表示./model文件下所有的js文件
exports.initSchemas = () => {
    // 引入所有的schema
    glob.sync(path.resolve(__dirname, "./model", "*.js")).forEach(require)
}

// 暴露  连接数据库方法
exports.connect = () => {
    // 连接数据库
    mongoose.connect(db, { useNewUrlParser: true });
    // 监听数据库连接，没连上重连
    mongoose.connection.on("disconnected", () => {
        mongoose.connect(db);
    });
    // 数据库出现错误的监听
    mongoose.connection.on("error", err => {
        console.log(err);
        mongoose.connect(db);
    });
    // 连接时候
    mongoose.connection.once("open", () => {
        console.log("mongodb connected success");
    });
}