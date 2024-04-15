<script setup>
import { reactive, ref } from 'vue'
import { getAssetsFile } from '@/util/utils.js'
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

<template>
   <div class="course-list">
    <div class="course-card" v-for="info in courseInfo" :key="info" @click="handleGoDetail">
      <div class="course-cover">
        <el-image :src="getAssetsFile(info.cover)" style="width: 260px; height:160px" fix="cover"></el-image>
      </div>
    <div class="course-text-info">
      <div class="course-name">{{ info.name }}</div>
      <div class="course-teacher">{{ info.teacher }}</div>
      <div class="course-info">
        <div class="course-info-left">{{ `进行至第${info.timeSpan}` }}</div>
        <div class="course-info-right">{{ `${info.studentNum}人参加` }}</div>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/style/common.scss';
.course-wrap{
  display: flex;
  justify-content: center;
}
.course-list{
  margin-top: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  width: 96%;
}
.course-card{
  width: 260px;
  height: 280px;
  cursor: pointer;
  border-radius: 8px;
  background-color: #fff;
  &:hover{
    box-shadow: 0 4px 16px 0 rgba(0,0,0,0.12);
  }
  .course-cover{
    width: 260px;
    height: 160px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    overflow: hidden;
  }
  .course-name{
    font-weight: 500;
    margin-bottom: 8px;
  }
  .course-text-info{
    padding: 8px;
  }
  .course-info{
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    &-left{
      color: $active-color;
      font-size: 12px;
    }
    &-right{
      color: $text-plain-color;
      font-size: 12px;
    }
  }
}
</style>
