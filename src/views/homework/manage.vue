<template>
    <div class="homework-wrap">
      <div class="homework-operation"><el-button type="primary" :icon="Plus">新增用户</el-button></div>
      <el-table :data="tableData" :height="tableHeight">
        <el-table-column prop="name" label="作业名称" min-width="100" />
        <el-table-column prop="content" label="作业内容" min-width="400" />
        <el-table-column prop="courseId" label="作业课程id" min-width="60" />
        <el-table-column prop="startTime" label="作业开始时间" min-width="180" />
        <el-table-column prop="endTime" label="作业结束时间" min-width="180" />
  
        <el-table-column prop="" label="操作" width="260" fixed="right">
          <el-button type="danger">删除</el-button>
          <el-button type="warning">更改</el-button>
         
        </el-table-column>
      </el-table>
  
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue'
  import {
    Plus
  } from '@element-plus/icons-vue'
  import { getHomeworkList } from "@/api/index";
  
  const tableHeight = ref(700)
  
  const getList = async () => {
    const { data } = await getHomeworkList()
    tableData.value = data
  }
  
  const getTableHeight = () => {
    tableHeight.value = window.innerHeight - 170
  }
  
  onMounted(() => {
    getList()
    getTableHeight()
  })
  const tableData = ref([])
  </script>
  
  <style scoped>
  .homework-operation {
    display: flex;
    justify-content: flex-end;
  }
  
  .homework-wrap {
    width: 1060px;
    border-radius: 8px;
    padding: 16px;
    margin: 12px auto;
    background-color: #fff;
    /* height: calc(100vh - 140px); */
  }
  </style>