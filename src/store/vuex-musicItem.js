
import { reqMusicItemDesc, reqMusicItemList, reqMusicItemDetail, reqMusicUrl } from '@/api';

// reqMusicItemDesc:对应歌单id的介绍
// reqMusicItemList：对应歌单包含的歌曲
// reqMusicItemDetail：对应歌单的动态介绍：评论数,是否收藏,播放数

const state = {
  // 歌单描述信息
  playdesc: {},
  // 歌单歌曲
  playsongs: [],
  // 歌单动态信息
  playdetail: {},
  auther: {},

}
const actions = {

  // 音乐歌曲发送
  async getMusicItem ({ commit }, id) {
    console.log('我是父组件ItemMusic，我重新在state发送请求获取歌单');
    let desc = await reqMusicItemDesc(id);
    let list = await reqMusicItemList(id);
    let detail = await reqMusicItemDetail(id);

    if (desc.code == 200 && list.code == 200 && detail.code == 200) {
      let playlist = desc.playlist;
      let songs = list.songs;
      let details = detail;

      let playObj = { playlist, songs, details }
      commit("MUSICITEM", playObj)

    } else {
      return Promise.reject(new Error("歌单请求数据失败！"))
    }
  },
}


const mutations = {

  // 获取歌单信息
  MUSICITEM (state, playObj) {
    let { playlist, songs, details } = playObj;
    state.playdesc = playlist;
    state.playsongs = songs;
    state.playdetail = details;
    state.auther = playlist.creator;
  },
}
const getters = {

  // 将歌单所有歌曲进行整合，为footermusic提供播放列表
  getPlayList (state) {
    let tempList = [];
    state.playsongs.forEach(item => {
      let song = {};
      song.id = item.id;
      song.ar = item.ar;
      song.al = item.al;
      song.name = item.name;
      tempList.push(song);
    });
    return tempList;
  },
}
export default {
  state,
  actions,
  mutations,
  getters
}