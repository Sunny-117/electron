// router.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/Home.vue'
import AlbumPage from '../views/Album.vue'
import { useMusicStore } from '../store' // 引入Pinia store

// 定义一些路由
// 每个路由都需要映射到一个组件。
const routes = [
  { path: '/', component: HomePage },
  { path: '/album', component: AlbumPage }
]

// 创建路由实例并传递 `routes` 选项
const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 History 模式
  routes // 简写，相当于 routes: routes
})

// 使用导航守卫来确定是前进还是后退
router.beforeEach((to, from, next) => {
  const musicStore = useMusicStore()
  // 判断是前进还是后退
  if (to.fullPath === '/') {
    // 如果我们回到了根路径，假设这是后退
    musicStore.setNavigationDirection('backward')
  } else if (from.fullPath === '/' && to.fullPath === '/album') {
    // 如果我们从根路径前进到album，假设这是前进
    musicStore.setNavigationDirection('forward')
  }
  next()
})

export default router
