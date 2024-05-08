<script setup>
import {DArrowRight,Edit }  from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const list  = [
  {
    name: '计算机基础考试',
    coursename: '计算机组成原理',
    starttime: '2024 年 3 月 15 日 9:00',
    endtime: '2024 年 3 月 15 日 11:00',
    creator: '李老师',
  },
  {
    name: '计算机网络考试',
    coursename: '计算机网络技术',
    starttime: '2024 年 4 月 20 日 10:00',
    endtime: '2024 年 4 月 20 日 12:00',
    creator: '张老师',
  },
  {
    name: '编程语言考试',
    coursename: 'Python 编程',
    starttime: '2024 年 5 月 5 日 14:00',
    endtime: '2024 年 5 月 5 日 16:00',
    creator: '王老师',
  },
  {
    name: '数据库考试',
    coursename: '数据库原理与应用',
    starttime: '2024 年 6 月 10 日 15:00',
    endtime: '2024 年 6 月 10 日 17:00',
    creator: '刘老师',
  },
  {
    name: '操作系统考试',
    coursename: '操作系统原理',
    starttime: '2024 年 7 月 15 日 16:00',
    endtime: '2024 年 7 月 15 日 18:00',
    creator: '陈老师',
  },
  {
    name: '软件工程考试',
    coursename: '软件工程',
    starttime: '2024 年 8 月 20 日 17:00',
    endtime: '2024 年 8 月 20 日 19:00',
    creator: '赵老师',
  },
  {
    name: '人工智能考试',
    coursename: '人工智能基础',
    starttime: '2024 年 9 月 5 日 9:00',
    endtime: '2024 年 9 月 5 日 11:00',
    creator: '钱老师',
  },
  {
    name: '算法考试',
    coursename: '算法设计与分析',
    starttime: '2024 年 10 月 10 日 10:00',
    endtime: '2024 年 10 月 10 日 12:00',
    creator: '孙老师',
  },
  {
    name: '信息安全考试',
    coursename: '信息安全技术',
    starttime: '2024 年 11 月 15 日 14:00',
    endtime: '2024 年 11 月 15 日 16:00',
    creator: '周老师',
  },
  {
    name: '移动开发考试',
    coursename: '移动应用开发',
    starttime: '2024 年 12 月 20 日 15:00',
    endtime: '2024 年 12 月 20 日 17:00',
    creator: '吴老师',
  },
];
</script>

<template>
  <div class="exam-list-wrap">
    <div class="teacher-operation flex justify-start mb-4">
        <el-button type="primary" :icon="Edit" size="small" @click="router.push({name:'CreateExam'})">发布考试</el-button>
    </div>
   <div class="exam-list">
    <div class="exam-list-card" v-for="item, index in list" :key="index">
        <div class="name">{{ item.name }}</div>
        <div>
            <span class="card-title">考试课程：</span>{{ item.coursename }}
        </div>
        <div class="starttime ">
            <span class="card-title">开始时间：</span>{{ item.starttime }}</div>
         <div class="end-time">
            <span class="card-title">结束时间：</span>{{ item.endtime }}</div>
        <div class="creator">
            <span class="card-title">发布者：</span>{{ item.creator }}</div>
            <div class="operation flex justify-end">
                <el-button type="primary" :icon="DArrowRight" size="small">进入考试</el-button>
            </div>
    </div>
   </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/style/common.scss";

.exam-list-wrap {
   
    .exam-list{
        color: $text-plain-color;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    }
}
.exam-list-card {
    background-color: #fff;
    width: 320px;
    padding: 16px;
    border-radius: 6px;
    box-shadow: 3px 1px 5px 1px rgba(0, 0, 0, 0.08);
    .name{
        color: $text-primary-color;
        margin-bottom: 8px;
    }
}
.card-title{
    font-size: 12px;
}
</style>
