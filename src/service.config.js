// 统一后台接口
const MOCKURL = "http://www.longquan.com/";//模拟URL
const SERVERURL = "http://localhost:3000/";//真实URL

const URL = {
    getVarietyItem: MOCKURL + "getVarietyItem",
    getHotProduct: MOCKURL + "getHotProduct",
    registUser: SERVERURL + "user/registUser"
};

export default URL;