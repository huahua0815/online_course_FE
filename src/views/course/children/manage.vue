<template>
 <div class="manage-wrap">
  <div class="teacher-operation"><el-button type="primary" :icon="Plus" >新增课程</el-button></div>
  <el-table :data="courseInfo">
    <el-table-column prop="name" label="课程名" width="180" />
    <el-table-column prop="teacher" label="讲师" width="180" />
    <el-table-column prop="timeSpan" label="开课时长" width="180" />
    <el-table-column prop="studentNum" label="学生人数" />
    <el-table-column prop="" label="操作" width="360">
      <el-button type="danger" >删除</el-button>
      <el-button type="warning" >更改</el-button>
      <el-button type="info" >详情</el-button>
    </el-table-column>
  </el-table>
 </div>
</template>

<script setup>
import { ref } from 'vue'
import {
 Plus
} from '@element-plus/icons-vue'
const courseInfo = ref([
  {
    cover: "img/编程导论.jpeg",
    name: "计算机编程导论",
    teacher: "张伟",
    timeSpan: "8周",
    studentNum: 50,
  },
  {
    cover: "course2.jpg",
    name: "Web开发基础",
    teacher: "李晓",
    timeSpan: "12周",
    studentNum: 35,
  },
  {
    cover: "course3.jpg",
    name: "数据结构与算法",
    teacher: "王华",
    timeSpan: "10周",
    studentNum: 45,
  },
  {
    cover: "course4.jpg",
    name: "人工智能原理与应用",
    teacher: "刘明",
    timeSpan: "16周",
    studentNum: 60,
  },
  {
    cover: "course5.jpg",
    name: "数据库设计与管理",
    teacher: "陈琳",
    timeSpan: "8周",
    studentNum: 30,
  },
  {
    cover: "course6.jpg",
    name: "网络安全基础",
    teacher: "张强",
    timeSpan: "6周",
    studentNum: 25,
  },
  {
    cover: "course7.jpg",
    name: "移动应用开发",
    teacher: "杨婷",
    timeSpan: "12周",
    studentNum: 40,
  },
  {
    cover: "course8.jpg",
    name: "计算机图形学",
    teacher: "刘博",
    timeSpan: "10周",
    studentNum: 30,
  },
  {
    cover: "course9.jpg",
    name: "操作系统原理",
    teacher: "王刚",
    timeSpan: "10周",
    studentNum: 50,
  },
  {
    cover: "course10.jpg",
    name: "云计算与大数据",
    teacher: "赵丽",
    timeSpan: "8周",
    studentNum: 55,
  },
]);
</script>

<style scoped>
.teacher-operation{
  display: flex;
  justify-content: flex-end;
}
.manage-wrap{
  width: 900px;
  border-radius: 8px;
  padding: 16px;
  margin: 12px auto;
  background-color: #fff;
  height: calc(100vh - 140px);
}
</style>