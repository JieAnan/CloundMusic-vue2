<template>
  <div>
    <!-- 传递给子组件1  -->

    <ItemMusicTop :playdesc="playdesc" :playdetail="playdetail" :auther="auther" />

    <!-- 传递给子组件12  -->
    <ItemMusicContent :playdesc="playdesc" :playsongs=" playsongs" />

  </div>
</template>

<script>

import { mapState } from 'vuex';
import ItemMusicTop from "@/components/item/ItemMusicTop.vue";
import ItemMusicContent from "@/components/item/ItemMusicContent.vue"

export default {
  name: "ItemMusic",

  components: {
    ItemMusicTop,
    ItemMusicContent,
  },

  mounted () {
    console.log('我在父组件ItemMusic的mounted进行actions派发请求数据！');
    // 从路由参数获取id
    let itemId = this.$route.query.id;
    // 在vuex中发送数据，并进行存储： playdesc playdetail playsongs
    this.$store.dispatch("getMusicItem", itemId);
  },

  // 使用计算属性进行结构
  computed: {
    ...mapState({
      playdesc: state => state.musicItem.playdesc || {},
      playdetail: state => state.musicItem.playdetail || {},
      playsongs: state => state.musicItem.playsongs || [],
      auther: state => state.musicItem.auther || {},
    }),
  }
}
</script>

<style lang="less">
</style>