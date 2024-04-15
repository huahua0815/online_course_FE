<template>
<div class="course-detail">
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/course/list' }">课程列表</el-breadcrumb-item>
    <el-breadcrumb-item>{{ info.name }}</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="course-detail-info">
    <div class="course-detail-info-left">
      <el-image :src="getAssetsFile(info.cover)" style="width: 260px; height:160px" fix="cover"></el-image>
      </div>
      <div class="course-detail-info-right">
      <div class="info-detail-item name">{{ info.name }}
        </div>
        <div class="info-detail-item">{{ info.teacher }}
        </div>
        <div class="info-detail-item timespan">{{ `进行至第${info.timeSpan}，共${info.totalTimeSpan }` }}
         
    </div>
    <el-button type="primary">开始学习</el-button>
        </div>
   
  </div>
  <div class="course-detail-intro">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleTabChange">
    <el-tab-pane label="课程详情" name="detail">
      <div class="detail-into-item">
        <div class="detail-intro-item-title">
          <el-icon color="#409eff" size="16"><Collection /></el-icon> <span>课程简介</span>
        </div>
        <div class="detail-intro-item-content">{{ info.intro }}</div>
      </div>
      <div class="detail-into-item">
        <div class="detail-intro-item-title">
          <el-icon color="#409eff" size="16"><Calendar /></el-icon>
         <span>课程大纲</span>
        </div>
        <div class="detail-intro-item-content">   <el-tree
    style="max-width: 400px"
    :data="courseData"
    :props="defaultProps"
    @node-click="handleNodeClick"
  /></div>
      </div>
   
    </el-tab-pane>
    <el-tab-pane label="课程留言" name="discuss">课程详情</el-tab-pane>
  </el-tabs>
  </div>
</div>
</template>

<script setup>
import { ref,reactive } from 'vue'
import { getAssetsFile } from '@/util/utils.js'

const activeName = ref('detail')
const info = reactive( {
    "cover": "img/编程导论.jpeg",
    "name": "计算机编程导论",
    "teacher": "张伟",
    "timeSpan": "8周",
    "studentNum": 50,
    totalTimeSpan:'10周',
    intro:'《计算机导论》是专业基础课，教学任务是使学生掌握计算机科学的相关基础知识，通过本课程的学习，要求学生理解计算机运行大概过程、掌握简单数值数据在计算机中的表示、了解计算机硬件的基本组成、了解计算机软件的相关知识。'
  },)

 const courseData = [
  {label:'第一章：计算机概述'},
  {label:'第二章：计算机中的数据'},
  {label:'第三章：Python语言及应用'},
  {label:'第四章：程序设计引导'},
  {label:'第五章：操作系统简介'},
  {label:'第六章：计算机网络与物联网'},
  {label:'第七章：数据库系统概论'},
 ] 

const defaultProps = {
  children :'children',
  label: 'label'
}
const handleTabChange = () => {}
</script>

<style scoped lang="scss">
@import '@/style/common.scss';
.course-detail{
  margin: 16px auto;
  width: 100%;
 &-info{
  width: 92%;
  margin: 10px auto;
  min-width: 400px;
  height: 220px;
  background-color: #fff;
  border-radius: 8px;
  padding:16px;
  box-sizing: border-box;
  display: flex;
  &-right{
    margin-left: 16px;
  }
 }
 &-intro{
  width: 92%;
  box-sizing: border-box;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  margin-top: 20px;
  padding: 16px;
 }
}
.info-detail-item{
  margin-bottom: 6px;
  &.name{
    font-size: 20px;
  }
  &.timespan{
    color:$active-color;
    margin-bottom: 20px;
  }
}
.detail-intro-item{
  &-title{
    display: flex;
    align-items: center;
    & span{
      margin-left: 4px;
      font-weight: 500;
      color: $active-color;
    }
  }
  &-content{
    color:$text-plain-color;
  }
}
</style>