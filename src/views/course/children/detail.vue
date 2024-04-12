<template>
<div class="course-detail">
  <div class="course-detail-info">
    <div class="course-detail-info-left">11</div>
    <div class="course-detail-info-right"></div>
  </div>
  <div class="course-detail-intro">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleTabChange">
    <el-tab-pane label="课程详情" name="detail">课程详情</el-tab-pane>
    <el-tab-pane label="课程留言" name="discuss">课程详情</el-tab-pane>
  </el-tabs>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'

const activeName = ref('detail')

const handleTabChange = () => {}
</script>

<style scoped lang="scss">
.course-detail{
  margin: 16px auto;
  width: 100%;
 &-info{
  width: 92%;
  margin: 0 auto;
  min-width: 1000px;
  height: 260px;
  background-color: #fff;
  border-radius: 8px;
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
</style>