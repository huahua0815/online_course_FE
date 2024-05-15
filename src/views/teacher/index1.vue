<template>
  <div class="teacher-wrap">
    <!-- <div class="teacher-operation"><el-button type="primary" :icon="Plus">新增用户</el-button></div> -->
    <el-table :data="userInfo" :height="tableHeight">
      <el-table-column prop="number" label="工号" min-width="180" />
      <el-table-column prop="name" label="姓名" min-width="180" />
      <el-table-column prop="" label="操作" width="360">
        <template #default="scope">
          <el-popconfirm title="确认删除该学生?" @confirm="handleDelete(scope.row)">
          <template #reference>
            <el-button type="danger">删除</el-button>
          </template>
        </el-popconfirm>
        <el-button type="warning">更改</el-button>

        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import {
  Plus
} from '@element-plus/icons-vue'
import { getUserList, deleteStudent } from "@/api/index";
import { ElMessage } from 'element-plus';
const tableHeight = ref(700)

const getList = async () => {
  const { data } = await getUserList({ userType: 1 })
  userInfo.value = data.studentList
}

const getTableHeight = () => {
  tableHeight.value = window.innerHeight - 170
}

const handleDelete = async(row) => {
  try {
    const {code } = await deleteStudent( row.id )
    if(code == 0 ){
      ElMessage.success('删除成功！')
      getList()
    }else{
      ElMessage.error('删除失败！')
    }
  } catch (e) {
    ElMessage.error(e)
  }
}

onMounted(() => {
  getList()
  getTableHeight()
})
const userInfo = ref([])
</script>

<style scoped>
.teacher-operation {
  display: flex;
  justify-content: flex-end;
}

.teacher-wrap {
  width: 900px;
  border-radius: 8px;
  padding: 16px;
  margin: 12px auto;
  background-color: #fff;
  /* height: calc(100vh - 140px); */
}
</style>