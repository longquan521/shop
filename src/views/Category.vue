<template>
  <div>
    <van-nav-bar title="商品类型"></van-nav-bar>
    <div class="category">
      <van-row>
        <!-- 左边 -->
        <van-col span="6"
                 class="nav">
          <ul>
            <li @click="selectCategory(item.typeId,index)"
                :class="{active:active==index}"
                v-for="(item,index) in types"
                :key="index">
              {{item.typeName}}
            </li>
          </ul>
        </van-col>
        <!-- 右边 -->
        <van-col span="18"
                 class="container">
          <van-pull-refresh v-model="isLoading"
                            @refresh="onRefresh">
            <van-list @load="onLoad"
                      v-model="isLoading"
                      :finished="finished"
                      finished-text="没有更多了"
                      class="content">
              <div @click="goDetail(item._id)"
                   class="content-item"
                   v-for="(item,index) in productList"
                   :key="index">
                <img :src="item.img"
                     alt="">
                <p class="content-item-name">
                  {{item.name}}
                </p>
                <p class="content-item-price">
                  ￥{{item.price}}
                </p>

              </div>
            </van-list>
          </van-pull-refresh>
        </van-col>
      </van-row>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import url from "@/service.config.js";
export default {
  data() {
    return {
      types: [], //类型消息
      active: 0,
      productList: [],
      typeId: 1, //当前选中类型的id
      start: 0,
      limit: 10,
      finished: false, //是否数据取完
      isLoading: false //上拉加载使用
    };
  },
  created() {
    axios({
      url: url.getTypes
    })
      .then(res => {
        // console.log(res);
        this.types = res.data;
        this.selectCategory(this.typeId, this.active);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    selectCategory(typeId, index) {
      this.active = index;
      this.typeId = typeId;
      this.productList = [];
      this.finished = false;
      this.getProductList();
    },
    // 获取商品
    getProductList() {
      this.isLoading = true;
      axios({
        url: url.getProductsByType,
        method: "get",
        params: {
          typeId: this.typeId,
          start: this.productList.length,
          limit: this.limit
        }
      })
        .then(res => {
          // console.log(res);
          if (res.data.length != 0) {
            this.productList = this.productList.concat(res.data);
          } else {
            this.finished = true;
          }
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onLoad() {
      setTimeout(() => {
        this.getProductList();
      }, 1000);
    },
    onRefresh() {
      setTimeout(() => {
        this.productList = [];
        this.getProductList();
      }, 1000);
    },
    goDetail(id) {
      console.log(id);
      // 跳转进详情页

      // ①第一种
      // this.$router.push("/detail");

      // ②第二种
      // this.$router.push({
      //   name: "detail",
      //   params: {
      //     id: id
      //   }
      // });

      // ③第三种 传的id不会丢失
      // this.$router.push({
      //   path: "/detail",
      //   query: {
      //     id: id
      //   }
      // });

      //④第四种//现在有问题
      this.$router.push(`/detail/${id}`);
    }
  }
};
</script>
<style lang="scss" scoped>
.nav {
  background-color: #eee;
  li {
    height: 0.6rem;
    border-bottom: 1px solid #fff;
    padding: 3px;
    line-height: 0.6rem;
    text-align: center;
  }
  .active {
    background-color: #fff;
  }
}
.container {
  position: fixed;
  top: 46px;
  right: 0;
  bottom: 1rem;
  overflow-y: scroll;
}
.content {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 1rem;
  &-item {
    width: 40%;
    padding: 0 10px;
    text-align: center;
    img {
      width: 2rem;
      height: 2rem;
    }
    &-name {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>