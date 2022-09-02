
<template>
  <div>
    <!-- 路由出口 -->
    <router-view />
    <!-- 全局组件 FooterMusic -->
    <FooterMusic v-show="this.$route.path !='/login'" />
  </div>

</template>


<script>
</script>


<style lang="less">
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

li {
  list-style-type: none;
}

// 设置所有的icon大小
.icon {
  width: 0.5rem;
  height: 0.5rem;
  fill: currentColor;
  overflow: hidden;
}
</style>
