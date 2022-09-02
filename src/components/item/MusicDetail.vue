<template>
  <div class="father">
    <!-- 背景颜色 -->
    <img :src="music.al.picUrl" alt="" class="bgimg">

    <div class="detail-top">

      <div class="top-left">
        <svg class="icon" aria-hidden="true" @click="dispalyDetail">
          <use xlink:href="#icon-xiala1">
          </use>
        </svg>
      </div>

      <div class="top-center">
        <span>推荐</span>|<span :class="{'active':!showLyric}" @click="showLyric = false">歌曲</span>|<span :class="{'active':showLyric}" @click=" showLyric=true">歌词</span>
      </div>

      <div class="top-right">
        <svg class="icon left" aria-hidden="true">
          <use xlink:href="#icon-zhibo1"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang1"></use>
        </svg>
      </div>

    </div>

    <!-- 显示详情页 -->
    <div v-if="!showLyric" class="show-detail">
      <div class="detail-cipan">

        <!-- <img ref="cizheng" class="img-zhizheng" src="@/assets/zhizheng.png" alt=""> -->
        <img class="img-zhizheng" :class="{'img-zhizheng-active':isplay}" src="@/assets/zhizheng.png" alt="">

        <div class="img-bg">
          <img class="img-cipan" src="@/assets/cipan.png" alt="">
          <img ref="imgurl" class="img-url" :class="{'img-url-active':isplay,'img-url-paused':!isplay}" :src="music.al.picUrl" alt="">
        </div>
      </div>

      <div class="detail-center">

        <!-- 描述部分 -->
        <div class="center-desc">

          <!-- 左边的跑马灯+ tag -->
          <div class="desc-left">
            <p class="left-name">
              <Vue3Marquee style="color:#fff">
                <span>{{music.name}} — </span>
                <span>{{music.ar[0].name}} </span>
              </Vue3Marquee>
            </p>
            <p class="left-tag">
              <span class="tag1">关注</span>
              <span class="tag2">标准</span>
              <span class="tag3">视频</span>
            </p>
          </div>
          <!-- 右边的红心 -->
          <div class="desc-right">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-aixin"></use>
            </svg>
          </div>

        </div>
        <!-- 歌词部分 -->
        <p class="center-word">你问我爱你有多深</p>

      </div>

      <div class="detail-bottom">
        <div class="bottom-tag">
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-huatong">
              </use>
            </svg>
            <p>99+</p>
          </span>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yinxiao">
              </use>
            </svg>
            <p>off</p>
          </span>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiazai1">
              </use>
            </svg>
          </span>
          <span>
            <svg class="icon " aria-hidden="true">
              <use xlink:href="#icon-huihua-copy">
              </use>
            </svg>
            <p class="review">1w+</p>
          </span>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-more">
              </use>
            </svg>
          </span>
        </div>
        <div class="bottom-play">

          <input ref="jindu" type="range" class="jingdu" v-model="currentTime" min="0" :max="parseFloat(totalTime)" step="0.05">

          <p class="play-time">
            <span class="time-left">{{showCurrentTime}}</span>
            <span class="time-right">{{showTotalTime}}</span>
          </p>
          <div class="play-item">
            <svg class="icon" aria-hidden="true" @click="changeIndex(0)">
              <use xlink:href="#icon-suijibofang">
              </use>
            </svg>
            <svg class="icon control" aria-hidden="true" @click="changeIndex(-1)">
              <use xlink:href="#icon-shangyishou">
              </use>
            </svg>

            <!-- 播放和暂停切换 -->
            <svg v-if="isplay" class="icon play" aria-hidden="true" @click="pauseMusic">
              <use xlink:href="#icon-zanting">
              </use>
            </svg>
            <svg v-else class="icon play" aria-hidden="true" @click="playMusic">
              <use xlink:href="#icon-bofang1">
              </use>
              <!-- 播放和暂停切换 -->

            </svg>
            <svg class="icon control" aria-hidden="true" @click="changeIndex(1)">
              <use xlink:href="#icon-xiayishou">
              </use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yinleliebiao">
              </use>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 显示歌词页面 -->
    <div v-else class="show-Lyric">
      <!-- 顶部描述 -->
      <div class="detail-center">
        <!-- 描述部分 -->
        <div class="center-desc">

          <!-- 左边的跑马灯+ tag -->
          <div class="desc-left">
            <p class="left-name">
              <Vue3Marquee style="color:#fff">
                <span>{{music.name}} — </span>
                <span>{{music.ar[0].name}} </span>
              </Vue3Marquee>
            </p>
            <p class="left-tag">
              <span class="tag1">关注</span>
              <span class="tag2">标准</span>
              <span class="tag3">视频</span>
            </p>
          </div>
          <!-- 右边的红心 -->
          <div class="desc-right">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-aixin"></use>
            </svg>
          </div>

        </div>

      </div>

      <!-- 歌词部分 -->
      <div class="detail-lyric" ref="lyricBox">
        <!-- v-for 不建议和v-if连用，每次都会v-for渲染出组件才会使用v-if -->
        <p :class="{'active':isShowCurrent(item)}" v-for="(item,index) in splitLyric" :key="index">
          {{item.word}}
        </p>

      </div>

      <!-- foot部分tag -->
      <div class="detail-bottom">
        <div class="bottom-tag">
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-huatong">
              </use>
            </svg>
            <p>99+</p>
          </span>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yinxiao">
              </use>
            </svg>
            <p>off</p>
          </span>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiazai1">
              </use>
            </svg>
          </span>
          <span>
            <svg class="icon " aria-hidden="true">
              <use xlink:href="#icon-huihua-copy">
              </use>
            </svg>
            <p class="review">1w+</p>
          </span>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-more">
              </use>
            </svg>
          </span>
        </div>

        <div class="bottom-play">

          <input ref="jindu" type="range" class="jingdu" v-model="currentTime" min="0" :max="parseFloat(totalTime)" step="0.001">

          <p class="play-time">
            <span class="time-left">{{showCurrentTime}}</span>
            <span class="time-right">{{showTotalTime}}</span>
          </p>
          <div class="play-item">
            <svg class="icon" aria-hidden="true" @click="changeIndex(0)">
              <use xlink:href="#icon-suijibofang">
              </use>
            </svg>
            <svg class="icon control" aria-hidden="true" @click="changeIndex(-1)">
              <use xlink:href="#icon-shangyishou">
              </use>
            </svg>

            <!-- 播放和暂停切换 -->
            <svg v-if="isplay" class="icon play" aria-hidden="true" @click="pauseMusic">
              <use xlink:href="#icon-zanting">
              </use>
            </svg>
            <svg v-else class="icon play" aria-hidden="true" @click="playMusic">
              <use xlink:href="#icon-bofang1">
              </use>
              <!-- 播放和暂停切换 -->

            </svg>
            <svg class="icon control" aria-hidden="true" @click="changeIndex(1)">
              <use xlink:href="#icon-xiayishou">
              </use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yinleliebiao">
              </use>
            </svg>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "MusicDetail",
  data () {
    return {
      showLyric: false,
      // 用于updated发送请求时候判断是否为同一首歌曲，防止陷入死循环
      musicId: 0,
    }
  },
  props: ["music", "playMusic", "pauseMusic", "isplay", "addTotalTime", "dispalyDetail"],

  watch: {

    currentTime: {
      handler (newValue, oldValue) {
        let activeP = document.querySelector("p.active");
        if (activeP && activeP.offsetTop > 367) {
          // 动态设置父盒子的滚动距离：scrollTop=当前高度-367.
          this.$refs.lyricBox.scrollTop = activeP.offsetTop - 367;
        }
        if (newValue + 1 >= this.totalTime) {
          console.log('开始下一首播放');
          this.changeIndex(1);
        }
      }
    }
  },
  computed: {
    ...mapGetters(['splitLyric', "currentTime", "totalTime"]),

    // 计算时间显示：其中进度条默认为毫秒。
    showTotalTime () {
      let temp = (this.totalTime / 60) + "";
      let min = temp.slice(0, 1);
      let mill = (this.totalTime / 60) - parseInt(this.totalTime / 60);
      mill = parseInt((mill * 60));
      mill = mill < 10 ? '0' + mill : mill;
      return "0" + min + ":" + mill;
    },
    showCurrentTime () {
      let temp = (this.currentTime / 60) + "";
      let min = temp.slice(0, 1);
      let mill = (this.currentTime / 60) - parseInt(this.currentTime / 60);
      mill = parseInt((mill * 60));
      mill = mill < 10 ? '0' + mill : mill;
      return "0" + min + ":" + mill;
    },

  },

  mounted () {
    this.$store.dispatch('getMusicLyric', this.music.id);
    this.addTotalTime();
  },

  updated () {
    // 获取歌词，要避免死循环，请求数据时候进行判断。
    if (this.music.id != this.musicId) {
      this.$store.dispatch('getMusicLyric', this.music.id);
      this.musicId = this.music.id;         // 切换新歌曲
      // 判断是否进入歌词界面
      if (this.showLyric) {
        // 第一首歌播放完毕进入第二首歌需要进行重置scrollTop高度。
        this.$refs.lyricBox.scrollTop = 0;
      }
      this.addTotalTime();
    }
    // this.showTotalTime();
  },

  methods: {
    // 发送请求：将index传递给vuex，并进行播放。
    changeIndex (value) {
      this.$store.commit('CHANGEINDEXMUSIC', value);
    },
    // 对当前歌词样式进行判断
    isShowCurrent (item) {
      if (item.millTime <= (this.currentTime * 1000) && (this.currentTime * 1000) < item.nextTime) {
        return true;
      }
      return false;
    },
  },

}
</script>

