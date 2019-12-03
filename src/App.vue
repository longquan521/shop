<template>
  <div id="app">
    <!-- 包进去就能产生缓存效果 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

    <!-- 用van插件写的那部分挪到了ccomponents的插件里了 -->
    <!-- <FooterBar></FooterBar> -->
    <router-view name="footer-bar"></router-view>
  </div>
</template>
<script>
// import FooterBar from "@/components/FooterBar.vue";
export default {
  // components: { FooterBar }
};
</script>
<style lang="scss">
</style>
