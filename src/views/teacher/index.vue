<template>
<div class="teacher-wrap">
  <div class="teacher-operation"><el-button type="primary" :icon="Plus" >新增讲师</el-button></div>
  <el-table :data="teacherInfo" :height="tableHeight">
    <el-table-column prop="teacherNumber" label="老师工号" min-width="180" />
    <el-table-column prop="teacherName" label="老师姓名" min-width="180" />
    <el-table-column prop="major" label="专业领域" min-width="180" />
    <el-table-column prop="experience" label="教学经验" min-width="180" />
    <el-table-column prop="level" label="职称" min-width="180" />
    <el-table-column prop="" label="操作" width="260" fixed="right">
      <el-button type="danger" >删除</el-button>
      <el-button type="warning" >更改</el-button>
     
    </el-table-column>
  </el-table>
 
 </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import {
 Plus
} from '@element-plus/icons-vue'
import { getUserList } from "@/api/index";


const tableHeight = ref(700)
const teacherInfo = ref([])
const getList = async () => {
  const { data } = await getUserList({ userType: 2 })
  teacherInfo.value = data.teacherList
}

const getTableHeight = () => {
  tableHeight.value = window.innerHeight - 170
}

onMounted(() => {
  getList()
  getTableHeight()
})
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
  /* height: calc(100vh - 140px); */
}
</style>