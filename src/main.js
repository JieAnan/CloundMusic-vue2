import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 默认导入srore下的index主仓库文件
import store from './store'

const app = createApp(App);

app.use(store);
app.use(router);

// 5.注册全局组件跑马灯效果
import Vue3Marquee from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'

app.use(Vue3Marquee).mount('#app')

// 2.引入自定义的plugins注册组件的插件 getVant()
// 传递给插件一个app，然后使用app循环注册按需引入的组件
import getVant from "./plugins";
getVant(app)


// 3.挂载全局api-vue3新语法
// 统一引入api中的所有接口函数
import * as API from '@/api';
app.config.globalProperties.$API = API;
// 组件使用方法： this.$API.请求函数


// 4.注册全局组件 FooterMusic.vue
import FooterMusic from "@/components/item/FooterMusic";
app.component('FooterMusic', FooterMusic);

