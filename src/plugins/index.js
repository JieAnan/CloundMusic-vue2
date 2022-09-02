
// 对引入组件进行集中管理
import { Swipe, SwipeItem, Button, Popup, Dialog } from 'vant';


// 用一个循环，去使用app.use()进行组件注册
let plugins = [
  Swipe, SwipeItem, Button, Popup, Dialog,
]


// 构造一个函数
function getVant (app) {
  plugins.forEach((item) => {
    return app.use(item);
  })
}

// 暴露函数，在main.js中使用该插件。
export default getVant;

