<script setup>
import { onMounted, ref, reactive } from "vue";
import { getNoticeList, addNotice, updateNotice,deleteNotice } from "@/api/index";
import { Plus } from "@element-plus/icons-vue";
import { useUserStore } from "@/store/user";
import { ElMessage } from "element-plus";

const store = useUserStore();
const tableData = ref([]);
const params = {
  content: "",
  pageParam: {
    endRow: 0,
    hasNextPage: true,
    hasPreviousPage: true,
    isFirstPage: true,
    isLastPage: true,
    list: [null],
    navigateFirstPage: 0,
    navigateLastPage: 0,
    navigatePages: 0,
    navigatepageNums: [0],
    nextPage: 0,
    pageNum: 1,
    pageSize: 20,
    pages: 0,
    prePage: 0,
    size: 0,
    startRow: 0,
    total: 0,
  },
  title: "",
};
const loading = ref(false);
const dialogVisible = ref(false);
const formData = reactive({
  title: "",
  content: "",
});
const operationType = ref("create");

const getTableData = async () => {
  loading.value = true;
  try {
    const { data } = await getNoticeList(params);
    tableData.value = data.list;
  } catch (e) {
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  getTableData();
});

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
      const { code, data, message } = await addNotice(formData);
      if (code == 0) {
        ElMessage.success("新增通知成功!");
        getTableData();
      } else {
        ElMessage.error(message);
      }
    } else {
      const { code, data, message } = await updateNotice(formData);
      if (code == 0) {
        ElMessage.success("更新通知成功!");
        getTableData();
      } else {
        ElMessage.error(message);
      }
    }
  } catch (e) {
    ElMessage.error("新增通知失败!");
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
  formData.title = row.title;
  formData.content = row.content;
};

const handleDeleteNotice = async (row) => {
  if(row.teacherId != store.info.userId && row.adminId != store.info.userId){
    ElMessage.error('无权限删除')
    return 
  }
  try {
      const { noticeId } = row
      const { code, data, message } = await deleteNotice({ noticeId});
      if (code == 0) {
        ElMessage.success("删除通知成功!");
        getTableData();
      } else {
        ElMessage.error(message);
      }
    
  } catch (e) {
    ElMessage.error("删除通知失败!");
  } finally {
  
  }
}
</script>

<template>
  <div class="notice-wrap">
    <div class="flex justify-end">
      <el-button type="primary" :icon="Plus" @click="handleAddNotice"
        >新增通知</el-button
      >
    </div>
    <div class="table-wrap">
      <el-table :data="tableData" v-loading="loading">
        <el-table-column
          prop="title"
          min-width="180"
          label="通知标题"
        ></el-table-column>
        <el-table-column
          prop="content"
          min-width="300"
          label="通知内容"
        ></el-table-column>
        <el-table-column prop="teacherId" label="发布者"></el-table-column>
        <el-table-column
          prop="createTime"
          min-width="180"
          label="创建时间"
        ></el-table-column>
        <el-table-column
          prop="updateTime"
          min-width="180"
          label="更新时间"
        ></el-table-column>
        <el-table-column prop="" label="操作" width="300">
          <template #default="scope">
            <el-popconfirm title="确认删除这条通知?" @confirm="handleDeleteNotice(scope.row)">
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
    :title="`${operationType == 'create' ? '新增通知' : '更新通知'}`"
    width="700"
  >
    <el-form :model="formData" :label-width="80">
      <el-form-item prop="title" label="通知标题">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="通知内容">
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
}
</style>
