const Koa = require("koa");
const app = new Koa();

app.use(async ctx => {
    //data去叠加数据
    let data = "";

    // 监听data事件，收到表单数据的时候就会执行
    ctx.req.on("data", chunk => {
        data += chunk;//二进制 相当于执行toString
    })

    // 接收表单提交数据完成后
    ctx.req.on("end", () => {
        data = decodeURI(data);
        console.log(data);//username=吾皇万岁&password=123
    })

    ctx.body = "123"
})

app.listen(3000, () => {
    console.log("在3000")
})