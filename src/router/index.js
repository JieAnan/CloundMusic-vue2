import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import routes from "./routes"

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})


// 全局路由守卫：前置
// router.beforeEach(async (to, from, next) => {
//   // to:到哪里去，from:从哪里来，next:放行的函数

//   // next();             // 写法一:直接放行
//   // next('/home');      // 写法二：放行到指定的路由
//   // next(false)         // 写法三：中断当前的导航
//   // let token = localStorage.getItem('TOKEN')
// })

export default router;
