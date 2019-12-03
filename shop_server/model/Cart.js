const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const cartSchema = new Schema({
    ID: ObjectId,
    productId: {
        type: ObjectId,
        ref: "Product"  //指向联合查询的model，多集合查询
    },
    userId: ObjectId,
    creatDate: { type: Date, default: Date.now() }
});
// 发布
mongoose.model("Cart", cartSchema)