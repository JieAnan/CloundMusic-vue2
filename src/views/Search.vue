<template>
  <div class="search">

    <!-- 搜索栏顶部 -->
    <div class="father">
      <div class="search-top">

        <p class="top-left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-sousuo1"></use>
          </svg>
          <input type="text" v-model="searchKey" placeholder="星月神话" @keydown.enter="searchContent">
        </p>

        <span class="top-right" @click="goHome">
          取消
        </span>
      </div>
    </div>

    <div v-show="!isShowSearchResult" class="static">
      <!-- 搜索历史 -->
      <div class="search-history">
        <p class="his-title">
          搜索历史
          <span @click="isDelete=!isDelete">删除</span>
        </p>

        <ul class="his-content" @click="addSearch($event)">

          <li v-for="(item,index) in historyList" :key="index">
            {{item}}
            <span v-show="isDelete" @click="deleteItem(index)">x</span>
          </li>

        </ul>
      </div>

      <!-- 搜索热门 -->
      <div class="search-hot">
        <p class="hot-title">
          搜索发现
        </p>
        <ul class="hot-content" @click="addSearch($event)">
          <li v-for="(item,index) in searchKeyword" :key="index">
            {{item.first}}
          </li>
        </ul>
      </div>
    </div>

    <!-- 音乐列表部分 -->
    <div v-show="isShowSearchResult" class="content-list">
      <div @click="addPlayIndex(song,index)" class="list-item" v-for="(song,index) in searchSongs" :key="song.id">
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
  name:'Search',
  data() {
    return {
      // historyList:['张靓颖','再见莫妮卡','星月神话','胡歌','周深','莫文蔚','张雪迎','雅俗共赏'],
      historyList:[],    // 记录搜索历史
      searchSongs:[],    // 返回搜索结果
      searchKeyword:[],  // 推荐搜索关键字
      searchKey:'',      // input输出框内容
      isDelete:false,    // 是否开始删除历史内容
      isShowSearchResult:false,    // 是否显示搜索结果列表。

    }
  },
  mounted() {
    // 从本地localstorage获取到historyList，并进行赋值。
    this.historyList = JSON.parse(localStorage.getItem('historyList')) || [];
    // 获取搜索关键字
    this.getSearchKey();
  },
  methods: {
    // 0.路由返回
    goHome(){
      this.$router.go(-1);
    },

    // 1.开始搜索音乐
    searchContent(){
      // 将搜索内容push到当前列表historyList。
      if(this.searchKey.trim() != ''){
        // 将搜索数据进行保存。
          this.historyList.unshift(this.searchKey);
          // this.historyList = Array.from(new Set(this.historyList));
          this.historyList = [...new Set(this.historyList)];
          // 限制数组长度
          if(this.historyList.length > 12){
            this.historyList.splice(this.historyList.length-1,1);
          }
          localStorage.setItem('historyList',JSON.stringify(this.historyList))
        
        // 发送数据请求
        this.getSearchResult();
        
      }
      this.searchKey = '';
    },

    // 2.点击删除符号删除对应历史
    deleteItem(index){
      this.historyList.splice(index,1);
      localStorage.setItem('historyList',JSON.stringify(this.historyList))
    },

    // 3.通过ul元素来为每一个li进行事件代理，放置页面多个点击事件卡顿
    addSearch(e){
       if(e.target.nodeName == 'LI'){
          let value = e.target.innerHTML;
          this.searchKey = value.split(' ')[0];
          this.searchContent();
       }
    },
    // 4.发送服务器搜索数据请求 
    async getSearchResult(){
      let result = await this.$API.reqSearchResult(this.searchKey);
      if(result.code == 200){
        this.searchSongs = result.result.songs;
        this.isShowSearchResult = true;
      }
      else{
        return Promise.reject(new Error('搜索歌曲失败！'))
      }
    },
    // 5.发送请求获取 搜索关键字 建议
    async getSearchKey(){
      let result = await this.$API.reqSearchKeyword();
      if(result.code == 200){
        this.searchKeyword = result.result.hots;
      }else{
        return Promise.reject(new Error('返回搜索关键词失败！'))
      }
    },

    // 6.点击搜索歌曲，
    // ①.将当前点击的音乐添加到待当前播放列表末尾
    // ②.设置播放最后一首歌曲
    addPlayIndex (song,index) {
      // 先对song对象进行解析，形成符合播放列表歌曲的形式。
      let music = {};
      music.id = song.id;
      music.ar = song.ar;
      music.al = song.al;
      music.name = song.name;
      music.isplay = true;
      // 发送请求，在vuex中向播放列表添加新歌曲
      this.$store.commit('ADDSEARCHMUSIC',music);
    }
  },
}


</script>

<style lang="less" scoped>
.search {
  background-color: rgb(248, 248, 248);
  // height: 16.23rem;
  position: relative;
  z-index: 0;
}

.father {
  height: 1.5596rem;
  // 头部搜索
  .search-top {
    position: fixed;
    top: 0px;
    left: 0px;
    padding: 0.4rem 0.2rem;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: rgb(248, 248, 248);
    z-index: 1;

    .top-left {
      height: 0.7rem;
      line-height: 0.7rem;
      width: 85%;
      background-color: rgb(255, 255, 255);
      border-radius: 0.6rem;
      padding-left: 0.2rem;

      input {
        width: 85%;
        height: 0.7rem;
        outline: none;
        vertical-align: middle;
        font-size: 0.32rem;
        padding-left: 0.2rem;
        border: none;
        margin-top: -1px;
      }
      .icon {
        vertical-align: middle;
        width: 0.46rem;
        height: 0.46rem;
      }
    }

    .top-right {
      display: inline-block;
      height: 0.7rem;
      line-height: 0.7rem;
      font-size: 0.32rem;
      // padding-left: -0.2rem;
      margin-left: 0.3rem;
      color: rgb(28, 28, 28);
    }
  }
}

// 搜索历史
.search-history {
  // height: 2.2rem;
  width: 100%;
  padding: 0.2rem 0.45rem 0rem 0.2rem;
  .his-title {
    font-size: 0.32rem;
    font-weight: 700;
    margin-bottom: 0.16rem;
    margin-left: 0.1rem;
    span {
      font-size: 0.2rem;
      font-weight: 400;
      float: right;
    }
  }
  .his-content {
    overflow: hidden;
    li {
      position: relative;
      font-size: 0.24rem;
      float: left;
      height: 0.6rem;
      line-height: 0.6rem;
      background-color: #fff;
      border-radius: 0.32rem;
      margin-right: 0.4rem;
      margin-bottom: 0.1rem;
      padding: 0rem 0.15rem;

      span {
        margin-left: 5px;
        font-size: 12px;
      }
    }
  }
}

// 搜索热门推荐
.search-hot {
  width: 100%;
  padding: 0.2rem 0.45rem 0rem 0.2rem;
  .hot-title {
    font-size: 0.32rem;
    font-weight: 700;
    margin-bottom: 0.16rem;
    margin-left: 0.1rem;
  }
  .hot-content {
    height: 2.1rem;
    overflow: hidden;
    li {
      position: relative;
      font-size: 0.24rem;
      float: left;
      height: 0.6rem;
      line-height: 0.6rem;
      background-color: #fff;
      border-radius: 0.32rem;
      margin-right: 0.3rem;
      margin-bottom: 0.1rem;
      padding: 0rem 0.15rem;
    }
  }
}

// 搜索成功的列表数据
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
    }
  }
}

// 推荐歌单
</style>