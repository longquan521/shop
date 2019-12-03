import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      // userName: "未登录"
    }
  },
  mutations: {
    // 改变数据的唯一途径，不处理异步
    changeLogin(state, status) {
      state.userInfo = status;
    }
  },
  actions: {
    // 可以做异步,可以调用mutation
    loginAction({ commit }, user) {
      commit("changeLogin", user)
    }
  },
  getters: {

  }
})
