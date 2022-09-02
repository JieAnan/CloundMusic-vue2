<template>
  <div>
    <TopNav />
    <Swiper />
    <IconList />
    <MusicList />
    <div class="pink"></div>
  </div>
</template>

<script>

import TopNav from "@/components/home/TopNav.vue"
import Swiper from "@/components/home/Swiper.vue"
import IconList from "@/components/home/iconList.vue"
import MusicList from "@/components/home/MusicList.vue"

export default {
  name: 'Home',
  mounted () {
    if (localStorage.getItem('LoginToken')) {
      this.$store.commit('CHANGELOGIN', true);
      this.$store.commit('CHANGEITEM', 1);
    }
  },
  components: {
    TopNav,
    Swiper,
    IconList,
    MusicList,
  }
}
</script>


<style lang="less">
.pink {
  width: 100%;
  height: 240px;
  background-color: pink;
}
</style>
