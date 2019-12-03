const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const path = require("path");

// 加载模板引擎
app.use(views(path.join(__dirname, "./views"), {
    extension: "ejs"
}))

app.use(async ctx => {
    let title = "hello longquan";

    await ctx.render("index", {
        title,
        list: [
            { name: "aa", age: 11 },
            { name: "bb", age: 22 },
            { name: "cc", age: 33 },
            { name: "dd", age: 44 }
        ]
    })
})



app.listen(3000, () => {
    console.log("在3000")
})