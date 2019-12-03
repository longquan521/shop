const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// unique唯一的 Schema模型
const userSchema = new Schema({
    userId: Schema.Types.ObjectId,
    userName: { unique: true, type: String },
    password: String,
    createDate: { type: Date, default: Date.now() }
});

// bcrypt加盐加密，每次保存之前加密
userSchema.pre("save", function (next) {
    // 随机生成salt   10迭代次数
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err)
            this.password = hash;
            next();
        })
    })
})
// 定义一个方法，比较密码的方法，在user.js里使用
userSchema.methods = {
    // 比较密码
    comparePassword: (_password, password) => {
        return new Promise((resolve, reject) => {
            console.log(_password, password)
            bcrypt.compare(_password, password, (err, isMath) => {
                if (!err) resolve(isMath)
                else reject(err)
            })
        })
    }
}


// 发布模型
mongoose.model("User", userSchema);