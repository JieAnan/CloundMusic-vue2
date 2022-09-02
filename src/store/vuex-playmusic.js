
import { reqMusicItemDesc, reqMusicItemList, reqMusicLyric, reqMusicUrl } from '@/api';


const state = {

  // 播放列表的默认值，当用户不点击歌单的歌曲时候，播放组件显示该列表的信息。
  // 如果用户想要播放全部歌曲，那么应该将歌单所有歌曲全部加入该list，
  // 如果用户点击了某一首歌，那么应该使用index立即进行索引取值。

  // 1.歌单歌曲
  playList: [
    {
      name: "记事本",
      al: {
        id: 21790,
        name: "爱我不爱",
        pic: 18737877162566596,
        picUrl: "https://p2.music.126.net/y8a0ePwRFuP-gCijr-oAbw==/18737877162566596.jpg",
        pic_str: "18737877162566596",
      },
      id: 215576,       // 音乐src所需要的id
      ar: [
        {
          id: 7235,
          name: "陈慧琳",
        },
      ],
      // 3.控制音乐播放和暂停，默认为暂停
      isplay: false,
    },
  ],

  // 2.当前播放音乐的索引,默认第一首歌。
  playIndex: 0,
  // 3.存储当前的歌单id。
  musicListId: 0,
  // 4.歌曲详情页展示
  detailShow: false,
  // 5.歌词
  lyricObj: {},
  // 6.定义当前时间用于接受。
  currentTime: 0,
  // 7.计算当前音乐的总时间
  totalTime: 0,

}

const actions = {

  // 1.音乐歌曲发送
  async getMusicList ({ commit }, obj1) {

    // 初次加载该歌单进行数据保存,第二次点击时候不再请求列表。
    if (state.musicListId != obj1.id) {
      let list = await reqMusicItemList(obj1.id);
      if (list.code == 200) {
        let songs = list.songs;
        let obj = {}
        obj.songs = songs;
        obj.id = obj1.id;

        obj.isPlaying = obj1.isPlaying;    // 是否默认播放index歌曲
        obj.playIndex = obj1.playIndex;    // 播放index，默认为0
        commit("INITMUSICLIST", obj)
      } else {
        return Promise.reject(new Error("播放歌单请求失败！"))
      }
    }
    // 表示是在选择播放歌曲，仅仅更改index
    else {
      commit('CHANGEINDEX', obj1.playIndex);
    }
  },

  // 2.获取音乐歌词
  async getMusicLyric ({ commit }, id) {
    let result = await reqMusicLyric(id);
    if (result.code == 200) {
      commit('GETMUSICLYRIC', result.lrc)
    } else {
      return Promise.reject(new Error('歌词请求获取失败！'))
    }
  }

}


const mutations = {

  // 0.初始化歌单信息
  INITMUSICLIST (state, obj) {
    state.musicListId = obj.id;
    state.playIndex = obj.playIndex;      // 改变当前待播放的index

    let tempList = [];                    // 数据整合
    obj.songs.forEach(item => {
      let music = {};
      music.id = item.id;
      music.ar = item.ar;
      music.al = item.al;
      music.name = item.name;
      music.isplay = false;
      tempList.push(music);
    });
    // 判断是否需要播放当前index的歌曲
    if (obj.isPlaying == true) {
      tempList[obj.playIndex].isplay = true;    // 选中的index进行播放。
    }
    state.playList = tempList;
  },

  // 搜索成功后，点击歌曲向当前播放列表末尾添加新歌曲,并设置播放index。
  ADDSEARCHMUSIC (state, song) {
    state.playList.push(song);
    state.playIndex = state.playList.length - 1;
  },

  // 1.提供修改对应index歌曲 播放和暂停的功能
  CHANGEISPLAY (state) {
    let bool = state.playList[state.playIndex].isplay;
    state.playList[state.playIndex].isplay = !bool;
  },

  // 2.修改当前的playindex的值，播放对应歌曲。
  CHANGEINDEX (state, index) {
    state.playIndex = index;
    // 应该将当前的isplay更新
    state.playList[state.playIndex].isplay = true;
  },

  // 3.改变详情页的bool类型
  CHANGEDETAIL (state) {
    state.detailShow = !state.detailShow;
  },

  // 4. 根据传递的上一首和下一首进行歌曲index切换
  // 需要调用自身的 CHANGEINDEX。
  CHANGEINDEXMUSIC (state, value) {
    if (value == 1) {
      // 下一首
      if (state.playIndex == state.playList.length - 1) {
        state.playIndex = 0;
      } else {
        state.playIndex += 1;
      }
      state.playList[state.playIndex].isplay = true;
    }
    else if (value == -1) {
      // 上一首
      if (state.playIndex == 0) {
        state.playIndex = state.playList.length - 1;
      } else {
        state.playIndex -= 1;
      }
      state.playList[state.playIndex].isplay = true;
    }
    else if (value == 0) {
      // 随机播放
      // 生成 0-length-1的整数。
      let index = Math.ceil(Math.random() * (state.playList.length - 1))
      while (index == state.playIndex) {
        index = Math.ceil(Math.random() * (state.playList.length - 1))
      }
      state.playIndex = index;
      state.playList[state.playIndex].isplay = true;
    }
  },

  // 5.获取歌词
  GETMUSICLYRIC (state, lrc) {
    state.lyricObj = lrc;
  },

  // 6.更改当前播放时间  currentTime
  updateCurrentTime (state, value) {
    state.currentTime = value;
  },

  // 7.设置当前音乐总时间
  setCurrentTime (state, value) {
    state.totalTime = value;
  }
}

// 数据打包方便获取
const getters = {
  playList (state) {
    return state.playList;
  },
  playIndex (state) {
    return state.playIndex;
  },
  isplay (state) {
    return state.playList[state.playIndex].isplay;
  },
  detailShow (state) {
    return state.detailShow;
  },
  lyricObj (state) {
    return state.lyricObj;
  },

  // 操作需要的数据放在gtters，以减少vue组件加载的效率。
  splitLyric (state) {

    let lyricStr = state.lyricObj.lyric;
    let lyricObj = lyricStr.split("\n").map((item, i) => {
      let time = item.split("]")[0];
      let word = item.split("]")[1];

      // 切割 min sec mill
      let min = time.slice(1, 3);
      let sec = time.slice(4, 6);
      let mill = time.slice(7, -1);

      // 转化为毫秒
      let millTime = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
      return { min, sec, mill, millTime, word };
    });
    lyricObj.forEach((item, i) => {
      if (i == lyricObj.length - 1 || isNaN(lyricObj[i + 1].millTime)) {
        item.nextTime = 1000000;
      } else {
        item.nextTime = lyricObj[i + 1].millTime;
      }
    })
    return lyricObj;
  },
  currentTime (state) {
    return state.currentTime;
  },
  totalTime (state) {
    return state.totalTime;
  }
}


export default {
  state,
  actions,
  mutations,
  getters
}