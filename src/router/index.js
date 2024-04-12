import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/layout/index.vue'),
      children: [
        {
          path: '/course',
          name: 'course',
          component: () => import('@/views/course/index.vue'),
          
        },
        {
          path: '/course/detail',
          name: 'CourseDetail',
          component: () => import('@/views/course/children/detail.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/user/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/user/register.vue')
    },
    
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.configure({ showSpinner: false })
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router