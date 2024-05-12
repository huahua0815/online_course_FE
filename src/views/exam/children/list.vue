<script setup>
import {DArrowRight,Edit }  from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user'
import { getExamList } from '@/api/index'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus';

const store = useUserStore()
const router = useRouter()
const list  = ref([])

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
    list.value = data.list
  }catch(e){
    ElMessage.error('获取考试列表失败!')
  }
}

const goTakeExam = (item)=>{
  console.log(item)
  router.push({name:'TakeExam'})
  sessionStorage.setItem('exam', JSON.stringify(item))
}
</script>

<template>
  <div class="exam-list-wrap">
    <div class="teacher-operation flex justify-start mb-4">
        <el-button type="primary" v-if="store.isTeacher" :icon="Edit" size="small" @click="router.push({name:'CreateExam'})">发布考试</el-button>
    </div>
   <div class="exam-list">
    <div class="exam-list-card" v-for="item, index in list" :key="index">
        <div class="name">{{ item.name }}</div>
        <div>
            <span class="card-title">考试课程：</span>{{ item.courseName }}
        </div>
        <div class="starttime ">
            <span class="card-title">开始时间：</span>{{ item.startTime }}</div>
         <div class="end-time">
            <span class="card-title">结束时间：</span>{{ item.endTime }}</div>
        <div class="creator">
            <span class="card-title">发布者：</span>{{ item.creator }}</div>
            <div class="operation flex justify-end">
                <el-button type="primary" :icon="DArrowRight" size="small" @click="goTakeExam(item)">进入考试</el-button>
            </div>
    </div>
   </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/style/common.scss";

.exam-list-wrap {
   
    .exam-list{
        color: $text-plain-color;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    }
}
.exam-list-card {
    background-color: #fff;
    width: 320px;
    padding: 16px;
    border-radius: 6px;
    box-shadow: 3px 1px 5px 1px rgba(0, 0, 0, 0.08);
    .name{
        color: $text-primary-color;
        margin-bottom: 8px;
    }
}
.card-title{
    font-size: 12px;
}
</style>
