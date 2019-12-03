const Koa = require("koa");
const app = new Koa();

app.use(async ctx => {
    if (ctx.url === "/longquan") {
        ctx.cookies.set(
            "name", "longquan", {
            domain: "localhost",
            path: "/longquan",
            maxAge: "24*60*60*1000",
            expires: new Date("2019-12-31"),
            httpOnly: false,
            overwrite: false
        }
        )
        ctx.body = "cookie success"
    } else {
        ctx.body = "no cookie"
    }
})


app.listen(3000, () => {
    console.log("在3000")
})