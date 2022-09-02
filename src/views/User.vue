<template>
  <div>
    <TopNav />
    我是个人中心
    <div class="tuichu" @click="logOut">退出登录</div>
  </div>
</template>

<script>

import TopNav from "@/components/home/TopNav.vue"
export default {
  methods: {
    logOut () {
      // 取消本地的token
      localStorage.clear('LoginToken');
      // 发送请求重置登录状态
      this.$store.commit('CHANGELOGIN', false);
      // 定位到登录页面
      this.$router.push('/login');
    }
  },
}
</script>

<style lang="less" scoped>
.tuichu {
  float: right;
  text-align: center;
  width: 1.6rem;
  height: 0.6rem;
  line-height: 0.6rem;
  margin-right: 0.4rem;
  background-color: #ccc;
}
</style>