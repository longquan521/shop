<template>
  <div class="container">
    <!-- 头部 -->
    <van-nav-bar title="首页"
                 class="nav-title">
      <!-- slot插槽 -->
      <van-icon name="search"
                slot="left"></van-icon>
      <van-icon @click="$router.push('/profile')"
                slot="right">{{JSON.stringify(userInfo) ==="{}" ? "未登录" :userInfo.userName }}</van-icon>
    </van-nav-bar>
    <!-- 轮播图 -->
    <div class="carousel">
      <van-swipe :autoplay="5000"
                 indicator-color="white">
        <van-swipe-item class="carousel-item"
                        v-for="(item,index) in carouselItem"
                        :key="index">
          <img v-lazy="item.imgSrc"
               alt />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 热门商品 -->
    <div class="hot">
      <p class="hot-title">热门商品</p>
      <swiper class="hot-swiper"
              :options="swiperOption">
        <swiper-slide v-for="(item,index) in hotProducts"
                      :key="index">
          <div class="hot-swiper-content">
            <img :src="item.img"
                 alt />
            <div>{{item.name}}</div>
            <div>￥{{item.price}}</div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <!-- 推荐商品 -->
    <div class="variety">
      <p>推荐商品</p>
      <ul>
        <li class="variety-item"
            v-for="(item,index) in varietyItem"
            :key="index">
          <img :src="item.img"
               alt />
          <p>{{item.name}}</p>
          <p>￥{{item.price}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// require styles vue-awesome-swiper
import "swiper/dist/css/swiper.css";

import { swiper, swiperSlide } from "vue-awesome-swiper";
import axios from "axios";
import url from "@/service.config.js";
import { mapState } from "vuex"; //映射vuex里的state
export default {
  data() {
    return {
      // 轮播图的内容
      carouselItem: [
        {
          name: "img1",
          imgSrc:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971223&di=6615575119b70f88ac0b2c4e1cd9a035&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F26%2F42%2F75%2F5939fb2c16cc3.png"
        },
        {
          name: "img2",
          imgSrc:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971231&di=c1cb9a57d6f01cf7874c7f220bb39d03&imgtype=0&src=http%3A%2F%2Fpic14.nipic.com%2F20110504%2F7285319_172941139332_2.jpg"
        },
        {
          name: "img3",
          imgSrc:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971219&di=4dc41262749c6a26094df16b2b3d73bd&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171220%2F150b73a686eb45eeb47782b5f58f903a.png"
        }
      ],
      // 热门商品内容
      hotProducts: [
        {
          name: "机器1",
          img:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971223&di=6615575119b70f88ac0b2c4e1cd9a035&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F26%2F42%2F75%2F5939fb2c16cc3.png",
          price: "998",
          company: "大大公司",
          city: "曲阜"
        },
        {
          name: "机器2",
          img:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971231&di=c1cb9a57d6f01cf7874c7f220bb39d03&imgtype=0&src=http%3A%2F%2Fpic14.nipic.com%2F20110504%2F7285319_172941139332_2.jpg",
          price: "1988",
          company: "总在公司",
          city: "曲阜"
        },
        {
          name: "机器3",
          img:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971219&di=4dc41262749c6a26094df16b2b3d73bd&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171220%2F150b73a686eb45eeb47782b5f58f903a.png",
          price: "2698",
          company: "小小公司",
          city: "德州"
        },
        {
          name: "机器1",
          img:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971223&di=6615575119b70f88ac0b2c4e1cd9a035&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F26%2F42%2F75%2F5939fb2c16cc3.png",
          price: "998",
          company: "大大公司",
          city: "曲阜"
        },
        {
          name: "机器2",
          img:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971231&di=c1cb9a57d6f01cf7874c7f220bb39d03&imgtype=0&src=http%3A%2F%2Fpic14.nipic.com%2F20110504%2F7285319_172941139332_2.jpg",
          price: "1988",
          company: "总在公司",
          city: "曲阜"
        },
        {
          name: "机器3",
          img:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971219&di=4dc41262749c6a26094df16b2b3d73bd&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171220%2F150b73a686eb45eeb47782b5f58f903a.png",
          price: "2698",
          company: "小小公司",
          city: "德州"
        },
        {
          name: "机器1",
          img:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971223&di=6615575119b70f88ac0b2c4e1cd9a035&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F26%2F42%2F75%2F5939fb2c16cc3.png",
          price: "998",
          company: "大大公司",
          city: "曲阜"
        },
        {
          name: "机器2",
          img:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971231&di=c1cb9a57d6f01cf7874c7f220bb39d03&imgtype=0&src=http%3A%2F%2Fpic14.nipic.com%2F20110504%2F7285319_172941139332_2.jpg",
          price: "1988",
          company: "总在公司",
          city: "曲阜"
        },
        {
          name: "机器3",
          img:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971219&di=4dc41262749c6a26094df16b2b3d73bd&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171220%2F150b73a686eb45eeb47782b5f58f903a.png",
          price: "2698",
          company: "小小公司",
          city: "德州"
        }
      ],
      swiperOption: {
        slidesPerView: 3
      },
      // 推荐商品
      varietyItem: [
        // {
        //   name: "机器1",
        //   img:
        //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971223&di=6615575119b70f88ac0b2c4e1cd9a035&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F26%2F42%2F75%2F5939fb2c16cc3.png",
        //   price: "998",
        //   company: "大大公司",
        //   city: "曲阜"
        // },
        // {
        //   name: "机器2",
        //   img:
        //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971231&di=c1cb9a57d6f01cf7874c7f220bb39d03&imgtype=0&src=http%3A%2F%2Fpic14.nipic.com%2F20110504%2F7285319_172941139332_2.jpg",
        //   price: "1988",
        //   company: "总在公司",
        //   city: "曲阜"
        // },
        // {
        //   name: "机器3",
        //   img:
        //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971219&di=4dc41262749c6a26094df16b2b3d73bd&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171220%2F150b73a686eb45eeb47782b5f58f903a.png",
        //   price: "2698",
        //   company: "小小公司",
        //   city: "德州"
        // },
        // {
        //   name: "机器1",
        //   img:
        //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971223&di=6615575119b70f88ac0b2c4e1cd9a035&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F26%2F42%2F75%2F5939fb2c16cc3.png",
        //   price: "998",
        //   company: "大大公司",
        //   city: "曲阜"
        // },
        // {
        //   name: "机器2",
        //   img:
        //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971231&di=c1cb9a57d6f01cf7874c7f220bb39d03&imgtype=0&src=http%3A%2F%2Fpic14.nipic.com%2F20110504%2F7285319_172941139332_2.jpg",
        //   price: "1988",
        //   company: "总在公司",
        //   city: "曲阜"
        // },
        // {
        //   name: "机器3",
        //   img:
        //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971219&di=4dc41262749c6a26094df16b2b3d73bd&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171220%2F150b73a686eb45eeb47782b5f58f903a.png",
        //   price: "2698",
        //   company: "小小公司",
        //   city: "德州"
        // },
        // {
        //   name: "机器1",
        //   img:
        //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971223&di=6615575119b70f88ac0b2c4e1cd9a035&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F26%2F42%2F75%2F5939fb2c16cc3.png",
        //   price: "998",
        //   company: "大大公司",
        //   city: "曲阜"
        // },
        // {
        //   name: "机器2",
        //   img:
        //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971231&di=c1cb9a57d6f01cf7874c7f220bb39d03&imgtype=0&src=http%3A%2F%2Fpic14.nipic.com%2F20110504%2F7285319_172941139332_2.jpg",
        //   price: "1988",
        //   company: "总在公司",
        //   city: "曲阜"
        // },
        // {
        //   name: "机器3",
        //   img:
        //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971219&di=4dc41262749c6a26094df16b2b3d73bd&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171220%2F150b73a686eb45eeb47782b5f58f903a.png",
        //   price: "2698",
        //   company: "小小公司",
        //   city: "德州"
        // },
        // {
        //   name: "机器1",
        //   img:
        //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971223&di=6615575119b70f88ac0b2c4e1cd9a035&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F26%2F42%2F75%2F5939fb2c16cc3.png",
        //   price: "998",
        //   company: "大大公司",
        //   city: "曲阜"
        // },
        // {
        //   name: "机器2",
        //   img:
        //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971231&di=c1cb9a57d6f01cf7874c7f220bb39d03&imgtype=0&src=http%3A%2F%2Fpic14.nipic.com%2F20110504%2F7285319_172941139332_2.jpg",
        //   price: "1988",
        //   company: "总在公司",
        //   city: "曲阜"
        // },
        // {
        //   name: "机器3",
        //   img:
        //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971219&di=4dc41262749c6a26094df16b2b3d73bd&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171220%2F150b73a686eb45eeb47782b5f58f903a.png",
        //   price: "2698",
        //   company: "小小公司",
        //   city: "德州"
        // },
        // {
        //   name: "机器1",
        //   img:
        //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971223&di=6615575119b70f88ac0b2c4e1cd9a035&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F26%2F42%2F75%2F5939fb2c16cc3.png",
        //   price: "998",
        //   company: "大大公司",
        //   city: "曲阜"
        // },
        // {
        //   name: "机器2",
        //   img:
        //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971231&di=c1cb9a57d6f01cf7874c7f220bb39d03&imgtype=0&src=http%3A%2F%2Fpic14.nipic.com%2F20110504%2F7285319_172941139332_2.jpg",
        //   price: "1988",
        //   company: "总在公司",
        //   city: "曲阜"
        // },
        // {
        //   name: "机器3",
        //   img:
        //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971219&di=4dc41262749c6a26094df16b2b3d73bd&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171220%2F150b73a686eb45eeb47782b5f58f903a.png",
        //   price: "2698",
        //   company: "小小公司",
        //   city: "德州"
        // },
        // {
        //   name: "机器1",
        //   img:
        //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971223&di=6615575119b70f88ac0b2c4e1cd9a035&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F26%2F42%2F75%2F5939fb2c16cc3.png",
        //   price: "998",
        //   company: "大大公司",
        //   city: "曲阜"
        // },
        // {
        //   name: "机器2",
        //   img:
        //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971231&di=c1cb9a57d6f01cf7874c7f220bb39d03&imgtype=0&src=http%3A%2F%2Fpic14.nipic.com%2F20110504%2F7285319_172941139332_2.jpg",
        //   price: "1988",
        //   company: "总在公司",
        //   city: "曲阜"
        // },
        // {
        //   name: "机器3",
        //   img:
        //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575026971219&di=4dc41262749c6a26094df16b2b3d73bd&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171220%2F150b73a686eb45eeb47782b5f58f903a.png",
        //   price: "2698",
        //   company: "小小公司",
        //   city: "德州"
        // }
      ]
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  created() {
    // axios
    //   .get(
    //     "https://bird.ioliu.cn/v1?url=https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend"
    //   )
    //   .then(res => {
    //     console.log(res);
    //   });

    let url1 = "http://www.longquan.com/getList";
    let url2 = "http://www.longquan.com/getUser";
    let url3 = "http://www.longquan.com/regexp";
    let url4 = "http://www.longquan.com/list";

    // let url5 = "http://www.longquan.com/getVarietyItem";
    let url5 = url.getVarietyItem;
    axios.get(url5).then(res => {
      this.varietyItem = res.data;
      // console.log(this.varietyItem);
    });
  },
  computed: {
    ...mapState(["userInfo"])
  }
};
</script>
<style lang="scss" scoped>
.nav-title {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999 !important;
}
.carousel {
  margin-top: 1rem;
  height: 3rem;
  &-item {
    img {
      width: 100%;
      height: 3rem;
    }
  }
}
.hot {
  margin-top: 0.2rem;
  background-color: #fff;
  &-title {
    width: 100%;
    height: 0.5rem;
    padding-left: 0.2rem;
    line-height: 0.5rem;
    text-align: left;
    box-sizing: border-box;
  }
  &-swiper {
    &-content {
      width: 2rem;
      text-align: center;
      img {
        width: 2rem;
        height: 2rem;
      }
    }
  }
}
.container {
  background-color: #eee;
}

// 热门商品样式
.variety {
  margin-top: 0.2rem;
  background-color: #fff;
  text-align: center;
  margin-bottom: 1rem;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  &-item {
    flex-basis: 45%;
  }
  img {
    width: 2rem;
    height: 2rem;
  }
}
</style>
