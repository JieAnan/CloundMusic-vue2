<template>
  <div class="topNav">

    <!-- 部分1： -->
    <div class="top-left">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gengduo"></use>
      </svg>
    </div>

    <!-- 部分2 -->
    <div class="top-cotent">
      <span :class="{active:homeItem==0}" @click="goUser">我的</span>
      <span :class="{active:homeItem==1}" @click="goHome">发现</span>
      <span :class="{active:homeItem==2}">云村</span>
      <span :class="{active:homeItem==3}">视频</span>
    </div>

    <!-- 部分3 -->
    <div class="top-right" @click="goSearch">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo1"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "TopNav",
  computed: {
    ...mapGetters(['homeItem'])
  },
  methods: {

    // 点击搜索框，进行搜索页面跳转。
    goSearch () {
      this.$router.push('/search');
    },

    // 点击我的，进入个人中心。
    goUser () {
      this.$router.push('/user');
      this.$store.commit('CHANGEITEM', 0);
    },

    // 点击发现，进入主页。
    goHome () {
      this.$router.push({ name: "home" });
      this.$store.commit('CHANGEITEM', 1);
    }
  }
}
</script>

<style lang="less" scoped>
.topNav {
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  background-color: #fff;
  // 设置为弹性盒子
  display: flex;
  // 设置子盒子的水平布局
  justify-content: space-between;
  // 设置子盒子的垂直布局
  align-items: center;

  .top-cotent {
    width: 65%;
    height: 100%;
    // 设置为flex布局，其子元素为弹性子盒子。
    display: flex;
    justify-content: space-around;
    // align-items: center;
    font-size: 0.36rem;

    .active {
      font-weight: 700;
    }
  }

  .top-right {
    .icon {
      width: 0.45rem;
      height: 0.45rem;
    }
  }
}
</style>