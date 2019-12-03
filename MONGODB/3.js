// addToSet表示查询有没有，不重复添加
var newHobby = ["吃鸡", "王者", "学习"];
db.user.update({ name: "龙泉" }, { $addToSet: { hobby: { $each: newHobby } } })