<style lang="less">
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: -1;
  filter: blur(1.6rem);
}
.detail-top {
  margin: 0.4rem 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.6rem;
  line-height: 0.6rem;
  .icon {
    width: 0.5rem;
    height: 0.5rem;
  }
  .top-left {
    height: 0.6rem;
    line-height: 0.6rem;
  }
  .top-center {
    color: rgb(137, 135, 135);
    margin-left: 1.2rem;
    span {
      padding: 0 0.15rem;
      font-size: 0.3rem;
    }
    .active {
      color: #ffff;
      opacity: 0.8;
    }
  }
  .top-right {
    height: 0.6rem;
    line-height: 0.6rem;
    .icon {
      margin-left: 0.1rem;
      margin-right: 0.1rem;
    }
    .left {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}

// detail部分
.show-detail {
  .detail-cipan {
    width: 88%;
    height: 6rem;
    // background-color: pink;
    margin-left: 6%;
    position: relative;
    overflow: hidden;

    .img-bg {
      position: absolute;
      left: 50%;
      bottom: 0px;
      width: 5rem;
      height: 5rem;
      transform: translateX(-50%);
      // 为子盒子布局
      display: flex;
      .img-cipan {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 5rem;
        height: 5rem;
      }
      .img-url {
        width: 3.1rem;
        height: 3.1rem;
        border-radius: 50%;
        margin: auto;
        // 将动画设置到属性上面。
        animation: rotate_ar 10s linear infinite;
      }
      .img-url-active {
        animation-play-state: running;
      }
      .img-url-paused {
        animation-play-state: paused;
      }

      @keyframes rotate_ar {
        0% {
          transform: rotateZ(0deg);
        }
        100% {
          transform: rotateZ(360deg);
        }
      }
    }
    // 暂停时候磁针样式
    .img-zhizheng {
      position: absolute;
      top: -0.5rem;
      left: 55%;
      width: 2.8rem;
      height: 4.4rem;
      // 旋转角度
      transform-origin: 0 0;
      transform: rotate(72deg);
      // 方法一：可以直接通过refs属性进行修改rotate(75deg)
      transition: all 1s;
      z-index: 100;
    }
    // 播放时候磁针样式：动态绑定磁针样式
    .img-zhizheng-active {
      position: absolute;
      top: -0.5rem;
      left: 55%;
      width: 2.8rem;
      height: 4.4rem;
      // 旋转角度
      transform-origin: 0 0;
      transform: rotate(60deg);
      transition: all 1s;
      z-index: 100;
    }
  }

  .detail-center {
    width: 88%;
    margin: 0.8rem 6% 0px;

    .center-desc {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .desc-left {
        width: 60%;
        .left-name {
          width: 80%;
          height: 0.6rem;
          line-height: 0.6rem;
          font-size: 0.32rem;
        }
        .left-tag {
          margin-top: 0.2rem;
          width: 70%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          span {
            background-color: #fff;
            font-size: 0.28rem;
            padding: 0.04rem;
            text-align: center;
          }
          .tag1 {
            border-radius: 0.1rem;
          }
          .tag2 {
            border-radius: 0.1rem;
            background-color: #4d4d4d;
            color: #fff;
          }
          .tag3 {
            border-radius: 0.1rem;
            background-color: #4d4d4d;
            color: #fff;
          }
        }
      }
      .desc-right {
        width: 30%;
        text-align: center;
        .icon {
          width: 0.7rem;
          height: 0.7rem;
          fill: #fff;
        }
      }
    }
    .center-word {
      width: 80%;
      height: 0.6rem;
      line-height: 0.6rem;
      margin: 0.4rem 0 0.2rem;
      color: #fff;
      opacity: 0.8;
      // background-color: pink;
    }
  }

  .detail-bottom {
    width: 88%;
    margin-left: 6%;
    margin-top: 1.2rem;
    .bottom-tag {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        position: relative;
        text-align: center;
        p {
          position: absolute;
          top: -0.16rem;
          left: -0.1rem;
          font-size: 0.24rem;
          transform: scale(0.9);
          color: #4d4d4d;
          border-radius: 0.1rem;
          opacity: 0.8;
        }
        .icon {
          width: 0.65rem;
          height: 0.65rem;
        }
        .review {
          top: -0.23rem;
        }
      }
    }
    .bottom-play {
      .jingdu {
        width: 100%;
        height: 3px;
        margin: 0.5rem 0px 0.3rem;
      }
      .play-time {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.4rem;
        span {
          color: #fff;
          opacity: 0.8;
        }
      }
      .play-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon {
          width: 0.6rem;
          height: 0.6rem;
        }
        .play {
          width: 1.2rem;
          height: 1.2rem;
        }
        .control {
          width: 0.75rem;
          height: 0.75rem;
        }
      }
    }
  }
}

