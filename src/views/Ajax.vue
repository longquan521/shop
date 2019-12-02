<template>
  <div>
    <van-button type="primary" @click="getData">获取数据</van-button>
    <van-button type="danger" @click="clearData">清空数据</van-button>
    <ul>
      <li v-for="(item,index) of list" :key="index">{{index+1}}:{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    ajax() {
      // ajax原理
      let movieUrl =
        "https://bird.ioliu.cn/v1?url=https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=30&page_start=0";
      //1 创建XMLHttpRequest对象
      let xmlhttp;
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
      } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      //2   发送请求
      xmlhttp.open("GET", movieUrl, true);
      xmlhttp.send();
      //3 服务器的响应 4 对返回数据进行操作
      xmlhttp.addEventListener("readystatechange", () => {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          let obj = JSON.parse(xmlhttp.responseText);
          console.log(obj);
          this.list = obj.subjects;
        }
      });
    },
    getData() {
      this.ajax();
    },
    clearData() {
      this.list = [];
    }
  }
};
</script>

<style lang="scss">
</style>