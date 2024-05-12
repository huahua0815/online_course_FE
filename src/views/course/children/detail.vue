<template>
  <div class="course-detail">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/course/list' }"
        >课程列表</el-breadcrumb-item
      >
      <el-breadcrumb-item>{{ info.courseName }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="course-detail-info">
      <div class="course-detail-info-left">
        <el-image
          :src="getAssetsFile(info.cover)"
          style="width: 260px; height: 160px"
          fix="cover"
        ></el-image>
      </div>
      <div class="course-detail-info-right">
        <div class="info-detail-item name">{{ info.name }}</div>
        <div class="info-detail-item">{{ info.teacher }}</div>
        <div class="info-detail-item timespan">
          课程考试时间：
          {{ info.courseExamDate }}
        </div>
        <el-button v-if="store.isStudent" type="primary">开始学习</el-button>
        <el-button v-if="store.isTeacher ||store.isAdmin" @click="handlePostHomeWork" type="primary">发布作业</el-button>
      </div>
    </div>
    <div class="course-detail-intro">
      <el-tabs
        v-model="activeName"
        class="demo-tabs"
        @tab-click="handleTabChange"
      >
        <el-tab-pane label="课程详情" name="detail">
          <div class="panel-wrap">
            <div class="detail-into-item">
              <div class="detail-intro-item-title">
                <el-icon color="#409eff" size="16"><Collection /></el-icon>
                <span>课程简介</span>
              </div>
              <div class="detail-intro-item-content">{{ info.introduction }}</div>
            </div>
            <div class="detail-into-item">
              <div class="detail-intro-item-title">
                <el-icon color="#409eff" size="16"><Calendar /></el-icon>
                <span>考试大纲</span>
              </div>
              <div class="detail-intro-item-content">
                <!-- <el-tree
                  style="max-width: 400px"
                  :data="courseData"
                  :props="defaultProps"
                  @node-click="handleNodeClick"
                /> -->
                {{ info.courseExamFrame }}
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="课程留言" name="discuss">
          <div class="panel-wrap">
            <el-button class="add-message" type="primary" :icon="Plus" size="large" @click="dialogVisible= true"/>
            <div class="message-box" v-for="(item, index) in discuss">
              <div class="message-ask">
                <div class="message-ask-left">
                  <img :src="getAssetsFile('img/学生头像.png')" alt="" />
                </div>
                <div class="message-ask-right">
                  <div class="message-ask-right-name">学生{{ index + 1 }}</div>
                  <div class="message-ask-right-word">{{ item.question }}</div>
                  <div class="message-ask-right-createtime">
                    {{ item.questionTime }}
                  </div>
                </div>
              </div>
              <div class="message-answer">
                <div class="message-answer-left">
                  <img :src="getAssetsFile('img/老师头像.png')" alt="" />
                </div>
                <div class="message-answer-right">
                  <div class="message-answer-right-name">老师</div>
                  <div class="message-answer-right-word">{{ item.answer }}</div>
                  <div class="message-answer-right-createtime">
                    {{ item.answerTime }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="课程作业" name="homework">
          <div class="panel-wrap">
        
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
    v-model="dialogVisible"
    title="发布留言"
    width="500"
  >
    <el-input type="textarea"></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handlePostMessage">
          发布
        </el-button>
      </div>
    </template>
  </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { getAssetsFile } from "@/util/utils.js";
import {
 Plus
} from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user'
import { useRouter } from "vue-router";

const router = useRouter()
const store = useUserStore()
const activeName = ref("detail");
const dialogVisible = ref(false)
const info = reactive({
  courseId:-1,
  introduction:'',
  freeType: 0,
  courseExamFrame:'',
  courseStartTime:'',
  courseEndTime:'',
  courseExamDate:'',
  typeName:''
 });

watch(()=>sessionStorage.getItem('courseInfo'), (newVal)=>{
  let obj = JSON.parse(newVal)
  Object.assign(info, obj)
  
},{
  deep:true,immediate: true
})

const courseData = [
  { label: "第一章：计算机概述" },
  { label: "第二章：计算机中的数据" },
  { label: "第三章：Python语言及应用" },
  { label: "第四章：程序设计引导" },
  { label: "第五章：操作系统简介" },
  { label: "第六章：计算机网络与物联网" },
  { label: "第七章：数据库系统概论" },
];

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

const defaultProps = {
  children: "children",
  label: "label",
};
const handleTabChange = () => {};

const handlePostMessage = ()=>{

}

const handlePostHomeWork = ()=>{
  router.push('/create-homework')
}
</script>

<style scoped lang="scss">
@import "@/style/common.scss";
.course-detail {
  margin: 16px auto;
  width: 100%;
  &-info {
    margin: 10px auto;
    min-width: 400px;
    height: 220px;
    background-color: #fff;
    border-radius: 8px;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    &-right {
      margin-left: 16px;
    }
  }
  &-intro {
    box-sizing: border-box;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 8px;
    margin-top: 20px;
    padding: 16px;
  }
}
.info-detail-item {
  margin-bottom: 6px;
  &.name {
    font-size: 20px;
  }
  &.timespan {
    color: $active-color;
    margin-bottom: 20px;
  }
}
.detail-intro-item {
  &-title {
    display: flex;
    align-items: center;
    & span {
      margin-left: 4px;
      font-weight: 500;
      color: $active-color;
    }
  }
  &-content {
    color: $text-plain-color;
  }
}
.message-box {
  margin-bottom: 12px;
}
.message-ask,
.message-answer {
  display: flex;
  &-left {
    margin-right: 16px;
  }
  &-right {
    &-name {
      margin-bottom: 4px;
    }
    &-word {
      color: $text-plain-color;
      margin-bottom: 4px;
    }
    &-createtime {
      color: $text-plain-color;
      font-size: 12px;
    }
  }
}
.message-answer {
  padding: 8px;
  margin-left: 16px;
  margin-top: 8px;
  width: 80%;
  background: #cccccc3d;
  border-radius: 4px;
}
.panel-wrap {
  max-height: calc(100vh - 500px);
  overflow: auto;
  position: relative;
}
.add-message{
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>
