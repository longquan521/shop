// 接收前端发过来的请求
// 表示用户的路由，
const Router = require("koa-router");
let router = new Router();

const mongoose = require("mongoose");

// 后端的post接收注册信息
router.post("/registUser", async (ctx) => {
    //获取model    因为M层是管理数据的，所以要存储数据到数据库，要获取到M层  model
    const User = mongoose.model("User");
    // 接收post请求，封装成user对象
    let newUser = new User(ctx.request.body);
    // 使用save保存用户信息
    await newUser.save().then(() => {
        ctx.body = {
            code: 200,
            message: "注册成功"
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: err
        }
    })
})
// 接收登录信息
router.post("/loginUser", async (ctx) => {
    //接收前端发送的数据
    let loginUser = ctx.request.body;
    let userName = loginUser.userName;
    let password = loginUser.password;
    //引入model
    const User = mongoose.model("User");
    // 比对 因为密码加盐加密了  先查询用户名是否存在  存在就去比较密码
    await User.findOne({ userName: userName }).exec().then(async (result) => {
        if (result) {
            let newUser = new User();
            await newUser.comparePassword(password, result.password).then(isMath => {
                // 登录成功
                if (isMath) {
                    ctx.body = {
                        code: 200,
                        message: "登录成功",
                        userInfo: result
                    }
                } else {//登录失败
                    ctx.body = {
                        code: 201,
                        message: "登录失败"
                    }

                }
            })
        } else {
            ctx.body = {
                code: 201,
                message: "用户名不存在"
            }
        }
    })
})

// 暴露
module.exports = router;