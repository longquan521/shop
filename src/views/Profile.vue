<template>
  <div>
    <!-- tab做登录注册 -->
    <van-tabs>
      <!-- 登录部分 -->
      <van-tab title="登录">
        <van-cell-group>
          <van-field label="用户名"
                     required
                     clearable
                     placeholder="请输入用户名"
                     v-model="loginUsername" />
          <van-field label="密码"
                     type="password"
                     required
                     clearable
                     placeholder="请输入密码"
                     v-model="loginPassword" />
          <div>
            <van-button @click="loginHander"
                        type="primary"
                        size="large">登录</van-button>
          </div>
        </van-cell-group>
      </van-tab>
      <!-- 注册部分 -->
      <van-tab title="注册">
        <van-cell-group>
          <van-field label="用户名"
                     required
                     clearable
                     placeholder="请输入用户名"
                     v-model="registUsername" />
          <van-field label="密码"
                     type="password"
                     required
                     clearable
                     placeholder="请输入密码"
                     v-model="registPassword" />
          <div>
            <van-button @click="regisHander"
                        type="primary"
                        size="large">注册</van-button>
          </div>
        </van-cell-group>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/service.config.js";
import { mapActions } from "vuex"; //mapActions能把vuex里的方法映射出来
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
    ...mapActions(["loginAction"]), //这就能正常调用了
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
    },
    // 登录的处理方法
    loginHander() {
      axios({
        url: url.loginUser,
        method: "post",
        data: {
          userName: this.loginUsername,
          password: this.loginPassword
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            // 延迟几秒跳转,模拟的方法  promise是对异步操作进行管理
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve();
              }, 1000);
            })
              .then(() => {
                this.$toast.success("登录成功");
                // 保存登录状态
                this.loginAction(res.data.userInfo);
                // this.$router.push("/");
                this.$router.go(-1);
              })
              .catch(err => {
                this.$toast.fail("保存登录状态失败");
                console.log(err);
              });
          } else {
            this.$toast.fail("登录失败");
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast.fail("登录失败");
        });
    }
    // 退出登录
  }
};
</script>
<style lang="scss" scoped>
</style>