
// 此文件主要存储有关home相关的数据
// 1.需要使用vuex
// 2.配置state：存储数据的地方
// 3.配置actions：处理action，可以书写自己的业务逻辑
// 4.配置mutations:修改state的唯一手段。
// 5.配置getters:理解计算属性，用于简化仓库数据，让组件获取仓库数据更方便。
// 6.对外暴露Store类的一个实例

import { reqBannerList, reqPersonalizedList } from '@/api';

const state = {
}
const actions = {
}
const mutations = {
}
const getters = {}

// 暴露该文件
export default {
  state,
  mutations,
  actions,
  getters
}