const Koa = require("koa");
const app = new Koa();

const Router = require("koa-router");
const router = new Router(
    { prefix: "/longquan" }
);
router.get("/abc", (ctx, next) => {
    ctx.body = "hello longquan"
})
router.get("/test", (ctx, next) => {
    ctx.body = "hello TEST"
})

app.use(router.routes());
app.use(router.allowedMethods())

app.use(async ctx => {

})

app.listen(3000, () => {
    console.log("在3000")
})