import { createStore } from 'vuex'


import home from "./vuex-home"
import about from "./vuex-about"
import musicItem from "./vuex-musicItem"
import playmusic from "./vuex-playmusic"
import user from "./vuex-user"



// 对外暴露Store类的一个实例
export default createStore({
  modules: {
    home,
    about,
    musicItem,
    playmusic,
    user,
  },
})



