<template>

  <div class="top">
    <img :src="playdesc.coverImgUrl" alt="" class="topimg">

    <!-- 1.header头部部分 -->
    <div class="header">

      <!-- top左边部分 -->
      <div class="itemLeft">
        <svg class="icon" aria-hidden="true" @click="goBack()">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span>歌单</span>
      </div>

      <!-- top右边部分 -->
      <div class="itemright">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo1"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-19"></use>
        </svg>
      </div>
    </div>

    <!-- 2.playdesc歌单描述信息 -->
    <div class="playdesc">

      <!-- t图片右上部分的播放量显示 -->
      <span class="playCount">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-playCircle"></use>
        </svg>
        {{getNum ()}}
      </span>

      <img class="playdesc-img" :src="playdesc.coverImgUrl" alt="">

      <!-- 主要包含：tag 作者 歌单描述 三部分 -->
      <div class="playdesc-content">

        <div class="content-tag">
          <span v-for="(item,index) in playdesc.tags" :key="index">{{item}}</span>
        </div>

        <div class="content-auther">
          <img class="auther-img" :src=auther.backgroundUrl alt="">
          <span class="auther-name">{{auther.nickname}}</span>
        </div>

        <p class="content-desc">{{playdesc.description}}</p>

      </div>

    </div>

    <!-- 3.playdetail歌单动态信息 -->
    <div class="playdetail">
      <div class="item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pinglun"></use>
        </svg>
        <span>{{playdetail.commentCount}}</span>
      </div>
      <div class="item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span>{{playdetail.shareCount}}</span>
      </div>
      <div class="item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-w_xiazai"></use>
        </svg>
        <span>下载</span>
      </div>
      <div class="item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xuanze-duoxuan-tianchong"></use>
        </svg>
        <span>多选</span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "ItemMusicTop",
  props: ['playdesc', "playdetail", "auther"],
  methods: {
    // 0.数据的播放量换算为 万 为单位的数据。
    getNum () {
      let Count = this.playdesc.playCount;
      // 判断是否过亿
      if (Count / 10000 > 10000) {
        return (Count / 100000000).toFixed(1) + "亿";
      } else {
        return (Count / 10000).toFixed(1) + "万";
      }
    },
    // 1.点击头部返回标签，回到对应首页。
    goBack () {
      this.$router.go(-1);            //不需要重新刷新数据
      // this.$router.push('/');     //需要重新刷新数据
      // 清空数据:此处不能操作该props值。
      // this.playdesc = {};
    },
  },

}
</script>

<style lang="less">
// 最外层大盒子，设置img颜色
.top {
  position: relative;
  width: 100%;
  // height: 6.37rem;
  // top盒子开启BFC模式。
  overflow: hidden;
  // border-bottom: 1px solid pink;

  // 背景图片
  .topimg {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    // padding: 0.2rem;
    z-index: -1;
    // 虚化背景图片
    filter: blur(50px);
  }

  // 1.头部部分
  .header {
    width: 100%;
    position: fixed;
    // z-index: 100;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .itemLeft {
      margin-left: 0.2rem;
      display: flex;
      align-items: center;
      .icon {
        width: 0.55rem;
        height: 0.6rem;
        margin-right: 0.2rem;
        fill: #fff;
      }
      span {
        font-size: 0.35rem;
        color: #fff;
      }
    }
    .itemright {
      width: 20%;
      // margin-right: 0.2rem;
      display: flex;
      align-items: center;
      .icon {
        font-size: 0.5rem;
        margin-right: 0.26rem;
        fill: #fff;
        color: #fff;
      }
    }
  }

  // 2.歌单详情 playdesc
  .playdesc {
    margin-top: 1rem;
    position: relative;
    width: 100%;
    // height: 4rem;
    padding: 0.1rem 0.2rem 0px;
    overflow: hidden;

    // 播放量进行绝对定位到右上角
    .playCount {
      position: absolute;
      left: 1.4rem;
      top: 0.25rem;
      color: #fff;
      opacity: 0.9;
      font-size: 0.24rem;
      display: flex;
      align-items: center;
      .icon {
        margin-right: 0.1rem;
        width: 0.35rem;
        height: 0.35rem;
      }
    }

    .playdesc-img {
      float: left;
      width: 40%;
      height: 3rem;
      border-radius: 0.3rem;
    }

    .playdesc-content {
      // 开启bfc模式
      overflow: hidden;
      padding-left: 0.4rem;

      .content-tag {
        margin-left: 0.4rem;
        margin-bottom: 0.1rem;
        width: 80%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        span {
          float: left;
          // width: 30%;
          font-size: 0.3rem;
          height: 0.4rem;
          line-height: 0.4rem;
          text-align: center;
          border-radius: 0.1rem;
          padding: 0.05rem;
          color: #fff;
          // backdrop-filter: blur(2px);
        }
      }

      .content-auther {
        margin-top: 0.2rem;
        width: 100%;
        height: 0.7rem;
        display: flex;
        justify-content: center;
        align-items: center;

        .auther-img {
          width: 0.55rem;
          height: 0.55rem;
          border-radius: 50%;
          margin-right: 0.2rem;
        }
        .auther-name {
          margin-top: 0rem;
          font-size: 0.26rem;
          color: #fff;
          opacity: 0.8;
        }
      }
      .content-desc {
        margin-top: 0.1rem;
        width: 100%;
        height: 1.5rem;
        font-size: 0.24rem;
        color: #fff;
        opacity: 0.3;
        overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
        // background-color: pink;
      }
    }
  }

  // 3.歌单动态 playdetail
  .playdetail {
    padding: 0.4rem 0.3rem 0.7rem;
    width: 100%;
    display: flex;
    justify-content: space-between;

    .item {
      width: 25%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      .icon {
        width: 0.8rem;
        height: 0.8rem;
        fill: #fff;
        opacity: 0.8;
        margin-bottom: 0.2rem;
      }
      span {
        font-size: 0.3rem;
        color: #fff;
        opacity: 0.8;
      }
    }
  }
}
</style>   