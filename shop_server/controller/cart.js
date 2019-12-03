const Koa = require("koa");
const Router = require("koa-router");
let router = new Router();
const mongoose = require("mongoose");


router.post("/addCart", async (ctx) => {
    const Cart = mongoose.model("Cart");
    const cart = new Cart(ctx.request.body);
    await cart.save().then(() => {
        ctx.body = {
            code: 200,
            message: "添加成功"
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: err
        }
    })
})

router.get("/getCart", async (ctx) => {
    const Cart = mongoose.model("Cart");//联合查询加了productId
    await Cart.find({ userId: ctx.query.userId }).populate("productId").exec().then(res => {
        ctx.body = res;
    }).catch(err => { })
})

// 购物车删除
// router.post("/delCart", async (ctx) => {
//     const Cart = mongoose.model("Cart");
//     // const cart = new Cart(ctx.request.body);
//     console.log("正在删除")
//     await Cart.where({ userId: ctx.request.userId }).populate("productId").remove().exec().then(res => {
//         ctx.body = res;
//     }).catch(err => {
//         ctx.body = "失败"
//     })
//     console.log("删除完成")
// })

module.exports = router;