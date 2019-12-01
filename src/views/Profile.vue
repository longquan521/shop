<template>
  <div>
    <!-- tab做登录注册 -->
    <van-tabs>
      <!-- 登录部分 -->
      <van-tab title="登录">
        <van-cell-group>
          <van-field label="用户名" required clearable placeholder="请输入用户名" v-model="loginUsername" />
          <van-field
            label="密码"
            type="password"
            required
            clearable
            placeholder="请输入密码"
            v-model="loginPassword"
          />
          <div>
            <van-button type="primary" size="large">登录</van-button>
          </div>
        </van-cell-group>
      </van-tab>
      <!-- 注册部分 -->
      <van-tab title="注册">
        <van-cell-group>
          <van-field label="用户名" required clearable placeholder="请输入用户名" v-model="registUsername" />
          <van-field
            label="密码"
            type="password"
            required
            clearable
            placeholder="请输入密码"
            v-model="registPassword"
          />
          <div>
            <van-button @click="regisHander" type="primary" size="large">注册</van-button>
          </div>
        </van-cell-group>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/service.config.js";
export default {
  data() {
    return {
      loginUsername: "",
      loginPassword: "",
      registUsername: "",
      registPassword: ""
    };
  },
  methods: {
    // 注册的处理方法,在service.config.js中配置了后台的网址，然后去写后台的代码
    regisHander() {
      axios({
        url: url.registUser,
        method: "post",
        data: {
          userName: this.registUsername,
          password: this.registPassword
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            //  Toast.success('注册成功');//这么写会有问题，换个写法
            this.$toast.success("注册成功");
            this.registUsername = this.registPassword = "";
          } else {
            this.$toast.fail("注册失败");
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast.fail("注册失败");
        });
    }
  }
};
</script>
<style lang="scss">
</style>