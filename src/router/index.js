import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Roote',
      component: () => import('@/views/layout/index.vue'),
      children: [
        {
          path: '/course',
          name: 'course',
          component: () => import('@/views/course/index.vue'),
          redirect:'/course/list',
          children:[
            {
              path: 'list',
              name: 'CourseList',
              component: () => import('@/views/course/children/list.vue')
            },
            {
              path: 'detail',
              name: 'CourseDetail',
              component: () => import('@/views/course/children/detail.vue')
            },
            {
              path: 'manage',
              name: 'CourseManage',
              component: () => import('@/views/course/children/manage.vue')
            },
          ]
        },
        {
          path: '/home',
          name: 'Home',
          component: () => import('@/views/home/index.vue')
        },
        {
          path: '/teacher',
          name: 'Teacher',
          component: () => import('@/views/teacher/index.vue')
        },
        {
          path: '/discuss',
          name: 'Disucss',
          component: () => import('@/views/discuss/index.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/user/login.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.configure({ showSpinner: false })
  NProgress.start()
  // if(!store.getUserInfo){
  //   next('/login')
  // }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router