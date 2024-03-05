import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home' //重定向首页
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import("@/pages/Home/index.vue"),  //首页
    children: [

    ],
    meta: {
      title: '首页',
      hasMenu: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
