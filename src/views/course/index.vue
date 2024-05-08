<template>
<div class="course-wrap">
 <router-view></router-view>
</div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const handleGoDetail = () => {
  router.push({name:'CourseDetail'})
}


const courseInfo = ref([
  {
    "cover": "img/编程导论.jpeg",
    "name": "计算机编程导论",
    "teacher": "张伟",
    "timeSpan": "8周",
    "studentNum": 50
  },
  {
    "cover": "course2.jpg",
    "name": "Web开发基础",
    "teacher": "李晓",
    "timeSpan": "12周",
    "studentNum": 35
  },
  {
    "cover": "course3.jpg",
    "name": "数据结构与算法",
    "teacher": "王华",
    "timeSpan": "10周",
    "studentNum": 45
  },
  {
    "cover": "course4.jpg",
    "name": "人工智能原理与应用",
    "teacher": "刘明",
    "timeSpan": "16周",
    "studentNum": 60
  },
  {
    "cover": "course5.jpg",
    "name": "数据库设计与管理",
    "teacher": "陈琳",
    "timeSpan": "8周",
    "studentNum": 30
  },
  {
    "cover": "course6.jpg",
    "name": "网络安全基础",
    "teacher": "张强",
    "timeSpan": "6周",
    "studentNum": 25
  },
  {
    "cover": "course7.jpg",
    "name": "移动应用开发",
    "teacher": "杨婷",
    "timeSpan": "12周",
    "studentNum": 40
  },
  {
    "cover": "course8.jpg",
    "name": "计算机图形学",
    "teacher": "刘博",
    "timeSpan": "10周",
    "studentNum": 30
  },
  {
    "cover": "course9.jpg",
    "name": "操作系统原理",
    "teacher": "王刚",
    "timeSpan": "10周",
    "studentNum": 50
  },
  {
    "cover": "course10.jpg",
    "name": "云计算与大数据",
    "teacher": "赵丽",
    "timeSpan": "8周",
    "studentNum": 55
  }
])
</script>

