<template>
    <div class="discuss-wrap">
        <div style="font-size: 18px; margin-bottom: 16px; color: #409eff"> 我的留言</div>
      <el-table :data="tableData" :height="tableHeight">
        <el-table-column prop="type" label="留言类型" width="120" />
        <el-table-column prop="content" label="留言内容" min-width="300" />
        <el-table-column prop="creator" label="发布者" width="180" />
        <el-table-column prop="createtime" label="发布时间" width="180" />
      </el-table>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue'
  import {
    Plus
  } from '@element-plus/icons-vue'
  import { getCommentById } from '@/api/index'
  import { useUserStore } from '@/store/user'
  
  const store = useUserStore()
  const tableHeight = ref(900)
  
  const getComment = async () => {
    const { data } = await getCommentById({userId: store.info.userId})
    tableData.value = []
    data.forEach(item => {
        if(store.isTeacher){
            tableData.value.push(
        {
          type: '回复',
          content: item.comment,
          createtime: item.replyTm,
          creator: item.commentUserName
        }
      )
        }
      if(store.isStudent){
        tableData.value.push(
        {
          type: '评论',
          content: item.comment,
          createtime: item.commentTm,
          creator: item.commentUserName
        }
      )
      }
    });
  }
  
  const tableData = ref([])
  onMounted(() => {
    getComment()
    tableHeight.value = `${window.innerHeight - 140}`
  })
  </script>
  
  <style scoped>
  .discuss-wrap {
    width: 900px;
    border-radius: 8px;
    padding: 16px;
    margin: 12px auto;
    background-color: #fff;
    height: calc(100vh - 115px);
  }
  </style>