<template>
    <div class="teacher-wrap">
      <div class="teacher-operation"><el-button type="primary" :icon="Plus" >新增用户</el-button></div>
      <el-table :data="userInfo">
        <el-table-column prop="user" label="用户" min-width="180" />
        <el-table-column prop="" label="操作" width="360">
          <el-button type="danger" >删除</el-button>
          <el-button type="warning" >更改</el-button>
          <el-button type="info" >详情</el-button>
        </el-table-column>
      </el-table>
     
     </div>
    </template>
    
    <script setup>
    import { ref,reactive } from 'vue'
    import {
     Plus
    } from '@element-plus/icons-vue'
  const userInfo = new Array(8).fill('').map((item,index)=>{return{"user":`学生${index+1}`}})
    </script>
    
    <style scoped>
    .teacher-operation{
      display: flex;
      justify-content: flex-end;
    }
    .teacher-wrap{
      width: 900px;
      border-radius: 8px;
      padding: 16px;
      margin: 12px auto;
      background-color: #fff;
      height: calc(100vh - 140px);
    }
    </style>