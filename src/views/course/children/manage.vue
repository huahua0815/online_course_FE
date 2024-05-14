<template>
 <div class="manage-wrap">
  <div v-if="store.isTeacher" style="font-size: 18px;color:#409eff">我的课程</div>
  <!-- <div class="teacher-operation"><el-button type="primary" :icon="Plus" @click="dialogVisible = true">新增课程</el-button></div> -->
  <el-table :data="courseInfo" >
    <el-table-column prop="courseName" label="课程名" min-width="140" />
    <el-table-column prop="teacherName" label="讲师" min-width="80" />
    <el-table-column prop="introduction" label="简介" min-width="300" />
    <el-table-column prop="courseExamFrame" label="考试大纲" min-width="240" />
    <el-table-column prop="courseStartTime" label="创建时间" min-width="120" />
    <el-table-column prop="courseEndTime" label="结束时间" min-width="120" />
    <el-table-column prop="courseExamDate" label="考试时间" min-width="120" />
    <el-table-column prop="courseSelectedCount" label="选课学生人数" />
    <el-table-column prop="" label="操作" width="360" fixed="right">
    <template #default="scope">
      <el-popconfirm title="确认删除这个课程?" @confirm="handleDelete(scope.row)">
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>
     
      <el-button type="warning" @click="goCourseUpdate(scope.row)">更改</el-button>
      <el-button type="info" @click="goCourseDetail(scope.row)">详情</el-button>
    </template>
    </el-table-column>
  </el-table>
 </div>
</template>

<script setup>
import { ref,reactive, onMounted } from 'vue'
import {
 Plus
} from '@element-plus/icons-vue'
import { getCourseList,deleteCourse } from "@/api/index";
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/store/user'

const store = useUserStore()
const router = useRouter()
const dialogVisible = ref(false)
const formData = reactive({
  name:'',
  intro:'',
  cover:'',
  file:[]
})
const courseInfo = ref([
  {
    cover: "img/编程导论.jpeg",
    name: "计算机编程导论",
    teacher: "张伟",
    timeSpan: "8周",
    studentNum: 50,
  },
  {
    cover: "course2.jpg",
    name: "Web开发基础",
    teacher: "李晓",
    timeSpan: "12周",
    studentNum: 35,
  },
  {
    cover: "course3.jpg",
    name: "数据结构与算法",
    teacher: "王华",
    timeSpan: "10周",
    studentNum: 45,
  },
  {
    cover: "course4.jpg",
    name: "人工智能原理与应用",
    teacher: "刘明",
    timeSpan: "16周",
    studentNum: 60,
  },
  {
    cover: "course5.jpg",
    name: "数据库设计与管理",
    teacher: "陈琳",
    timeSpan: "8周",
    studentNum: 30,
  },
  {
    cover: "course6.jpg",
    name: "网络安全基础",
    teacher: "张强",
    timeSpan: "6周",
    studentNum: 25,
  },
  {
    cover: "course7.jpg",
    name: "移动应用开发",
    teacher: "杨婷",
    timeSpan: "12周",
    studentNum: 40,
  },
]);

const params = {
  "pageParam": {
    "pageNum": 1,
    "pageSize": 100,
  },
}
const getCourse = async() => {
  try{
    const {code,data } = await getCourseList(params)
    courseInfo.value = data.list
    if(store.isTeacher){
      courseInfo.value = data.list.filter(item => item.courseTeacherId == store.info.userId)
    }
  }catch(e){
    ElMessage.error('获取课程列表失败!')
  }
}

onMounted(()=>{
  getCourse()
});

const goCourseDetail = (item)=>{
  router.push('/course/detail')
  sessionStorage.setItem("courseInfo", JSON.stringify(item));
}

const goCourseUpdate = (item)=>{
  router.push('/course/create-course')
  sessionStorage.setItem("courseUpdateInfo", JSON.stringify(item));
}

const handleDelete = (row) => {
  try{
    const { code } = deleteCourse({courseId:row.courseId})
    if(code == 0 ){
      ElMessage.success('删除课程成功！')
      getCourse()
    }
  }catch(e){
    ElMessage.error(e)
  }
}
</script>

<style scoped>
.teacher-operation{
  display: flex;
  justify-content: flex-end;
}
.manage-wrap{
  width: 1160px;
  border-radius: 8px;
  padding: 16px;
  margin: 12px auto;
  background-color: #fff;
  /* height: calc(100vh - 140px); */
}
</style>