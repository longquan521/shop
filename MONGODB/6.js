// 很多数据，应该怎么办
function getTel() {
    var prefixArr = ["130", "131", "132", "135", "183", "150", "160", "187", "134", "137"]
    var tel = prefixArr[parseInt(Math.random() * 10)]
    for (var i = 0; i < 8; i++) {
        tel += Math.floor(Math.random() * 10)
    }
    return tel
}

// console.log(getTel())
var startTime = (new Date()).getTime();
var db = connect("longquan");
var tempInfo = [];
for (var i = 0; i < 1000000; i++) {
    tempInfo.push({
        logintime: new Date(),
        tel: getTel()
    })
}
db.tel.insert(tempInfo);
var runTime = (new Date()).getTime() - startTime;
print("run time is" + runTime + "ms");