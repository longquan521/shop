import Mock from "mockjs"
import data from "./data.json"
Mock.mock("http://www.longquan.com/getList", { data: data.list })
// 随机mock数据生成
Mock.mock("http://www.longquan.com/getUser", {
    "name|2": "longquan",
    "age|18-35": 20
})

Mock.mock("http://www.longquan.com/regexp", {
    "regexp1": /[a-z][A-Z][0-9]/,
    "regexp2": /\d{5,10}/
})

Mock.mock("http://www.longquan.com/list", {
    "info|10-20": [
        {
            "index|+1": 1,
            "name": "@first @last",
            "id": "@integer(10000,99999)",
            "date": "@datetime",
            "img": "@image('200*200')",
            "text": "@sentence(6,22)"
        }
    ]
})
// mock.random随机生成数据
let Random = Mock.Random;
let productData = req => {
    let productList = [];//获取农机信息的数组
    for (let i = 0; i < 100; i++) {
        let poduct = {
            name: Random.ctitle(5, 20),
            img: Random.dataImage('100x100', '农机' + Random.integer(1, 100)),
            price: Random.integer(1000, 10000),
            owner: Random.cname()
        };
        productList.push(poduct)
    }
    return productList
}
Mock.mock("http://www.longquan.com/getVarietyItem", productData)