<template>
    <div class="homework-wrap">
      <div v-if="store.isTeacher" class="homework-operation"><el-button type="primary" :icon="Plus">新增作业</el-button></div>
      <el-table :data="tableData" :height="tableHeight">
        <el-table-column prop="name" label="作业名称" min-width="100" />
        <el-table-column prop="content" label="作业内容" min-width="400" />
        <el-table-column prop="courseId" label="作业课程id" min-width="60" />
        <el-table-column prop="startTime" label="作业开始时间" min-width="180" />
        <el-table-column prop="endTime" label="作业结束时间" min-width="180" />
  
        <el-table-column prop="" label="操作" width="260" fixed="right">
          <template #default="scope">
          <el-popconfirm title="确认删除该作业?" @confirm="handleDelete(scope.row)">
          <template #reference>
            <el-button type="danger">删除</el-button>
          </template>
        </el-popconfirm>
        <el-button type="warning" @click="handleUpdate(scope.row)">更改</el-button>

        </template>
        </el-table-column>
      </el-table>
      <el-dialog v-model="dialogVisible" width="500" title="更新作业信息">
  <el-form :model="teacherFormData" :label-width="80">
    <el-form-item prop="name" label="作业名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="作业内容">
        <el-input
          :rows="4"
          type="textarea"
          v-model="formData.content"
        ></el-input>
      </el-form-item>
  </el-form>
  <div class="text-center">
    <el-button type="primary" size="small" @click="update">更新</el-button>
  </div>
 </el-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue'
  import {
    Plus
  } from '@element-plus/icons-vue'
  import { getHomeworkList, updateHomework, deleteHomework } from "@/api/index";
  import { useUserStore} from "@/store/user"
  import { ElMessage } from 'element-plus';

  const store = useUserStore()
  const tableHeight = ref(700)
  const dialogVisible = ref(false)
  const formData = reactive({

  })
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

  const handleDelete = async(row) => {
  try {
    const {code } = await deleteHomework( row.homeworkId )
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

const handleUpdate = (row) => {
  Object.assign(formData, row)
  dialogVisible.value = true
}

const update = async() => {
  try{
  const {code } = await updateHomework(formData)
    if(code == 0 ){
      ElMessage.success('更新成功！')
      getList()
    }else{
      ElMessage.error('更新失败！')
    }
  }
  catch (e) {
    ElMessage.error(e)
  }finally{
    dialogVisible.value = false
  }
}

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