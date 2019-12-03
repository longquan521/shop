var user1 = {
    name : "龙泉",
    age: 18,
    hobby: ["敲代码", "打球"],
    pc:
    {
        brand: "华硕",
        price: 5000
    }
};
var user2 = {
    name : "玲儿",
    age: 18,
    hobby: ["学习", "看电视"],
    pc:
    {
        brand: "联想",
        price: 4000
    }
};
var user3 = {
    name : "小弟",
    age: 18,
    hobby: ["敲代码"]
};
var db = connect("longquan");
db.user.insert([user1, user2, user3]);
print("insert success")