// 歌词展示部分
.show-Lyric {
  .detail-center {
    width: 88%;
    margin: 0.8rem 6% 0px;

    .center-desc {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .desc-left {
        width: 60%;
        .left-name {
          width: 80%;
          height: 0.6rem;
          line-height: 0.6rem;
          font-size: 0.32rem;
        }
        .left-tag {
          margin-top: 0.2rem;
          width: 70%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          span {
            background-color: #fff;
            font-size: 0.28rem;
            padding: 0.04rem;
            text-align: center;
          }
          .tag1 {
            border-radius: 0.1rem;
          }
          .tag2 {
            border-radius: 0.1rem;
            background-color: #4d4d4d;
            color: #fff;
          }
          .tag3 {
            border-radius: 0.1rem;
            background-color: #4d4d4d;
            color: #fff;
          }
        }
      }

      .desc-right {
        width: 30%;
        text-align: right;
        margin-right: 0.3rem;
        .icon {
          width: 0.8rem;
          height: 0.8rem;
          fill: #fff;
        }
      }
    }
  }

  .detail-lyric {
    width: 100%;
    height: 7.5rem;
    margin-top: 0.4rem;
    overflow: scroll;
    // display: flex;
    // flex-direction: column;
    // justify-content: space-between;
    // align-items: center;

    p {
      display: block;
      text-align: center;
      width: 80%;
      height: 0.5rem;
      line-height: 0.5rem;
      margin: 0.13rem 10%;
      color: #fff;
      opacity: 0.7;
      letter-spacing: 0.02rem;
      overflow-x: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .active {
      // color: pink;
      font-size: 0.4rem;
      opacity: 1;
    }
  }

  .detail-bottom {
    position: absolute;
    bottom: 1.06rem;
    width: 88%;
    margin-left: 6%;
    margin-top: 1.2rem;

    .bottom-tag {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        position: relative;
        text-align: center;
        p {
          position: absolute;
          top: -0.16rem;
          left: -0.1rem;
          font-size: 0.24rem;
          transform: scale(0.9);
          color: #4d4d4d;
          border-radius: 0.1rem;
          opacity: 0.8;
        }
        .icon {
          width: 0.65rem;
          height: 0.65rem;
        }
        .review {
          top: -0.23rem;
        }
      }
    }

    .bottom-play {
      .jingdu {
        width: 100%;
        height: 3px;
        margin: 0.5rem 0px 0.3rem;
      }
      .play-time {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.4rem;
        span {
          color: #fff;
          opacity: 0.8;
        }
      }
      .play-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon {
          width: 0.6rem;
          height: 0.6rem;
        }
        .play {
          width: 1.2rem;
          height: 1.2rem;
        }
        .control {
          width: 0.75rem;
          height: 0.75rem;
        }
      }
    }
  }
}
</style>