var db = connect("longquan");
var userList = db.user.find();
userList.forEach(function(user) {
    printjson(user)
});