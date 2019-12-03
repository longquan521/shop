var startTime = (new Date()).getTime();
var db = connect("longquan");

var result = db.tel.find({ tel: "15049939333" });

result.forEach(function (res) {
    printjson(res)
});

var runTime = (new Date()).getTime() - startTime;
print("run time is" + runTime + "ms");



// 建索引:提高产业效率，需要占用空间，如果要频繁查询，才需要建立索引
// db.tel.ensureIndex({ tel: 1 })
// 获取索引
// db.tel.getIndexes()
// 删除索引
// db.tel.dropIndex({ username: 1 })