import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/user'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Rooter',
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
              path: 'create-course',
              name: 'CreateCourse',
              component: () => import('@/views/course/children/create-course.vue')
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
          path: '/exam',
          name: 'Exam',
          component: () => import('@/views/exam/index.vue'),
          redirect:'/exam/list',
          children:[
            {
              path: 'list',
              name: 'ExamList',
              component: () => import('@/views/exam/children/list.vue')
            },
            {
              path: 'create-exam',
              name: 'CreateExam',
              component: () => import('@/views/exam/children/create-exam.vue')
            },
            {
              path: 'take-exam',
              name: 'TakeExam',
              component: () => import('@/views/exam/children/take-exam.vue')
            },
            {
              path: 'manage',
              name: 'ExamManage',
              component: () => import('@/views/exam/children/manage.vue')
            },
          ]
        },
        {
          path: '/home',
          name: 'Home',
          component: () => import('@/views/home/index.vue')
        },
        {
          path: '/notice',
          name: 'Notice',
          component: () => import('@/views/notice/index.vue')
        },
        {
          path: '/homework-detail',
          name: 'HomeworkDetail',
          component: () => import('@/views/homework/detail.vue')
        },
        {
          path: '/create-homework',
          name: 'HomeworkCreate',
          component: () => import('@/views/homework/create-homework.vue')
        },
        {
          path: '/homework-manage',
          name: 'HomeworkManage',
          component: () => import('@/views/homework/manage.vue')
        },
        {
          path: '/teacher',
          name: 'Teacher',
          component: () => import('@/views/teacher/index.vue')
        },
        {
          path: '/teacher1',
          name: 'Teacher1',
          component: () => import('@/views/teacher/index1.vue')
        },
        {
          path: '/discuss',
          name: 'Disucss',
          component: () => import('@/views/discuss/index.vue')
        },
        {
          path: '/user',
          name:'UserIndex',
          component: () => import('@/views/user/index.vue')
        },
        {
          path: '/admin',
          name:'AdminIndex',
          component: () => import('@/views/admin/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.configure({ showSpinner: false })
  NProgress.start()
  const store = useUserStore()
  console.log('beforeEach', store.info)
  if(store.info.name == ''){
    if(to.path == '/login'){
      next()
    }else{
      next('/login')
    }
  }else{
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router