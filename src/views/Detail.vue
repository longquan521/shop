<template>
  <div>
    <van-nav-bar title="商品详情"
                 left-text="返回"
                 @click-left="$router.go(-1)"></van-nav-bar>
    <img :src="detail.img"
         class="detail-img"
         alt="">
    <div class="detail">
      <p class="detail-name">{{detail.name}}</p>
      <p class="detail-price">￥{{detail.price}}</p>
      <p class="detail-company">公司：{{detail.company}}</p>
      <p class="detail-city">产地：{{detail.city}}</p>
    </div>

    <div class="toolBar">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o"
                               text="客服" />
        <van-goods-action-icon icon="cart-o"
                               text="购物车"
                               @click="$router.push('/cart')" />
        <van-goods-action-button type="warning"
                                 text="加入购物车"
                                 @click="addCart" />
        <van-goods-action-button type="danger"
                                 text="立即购买" />
      </van-goods-action>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import url from "@/service.config.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      detail: {}
    };
  },
  created() {
    // console.log(this.$route.params.id);//第二种
    //console.log(this.$route.query.id); //第三种
    //console.log(this.$route.params.id); //第四种
    axios({
      url: url.getDetail,
      method: "get",
      params: {
        id: this.$route.params.id
      }
    })
      .then(res => {
        console.log("商品详情", res);
        this.detail = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    addCart() {
      // 检查用户是否登录   前端vuex保存登录状态
      // 如果后端保存登录状态  用 koa-session  redis
      if (JSON.stringify(this.userInfo) === "{}") {
        this.$toast.fail("添加失败，请先登录");
        setTimeout(() => {
          this.$router.push("/profile");
        }, 1000);
      } else {
        // 插入购物车
        axios({
          url: url.addCart,
          method: "post",
          data: {
            productId: this.detail._id,
            userId: this.userInfo._id
          }
        })
          .then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.$toast.success("添加成功");
              this.$router.push("/cart");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-img {
  width: 100%;
  height: 5rem;
}
.detail {
  padding: 0.2rem;
  &-name {
    color: #333;
    font-weight: bold;
  }
  &-price {
    color: #ff7300;
    font-size: 0.4rem;
  }
}
</style>