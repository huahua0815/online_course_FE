<script setup>
import { onMounted, ref, reactive } from "vue";
import { getExamList,deleteExam,updateExam } from "@/api/index";
import { Plus } from "@element-plus/icons-vue";
import { useUserStore } from "@/store/user";
import { ElMessage } from "element-plus";

const store = useUserStore();
const tableData = ref([]);
const params = {
  "pageParam": {
    "pageNum": 1,
    "pageSize": 100,
  },
}
onMounted(()=>{
  getList()
})

const getList = async()=>{
  try{
    const {data ,code} = await getExamList(params)
    tableData.value = data.list
  }catch(e){
    ElMessage.error('获取考试列表失败!')
  }
}
const loading = ref(false);
const dialogVisible = ref(false);
const formData = reactive({
  name: "",
  content: "",
  courseId:-1,
  examId: -1,
});
const operationType = ref("create");

const handleSubmit = async () => {
  console.log(store.info.userType);
  if (store.isTeacher) {
    formData.teacherId = store.info.userId;
  }
  if (store.isAdmin) {
    formData.adminId = store.info.userId;
  }
  try {
    if (operationType.value == "create") {
      // const { code, data, message } = await addNotice(formData);
      // if (code == 0) {
      //   ElMessage.success("新增通知成功!");
      //   getTableData();
      // } else {
      //   ElMessage.error(message);
      // }
    } else {
      const { code, data, message } = await updateExam(formData);
      if (code == 0) {
        ElMessage.success("更新考试成功!");
        getList();
      } else {
        ElMessage.error(message);
      }
    }
  } catch (e) {
    ElMessage.error("考试操作失败!");
  } finally {
    dialogVisible.value = false;
    formData.title = "";
    formData.content = "";
  }
};

const handleAddNotice = () => {
  operationType.value = "create";
  dialogVisible.value = true;
};

const hanldeUpdateNotice = (row) => {
  dialogVisible.value = true;
  operationType.value = "update";
  formData.name = row.name;
  formData.content = row.content;
  formData.courseId = row.courseId
  formData.examId = row.examId
};

const handleDeleteNotice = async (row) => {
  try {
      const { examId } = row
      const { code, data, message } = await deleteExam({ examId});
      if (code == 0) {
        ElMessage.success("删除考试成功!");
        getTableData();
      } else {
        ElMessage.error(message);
      }
    
  } catch (e) {
    ElMessage.error("删除考试失败!");
  } finally {
  
  }
}
</script>

<template>
  <div class="notice-wrap">
    <div class="table-wrap">
      <el-table :data="tableData" v-loading="loading">
        <el-table-column
          prop="name"
          min-width="180"
          label="考试标题"
        ></el-table-column>
        <el-table-column
          prop="courseName"
          min-width="300"
          label="考试课程"
        ></el-table-column>
        <el-table-column
          prop="content"
          min-width="300"
          label="考试内容"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="creator" label="发布者"></el-table-column>
        <el-table-column
          prop="startTime"
          min-width="180"
          label="开始时间"
        ></el-table-column>
        <el-table-column
          prop="endTime"
          min-width="180"
          label="结束时间"
        ></el-table-column>
        <el-table-column prop="" label="操作" width="300" fixed="right">
          <template #default="scope">
            <el-popconfirm title="确认删除这场考试?" @confirm="handleDeleteNotice(scope.row)">
    <template #reference >
      <el-button type="danger">删除</el-button>
    </template>
  </el-popconfirm>
           
            <el-button type="warning" @click="hanldeUpdateNotice(scope.row)"
              >更改</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="`${operationType == 'create' ? '新增通知' : '更新考试'}`"
    width="700"
  >
    <el-form :model="formData" :label-width="80">
      <el-form-item prop="name" label="考试名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="考试内容">
        <el-input
          :rows="4"
          type="textarea"
          v-model="formData.content"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="flex justify-center">
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </div>
  </el-dialog>
</template>

<style scoped>
.notice-wrap {
  padding: 24px;
  background-color: #fff;
  width: 1100px;
}
</style>
