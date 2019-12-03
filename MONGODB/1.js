// 用mongodb直接写mongodb 最基本的
var userName = "longquan";
var time = Date.parse(new Date());
var data = {
    "username": userName,
    "registTime": time
};
var db = connect("longquan");
db.user.insert(data);
print("insert success")