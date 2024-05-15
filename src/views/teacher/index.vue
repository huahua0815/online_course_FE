<template>
<div class="teacher-wrap">
  <!-- <div class="teacher-operation"><el-button type="primary" :icon="Plus" >新增讲师</el-button></div> -->
  <el-table :data="teacherInfo" :height="tableHeight">
    <el-table-column prop="teacherNumber" label="老师工号" min-width="180" />
    <el-table-column prop="teacherName" label="老师姓名" min-width="180" />
    <el-table-column prop="introduction" label="简介" min-width="180" />
    <el-table-column prop="major" label="专业领域" min-width="180" />
    <el-table-column prop="experirence" label="教学经验" min-width="180" />
    <el-table-column prop="level" label="职称" min-width="180" />
    <el-table-column prop="" label="操作" width="260" fixed="right">
      <template #default="scope">
          <el-popconfirm title="确认删除该教师?" @confirm="handleDelete(scope.row)">
          <template #reference>
            <el-button type="danger">删除</el-button>
          </template>
        </el-popconfirm>
        <el-button type="warning" @click="handleUpdate(scope.row)">更改</el-button>

        </template>
    </el-table-column>
  </el-table>
 <el-dialog v-model="dialogVisible" width="500" title="更新教师信息">
  <el-form :model="teacherFormData" :label-width="80">
    <el-form-item label="教师工号">
              <el-input v-model="teacherFormData.teacherNumber" />
            </el-form-item>
            <el-form-item label="教师姓名">
              <el-input v-model="teacherFormData.teacherName" />
            </el-form-item>
          
            <el-form-item label="个人简介">
              <el-input v-model="teacherFormData.introduction" />
            </el-form-item>
            <el-form-item label="教学经验">
              <el-input v-model="teacherFormData.experirence" />
            </el-form-item>
            <el-form-item label="专业领域">
              <el-input v-model="teacherFormData.major" />
            </el-form-item> 
             <el-form-item label="职称">
              <el-input v-model="teacherFormData.level" />
            </el-form-item>
  </el-form>
  <div class="text-center">
    <el-button type="primary" size="small" @click="update">更新</el-button>
  </div>
 </el-dialog>
 </div>
</template>

<script setup>
import { ref,onMounted, reactive } from 'vue'
import {
 Plus
} from '@element-plus/icons-vue'
import { getUserList,deleteTeacher,updateTeacher } from "@/api/index";
import { ElMessage } from 'element-plus';

const tableHeight = ref(700)
const teacherInfo = ref([])
const dialogVisible = ref(false)
const teacherFormData = reactive({
  teacherNumber:'',
  teacherName:'',
  teacherPassword:'',
  major:'',
  experirence:'',
  introduction:'',
  level:'',
  teacherId:''
})

const getList = async () => {
  const { data } = await getUserList({ userType: 2 })
  teacherInfo.value = data.teacherList
}

const getTableHeight = () => {
  tableHeight.value = window.innerHeight - 170
}
const handleDelete = async(row) => {
  try {
    const {code } = await deleteTeacher( row.teacherId )
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
  Object.assign(teacherFormData, row)
  dialogVisible.value = true
}

const update = async() => {
  try{
  const {code } = await updateTeacher(teacherFormData)
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