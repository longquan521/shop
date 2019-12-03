// findAndModify应答式
var modify = {
    findAndModify: "user",
    query: { name: "龙泉" },
    update: { $set: { age: 32 } },
    new: true
};

var result = db.runCommand(modify);
printjson(result)