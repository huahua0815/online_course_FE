<template>
 <div class="discuss-wrap">
  <el-table :data="data" :height="tableHeight">
    <el-table-column prop="type" label="留言类型" width="120" />
    <el-table-column prop="content" label="留言内容" min-width="300"/>
    <el-table-column prop="createtime" label="发布时间" width="180" />
    <el-table-column prop="" label="操作" width="300">
      <el-button type="danger" >删除</el-button>
      <el-button type="warning" >更改</el-button>
      <el-button type="info" >详情</el-button>
    </el-table-column>
  </el-table>
 </div>
</template>

<script setup>
import { ref,reactive, onMounted } from 'vue'
import {
 Plus
} from '@element-plus/icons-vue'

const discuss = [
  {
    question: "什么是编程语言？",
    answer:
      "编程语言是一种用于与计算机进行交流的人工语言，它定义了一组指令和规则，用于编写计算机程序。",
    questionTime: "2024-04-01 09:30",
    answerTime: "2024-04-01 10:15",
  },
  {
    question: "编程导论课程会涵盖哪些内容？",
    answer:
      "编程导论课程将介绍计算机编程的基本概念，包括算法、数据结构、编程范式等内容。",
    questionTime: "2024-04-02 14:15",
    answerTime: "2024-04-02 15:00",
  },
  {
    question: "我需要具备哪些先修知识才能参加编程导论课程？",
    answer:
      "编程导论课程不要求先修知识，它适合初学者入门。只要你对计算机编程感兴趣，就可以参加。",
    questionTime: "2024-04-03 10:45",
    answerTime: "2024-04-03 11:30",
  },
  {
    question: "编程导论课程有哪些学习资源可用？",
    answer: "我们提供课程讲义、在线学习平台和编程练习题等学习资源供学生使用。",
    questionTime: "2024-04-04 16:20",
    answerTime: "2024-04-04 17:00",
  },
  {
    question: "哪种编程语言会在编程导论课程中使用？",
    answer: "编程导论课程中将使用Python作为主要的编程语言进行教学和实践。",
    questionTime: "2024-04-05 11:30",
    answerTime: "2024-04-05 12:15",
  },
  {
    question: "导论课程是否会有编程作业？",
    answer:
      "是的，编程导论课程将包含一些编程作业，以帮助学生巩固所学的概念和技能。",
    questionTime: "2024-04-06 13:45",
    answerTime: "2024-04-06 14:30",
  },
  {
    question: "导论课程是否有期末考试？",
    answer:
      "编程导论课程将有一个综合性的期末项目，用于评估学生对所学知识的理解和应用能力。",
    questionTime: "2024-04-08 15:20",
    answerTime: "2024-04-08 16:00",
  },
  {
    question: "有没有推荐的参考书籍？",
    answer:
      "我们会提供一份推荐书单，包含一些优秀的编程导论相关的书籍供学生参考阅读。",
    questionTime: "2024-04-09 10:30",
    answerTime: "2024-04-09 11:15",
  },
];
const tableHeight = ref(900)

const data = ref([])
onMounted(()=>{
  discuss.forEach(item=>{
    if(item.question.length>0){
      data.value.push({content:item.question, type:'question',createtime:item.questionTime})
    }
    if(item.answer.length>0){
      data.value.push({content:item.answer, type:'answer',createtime:item.answerTime})
    }
  })
  tableHeight.value = `${window.innerHeight - 140}`
})
</script>

<style scoped>
.discuss-wrap{
  width: 900px;
  border-radius: 8px;
  padding: 16px;
  margin: 12px auto;
  background-color: #fff;
  height: calc(100vh - 140px);
}
</style>