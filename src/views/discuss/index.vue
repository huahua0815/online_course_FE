<template>
  <div class="discuss-wrap">
    <el-table :data="tableData" :height="tableHeight">
      <el-table-column prop="type" label="留言类型" width="120" />
      <el-table-column prop="content" label="留言内容" min-width="300" />
      <el-table-column prop="creator" label="发布者" width="180" />
      <el-table-column prop="createtime" label="发布时间" width="180" />

      <el-table-column prop="" label="操作" width="300">
        <el-button type="danger">删除</el-button>
        <el-button type="warning">更改</el-button>
        <el-button type="info">详情</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import {
  Plus
} from '@element-plus/icons-vue'
import { getCommentList } from '@/api/index'

const tableHeight = ref(900)

const getComment = async () => {
  const { data } = await getCommentList()
  tableData.value = []
  data.forEach(item => {
    tableData.value.push(
      {
        type: '评论',
        content: item.comment.comment,
        createtime: item.comment.commentTm,
        creator: item.comment.commentUserName
      }
    )
    if(item.replyList){
      item.replyList.forEach(reply=>{
        tableData.value.push(
      {
        type: '回复',
        content: item.comment,
        createtime: item.replyTm,
        creator: item.commentUserName
      }
    )
      })
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