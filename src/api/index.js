
// 统一管理所有的api接口
import requests from "./request"

/* 获取二级分类的接口 GET  /admin/product/getCategory2/{category1Id}

// 1.箭头函数写法
// export const reqCategory2List = (id1) 
=> request({ url: `/admin/product/getCategory2/${id1}`, methods: 'get' })

// 2.函数写法
export function reqCategory2List (id1) {
    return request({
        url: `/admin/product/getCategory2/${id1}`,
        method: 'get',
    })
} */


// 开始数据请求部分

// home部分
// 1.请求banner轮播图数据    /banner?type=2   0-pc   1-andriod  2-iphone 3-ipad
export function reqBannerList (id) {
  return requests({
    url: `/banner?type=${id}`,
    method: 'get',
  })
}
// 2.获取每日推荐歌单     /personalized?limit=1     limit表示取出歌单数量，默认为30
export function reqPersonalizedList (num) {
  return requests({
    url: `/personalized?limit=${num}`,
    method: 'get',
  })
}

// 推荐歌单部分

// 1.获取歌单详情   /playlist/detail?id=24381616
export function reqMusicItemDesc (id) {
  return requests({
    url: `/playlist/detail?id=${id}`,
    method: 'get',
  })
}

// 2.获取歌单所有歌曲：/playlist/track/all?id=24381616&limit=10&offset=1
// id：歌单id   limit： 歌曲的数量10条   offset：起始歌曲编号默认为0。
export function reqMusicItemList (id) {
  return requests({
    url: `/playlist/track/all?id=${id}&limit=20`,
    method: 'get',
  })
}
// 3.获取对应歌单的动态：评论数,是否收藏,播放数 
//  /playlist/detail/dynamic?id=24381616
export function reqMusicItemDetail (id) {
  return requests({
    url: `/playlist/detail/dynamic?id=${id}`,
    method: 'get',
  })
}


// 播放音乐组件部分 :
// 1.获取url   /song/url?id=33894312 
export function reqMusicUrl (id) {
  return requests({
    url: `/song/url?id=${id}`,
    method: 'get',
  })
}
// 2.获取播放音乐的歌词部分： /lyric?id=33894312
export function reqMusicLyric (id) {
  return requests({
    url: `/lyric?id=${id}`,
    methods: 'get',
  })
}


// search页面发送数据请求

// 1.获取搜索关键字的内容
export function reqSearchResult (keywords) {
  return requests({
    url: `/cloudsearch?keywords=${keywords}`,
    methods: 'get',
  })
}

// 2.获取推荐搜索关键字
export function reqSearchKeyword () {
  return requests({
    url: `/search/hot`,
    methods: 'get',
  })
}


// user 接口

// 1.通过手机号码 + 密码进行登录。
export function reqPhoneLogin (phone, password) {
  return requests({
    url: `/login/cellphone?phone=${phone}&password=${password}`,
    methods: 'get',
  })
}
