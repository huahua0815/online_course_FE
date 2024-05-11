<script setup>
import { onMounted,ref } from 'vue';
import {getNoticeList} from '@/api/index'

const tableData = ref([])
const params = {
  "content": "",
  "pageParam": {
    "endRow": 0,
    "hasNextPage": true,
    "hasPreviousPage": true,
    "isFirstPage": true,
    "isLastPage": true,
    "list": [
      null
    ],
    "navigateFirstPage": 0,
    "navigateLastPage": 0,
    "navigatePages": 0,
    "navigatepageNums": [
      0
    ],
    "nextPage": 0,
    "pageNum": 1,
    "pageSize": 20,
    "pages": 0,
    "prePage": 0,
    "size": 0,
    "startRow": 0,
    "total": 0
  },
  "title": ""
}
onMounted(async()=>{
    const { data } = await 
    getNoticeList(params)
    tableData.value = data.list
})
</script>

<template>
  <div class="notice-wrap">
    <el-table :data="tableData">
        <el-table-column prop="noticeId" label="公告标题"></el-table-column>
    </el-table>
  </div>
</template>

<style scoped>

</style>
