<template>
  <div class="musiclist">

    <div class="music-top">
      <div class="title">发现好歌单</div>
      <div class="more">发现更多</div>
    </div>

    <div class="music-vedio">
      <van-swipe :loop="false" :width="125" class="my-swiper" :show-indicators="false">
        <van-swipe-item v-for="item in Lists" :key="item.id" @click="goItem(item)">

          <img :src="item.picUrl" alt="">

          <span class="playCount">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-erji"></use>
            </svg>
            {{getNum (item)}}
          </span>

          <span class="name">{{item.name}}</span>
        </van-swipe-item>
      </van-swipe>
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: 'MusicList',
  // 获取视频数据
  mounted () {
    this.$store.dispatch('getPersonalizedList', 10);
  },
  computed: {
    // 释放数据
    ...mapState({
      Lists: state => state.home.personalizedlist || [],
    }),
  },
  methods: {
    // 将每条数据的播放量换算为 万 为单位的数据。
    getNum (item) {
      // 判断是否过亿
      if (item.playCount / 10000 > 10000) {
        return (item.playCount / 100000000).toFixed(1) + "亿";
      } else {
        return (item.playCount / 10000).toFixed(1) + "万";
      }
    },

    // 路由跳转,携带参数 item
    goItem (item) {
      let itemId = item.id;
      // 需要显示在地址栏  ？id=1256341  ，使用query方式传参。
      this.$router.push({ name: 'itemMusic', query: { id: itemId } });
    }
  },

}
</script>



<style lang="less">
.musiclist {
  width: 100%;
  // height: 5rem;
  padding: 0.2rem;

  .music-top {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
      font-size: 0.3rem;
    }
  }

  .music-vedio {
    width: 100%;
    height: 3rem;
    padding: 0px;

    .my-swiper {
      position: relative;
      height: 100%;

      .van-swipe-item {
        padding-right: 00.2rem;
        height: 2.5rem;
      }

      img {
        width: 100%;
        height: 2.2rem;
        border-radius: 0.2rem;
      }
      // 播放量进行绝对定位到右上角
      .playCount {
        position: absolute;
        right: 0.25rem;
        top: 0.09rem;
        color: #fff;
        opacity: 0.9;
        font-size: 0.24rem;
        display: flex;
        align-items: center;
        .icon {
          width: 0.3rem;
          height: 0.3rem;
          margin-right: 0.1rem;
        }
      }
      .name {
        width: 2rem;
        height: 0.64rem;
        text-align: center;
        font-size: 0.1rem;
        color: rgb(96, 92, 92);
        overflow: hidden;
      }
    }
  }
}
</style>