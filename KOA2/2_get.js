const Koa = require("koa");
const app = new Koa();

app.use(async ctx => {
    let url = ctx.url;
    let query = ctx.query;//返回对象
    let queryString = ctx.queryString;//返回字符串
    ctx.body = {
        url,
        query,
        queryString
    }
})
app.listen(3000, () => {
    console.log("在3000")
})