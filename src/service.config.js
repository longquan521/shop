// 统一后台接口
const MOCKURL = "http://www.longquan.com/"; //模拟URL
const SERVERURL = "http://localhost:3000/"; //真实URL

const URL = {
    getVarietyItem: MOCKURL + "getVarietyItem",
    getHotProduct: MOCKURL + "getHotProduct",
    registUser: SERVERURL + "user/registUser",
    loginUser: SERVERURL + "user/loginUser",
    getTypes: SERVERURL + "type/getTypes",
    getProductsByType: SERVERURL + "product/getProductsByType",
    getDetail: SERVERURL + "product/getDetail",
    addCart: SERVERURL + "cart/addCart",
    getCart: SERVERURL + "cart/getCart",
    // delCart: SERVERURL + "cart/delCart"
};

export default URL;