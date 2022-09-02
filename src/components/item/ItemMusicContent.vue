<template>
  <div class="content">

    <!-- 头部区域 -->
    <div class="content-header">

      <!-- 左边部分 -->
      <div class="header-left" @click="addPlayList()">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
      </div>

      <!-- 中间文字 -->
      <div class="header-center" @click="addPlayList()">
        <span class="center-text">播放全部</span>
        <span class="center-num">
          (共<span>{{playdesc.trackCount}}</span>首)
        </span>
      </div>

      <!-- 右边收藏 -->
      <div class="header-right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shoucang"></use>
        </svg>
        <span class="right-text">收藏</span>
        <span class="right-num">
          (<span>{{subscriber}}</span>)
        </span>
      </div>
    </div>

    <!-- 音乐列表部分 -->
    <div class="content-list">
      <div @click="addPlayItem(index)" class="list-item" v-for="(song,index) in playsongs" :key="song.id">
        <span class="item-index">{{index+1}}</span>
        <div class="item-music">

          <p class="music-name">{{song.name}}</p>

          <div class="music-auther">
            <span v-for="auther in song.ar" :key="auther.id">
              {{auther.name}}
            </span>
          </div>
        </div>
        <div class="item-vedio" v-if="song.mv != 0">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shipin"></use>
          </svg>
        </div>
        <div class="item-more">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gengduo"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemMusicContent",
  props: ["playdesc", 'playsongs'],

  mounted () {
    // 从首页点进来的逻辑：不能中断之前播放的歌曲，同时点击当前的歌曲可以进行播放。
    // this.addPlayList();
  },

  computed: {
    // 歌单收藏人数 
    subscriber () {

      if (this.playdesc.subscribedCount < 1000) {
        return this.playdesc.subscribedCount;
      }
      else if (this.playdesc.subscribedCount / 10000 < 100) {
        return (this.playdesc.subscribedCount / 10000).toFixed(1) + "万";
      }
      else {
        return "100万+";
      }
    }
  },

  methods: {

    // 点击播放全部：将当前歌单替换为播放列表。
    addPlayList () {
      let musicId = this.$route.query.id;
      // isPlaying 为 true表示加载完成自动播放index的歌曲
      let obj = { id: musicId, isPlaying: true, playIndex: 0 };
      this.$store.dispatch('getMusicList', obj);
    },

    // 点击歌单的歌曲：将当前点击的音乐添加到待当前播放列表中
    addPlayItem (index) {

      // 第一次点击歌曲时候，将歌曲列表进行更新
      let musicId = this.$route.query.id;
      // isinit为true表示类似home加载歌单，不会自动播放。
      let obj = { id: musicId, isPlaying: true, playIndex: index };

      this.$store.dispatch('getMusicList', obj);
    }
  },
}
</script>

<style lang="less">
.content {
  margin-top: -0.35rem;
  width: 100%;
  height: 700px;
  background-color: #fff;
  border-radius: 0.4rem;

  // 头部区域
  .content-header {
    position: relative;
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    border-bottom: 1px solid purple;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-left {
      display: flex;
      align-items: center;
      margin-left: 0.2rem;
      margin-right: 0.3rem;
      .icon {
        width: 0.7rem;
        height: 0.7rem;
      }
    }

    .header-center {
      margin-left: -1rem;
      .center-text {
        font-size: 0.32rem;
        font-weight: 550;
      }
      .center-num {
        font-size: 0.28rem;
        color: #cdcdd6;
      }
    }

    .header-right {
      width: 35%;
      margin-right: 0.2rem;
      height: 0.8rem;
      background-color: #ff1800;
      border-radius: 0.5rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0px 0.2rem;
      color: #fff;
      font-size: 0.28rem;
      .icon {
        width: 0.5rem;
        height: 0.5rem;
      }
    }
  }

  // 循环部分，对歌曲进行循环处理。
  // 注意 if 与for 在 视频按钮时候共用。
  .content-list {
    .list-item {
      position: relative;
      width: 100%;
      height: 1.3rem;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      // 子元素默认颜色
      color: #bbbec5;

      .item-index {
        width: 10%;
        margin-left: 0.2rem;
        font-size: 0.36rem;
        text-align: center;
      }

      .item-music {
        display: flex;
        width: 50%;
        flex-direction: column;
        justify-content: space-between;
        // 左对齐
        align-items: flex-start;
        margin-left: 0.2rem;

        .music-name {
          width: 100%;
          color: #333;
          margin-bottom: 0.1rem;
          font-weight: 700;
          // 单行超出文字隐藏
          overflow: hidden; /* 超出一行文字自动隐藏 */
          text-overflow: ellipsis; /*文字隐藏后添加省略号*/
          white-space: nowrap; /*强制不换行*/
        }
        .music-auther {
          font-size: 0.24rem;
          width: 100%;
          // 防止多个名字
          // 单行超出文字隐藏
          overflow: hidden; /* 超出一行文字自动隐藏 */
          text-overflow: ellipsis; /*文字隐藏后添加省略号*/
          white-space: nowrap; /*强制不换行*/
          span {
            width: 50%;
            margin-right: 0.2rem;
            // 防止单个名字过长
            // 单行超出文字隐藏
            overflow: hidden; /* 超出一行文字自动隐藏 */
            text-overflow: ellipsis; /*文字隐藏后添加省略号*/
            white-space: nowrap; /*强制不换行*/
          }
        }
      }

      .item-vedio {
        margin-left: 0.3rem;
      }

      .item-more {
        position: absolute;
        top: 0.32rem;
        right: 0.5rem;
        // margin-left: 0.8rem;
        .icon {
        }
      }
    }
  }
}
</style>