<template>

  <div class="footer">

    <!-- 背景盒子 -->
    <img class="footer-bgimg" :src="currentMusic.al.picUrl" alt="">

    <!-- 左边部分 -->
    <div class="footer-left" @click="dispalyDetail">
      <img :src="currentMusic.al.picUrl" alt="">
    </div>

    <!-- 中间部分 -->
    <div class="footer-center" @click="dispalyDetail">
      <Vue3Marquee>
        <span class="center-name">{{ currentMusic.name }} — </span>
        <span class="center-auther">{{ currentMusic.ar[0].name }}</span>
      </Vue3Marquee>
    </div>

    <!-- 右边部分 -->
    <div class="footer-right">

      <!-- 未播放状态 -->
      <svg v-show="!isplay" class="icon icon-left" aria-hidden="true" @click="playMusic">
        <use xlink:href="#icon-bofang1"></use>
      </svg>

      <!-- 播放状态 -->
      <svg v-show="isplay" class="icon icon-left" aria-hidden="true" @click="pauseMusic">
        <use xlink:href="#icon-zanting"></use>
      </svg>

      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-playlistHeart2"></use>
      </svg>
    </div>

    <!-- <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${currentMusic.id}.mp3`"></audio> -->
    <!-- 发现一个问题就是h5标签audio里的src属性如果动态绑定的话，无法播放。必须采用赋值的方法 -->
    <!-- this.$refs.audio.src = `../uipRecord${res.data.fileName}`-->

    <audio ref="radio">
      <source :src="getUrl(currentMusic.id)" type="audio/mpeg">
    </audio>

    <van-popup v-model:show="detailShow" position="bottom" :style="{ height: '100%' }">
      <!-- 子组件向父组件通信 -->
      <MusicDetail :music="currentMusic" :playMusic="playMusic" :pauseMusic="pauseMusic" :isplay="isplay" :addTotalTime="addTotalTime" :dispalyDetail="dispalyDetail" />
    </van-popup>

  </div>

</template>

<script>
import { mapGetters } from 'vuex';
import MusicDetail from "@/components/item/MusicDetail";

export default {
  name: "FooterMusic",
  components: {
    MusicDetail,
  },

  data () {
    return {
      // 接收返回的定时器id
      interval: 0,
    }
  },

  mounted () {
    let musicListId = 171037362;
    let obj = { id: musicListId, isPlaying: false, playIndex: 0 };

    this.$store.dispatch('getMusicList', obj);
    if (this.isplay == true) {
      clearInterval(this.interval);   // 清除当前时间
      this.updatePlayTime();          // 传递当前播放时间
    }
    this.addTotalTime();             // 传递歌曲时长
  },

  // updated负责对音乐控制播放和暂停，其余地方只负责更新数据。
  updated () {

    // 在updated中进行逻辑判断
    if (this.isplay == true) {
      let url = this.getUrl(this.currentMusic.id);
      if (this.$refs.radio.src != url) {  // 判断是否为一首歌进行播放/暂停。
        this.$refs.radio.src = url;
      }
      this.$refs.radio.play();
      clearInterval(this.interval);   // 清除当前时间
      this.updatePlayTime();          // 传递当前播放时间
      this.addTotalTime();           // 传递歌曲时长

    }
    else {
      this.$refs.radio.pause();       // 当前为歌单播放/暂停。
      clearInterval(this.interval);   // 清除当前时间
      // this.interval = 0;
    }
  },

  computed: {
    ...mapGetters(["playList", "playIndex", "isplay", "detailShow"]),

    currentMusic () {
      return this.playList[this.playIndex];
    },
  },

  methods: {

    // 1.播放音乐，发送请求设置播放isplay属性
    playMusic () {
      this.$store.commit('CHANGEISPLAY');
    },

    // 1.暂停音乐，发送请求设置播放isplay属性
    pauseMusic () {
      this.$store.commit('CHANGEISPLAY');
    },

    // 2.传入歌曲id，返回对应url
    getUrl (musicId) {
      return `https://music.163.com/song/media/outer/url?id=${musicId}.mp3`;
    },

    // 3.展示详情页
    dispalyDetail () {
      this.$store.commit('CHANGEDETAIL');
    },

    // 4.获取当前radio的播放时间
    updatePlayTime () {
      // 每隔一秒钟发送当前播放时间

      this.interval = setInterval(() => {
        console.log('我在footer组件中每隔1s发送播放进度ing');
        let time = this.$refs.radio.currentTime;
        this.$store.commit('updateCurrentTime', time);
      }, 1000);

    },

    // 5.向vuex发送当前radio音乐的总时长
    addTotalTime () {

      // 加一个延迟器防止radio数据为空
      setTimeout(() => {
        let time = parseFloat(this.$refs.radio.duration);
        this.$store.commit('setCurrentTime', time.toFixed(2));
      }, 500)
    }
  },
}

</script>


<style lang="less" scoped>
.footer {
  width: 94%;
  height: 1rem;
  position: fixed;
  bottom: 0.2rem;
  left: 3%;

  border-radius: 0.46rem;
  padding-left: 1.2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  // 背景颜色部分
  .footer-bgimg {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 1rem;
    border-radius: 0.46rem;
    background-position: 100 500;
    z-index: -1;
    filter: blur(0px) contrast(0.01);
  }

  // 左边音乐图标部分
  .footer-left {
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 0.32rem;

    img {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 0.32rem;
    }
  }

  .footer-center {
    width: 60%;
    height: 1rem;
    line-height: 1rem;
    margin-left: 0.2rem;
    // 设置不允许换行

    span {
      color: #fff;
      opacity: 0.8;
      // letter-spacing: 0.03rem;
      font-size: 0.26rem;
    }
  }

  .footer-right {
    .icon-left {
      margin-left: -1.8rem;
      margin-right: 0.48rem;
      width: 0.54rem;
      height: 0.54rem;
    }
  }
}
</style>