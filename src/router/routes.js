
import Home from '@/views/Home.vue'
import store from '@/store/index.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/itemMusic',
    name: 'itemMusic',
    component: () => import(/* webpackChunkName: "itemmusic" */ '../views/ItemMusic.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
    beforeEnter: (to, from, next) => {
      if (store.state.user.isLogin || localStorage.getItem('LoginToken')) {
        next()
      }
      else {
        next('/login')
      }
    }


  },
]

export default routes;