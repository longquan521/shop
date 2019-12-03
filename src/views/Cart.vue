<template>
  <div>
    <van-nav-bar title="购物车"></van-nav-bar>
    <div class="goods">
      <van-card v-for="(item,index) in productList"
                :key="index"
                :num="1"
                :price="item.price"
                :desc="item.company"
                :title="item.name"
                :thumb="item.img">
        <div slot="footer">
          <van-button size="mini">增加</van-button>
          <van-button size="mini">减少</van-button>
          <van-button size="mini"
                      @click="delCart(item._id,index)">删除</van-button>
        </div>
      </van-card>
    </div>

    <van-submit-bar :price="totalPrice"
                    class="submit-bar"
                    button-text="提交订单"
                    @submit="onSubmit" />

  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import url from "@/service.config";
export default {
  data() {
    return {
      productList: []
      // totalPrice: ""
    };
  },
  created() {
    // 先验证用户是否登录
    if (JSON.stringify(this.userInfo) === "{}") {
      this.$toast.fail("请先登录");
      setTimeout(() => {
        this.$router.push("/profile");
      }, 1000);
    } else {
      axios({
        url: url.getCart,
        method: "get",
        params: {
          userId: this.userInfo._id
        }
      })
        .then(res => {
          console.log("购物车内容", res);
          for (let item of res.data) {
            this.productList.push(item.productId);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    ...mapState(["userInfo"]),
    totalPrice() {
      return (
        this.productList.reduce((sum, elem) => {
          sum += elem.price;
          return sum;
        }, 0) *
        10 *
        10
      );
    }
  },
  methods: {
    onSubmit() {
      this.$toast("进入付款界面");
    },
    delCart(id, index) {
      // 删除数据库中的数据，如果删除成功，进入回调函数，在回调函数中，如下代码
      this.productList.splice(index, 1);
      // 自己写删除
      // axios({
      //   url: url.delCart,
      //   method: "post",
      //   data: {
      //     _id: this.productList._id
      //   }
      // });
    }
  }
};
</script>
<style lang="scss">
.goods {
  margin-bottom: 2rem;
}
.submit-bar {
  margin-bottom: 1rem;
}
</style>