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
          :src="info.cover"
          style="width: 260px; height: 160px"
          fix="cover"
        ></el-image>
      </div>
      <div class="course-detail-info-right">
        <div class="info-detail-item name">{{ info.courseName }}</div>
        <div class="info-detail-item">{{ info.teacherName }}</div>
        <div class="info-detail-item timespan">
          课程考试时间：
          {{ info.courseExamDate }}
        </div>
        <!-- <el-button v-if="store.isStudent" type="primary">开始学习</el-button> -->
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
            <div class="detail-into-item">
              <div class="detail-intro-item-title">
                <el-icon color="#409eff" size="16"><Calendar /></el-icon>
                <span>课程文件</span>
              </div>
              <div class="detail-intro-item-content">
                <a style="color: #409eff;" class="pl-4" :href="downloadHref" :download="`${info.courseName}.zip`">
                  点这里下载
                </a>
              
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="课程留言" name="discuss">
          <div class="panel-wrap">
            <div class="flex justify-end">   <el-button  type="primary" :icon="Plus"  @click="addComment"/></div>
            <div class="message-box" v-for="(item, index) in commentList">
              <div class="message-ask" @click="addReply(item.comment.commentId)">
                <div class="message-ask-left">
                  <img :src="getAssetsFile('img/学生头像.png')" alt="" />
                </div>
                <div class="message-ask-right">
                  <div class="message-ask-right-name">{{ item.comment.commentUserName }}</div>
                  <div class="message-ask-right-word">{{ item.comment.comment }}</div>
                  <div class="message-ask-right-createtime">
                    {{ item.commentTm }}
                  </div>
                </div>
              </div>
              <div class="message-answer" v-for="(reply, index) in item.replyList">
                <div class="message-answer-left">
                  <img :src="getAssetsFile('img/老师头像.png')" alt="" />
                </div>
                <div class="message-answer-right">
                  <div class="message-answer-right-name">{{ reply.commentUserName }}</div>
                  <div class="message-answer-right-word">{{ reply.comment }}</div>
                  <div class="message-answer-right-createtime">
                    {{ item.replyTm }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="课程作业" name="homework">
          <div class="panel-wrap">
            <div class="homework-item" v-for="(item, index) in homeworkList">
            <el-button @click="handleGoHomeworkDetail(index)" link type="primary">{{ item.name }}</el-button></div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
    v-model="dialogVisible"
    :title="operation == 'comment' ? '发布留言' : '回复留言'"
    width="500"
  >
    <el-input type="textarea" v-model="comment"></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handlePost">
          发布
        </el-button>
      </div>
    </template>
  </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { getAssetsFile } from "@/util/utils.js";
import { getCourseFileList,createComment, getCommentList, createReply,getSCByStudentId,getHomeworkList } from "@/api/index";
import {
 Plus
} from '@element-plus/icons-vue'
import JSZip from 'jszip'
import { useUserStore } from '@/store/user'
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

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
  typeName:'',
  cover:''
 });

 const getScStudentId = async()=>{
  const {data,code } = await getSCByStudentId({studentId:store.info.userId})
 }

 const homeworkList = ref([])
 const getHomeworkAll = async()=>{
  const {data,code } = await getHomeworkList({courseId:info.courseId})
  homeworkList.value = data
 }

 onMounted(()=>{
  getCommentInfo()
  getScStudentId()
  getHomeworkAll()
 })

 const downloadHref= ref('')
watch(()=>sessionStorage.getItem('courseInfo'), async(newVal)=>{
  let obj = JSON.parse(newVal)
  Object.assign(info, obj)
  const response = await getCourseFileList([info.courseId])
    const zip = new JSZip()
    zip.loadAsync(response).then((res) => {
	  console.log('111',res.files) // 每个file
    let zipName = '',imgName = ''
    for(let name of Object.keys(res.files)){
      if(name.endsWith('.zip')){
        zipName = name
      }else{
        imgName = name
      }
    }
    zip.file(imgName).async('base64').then((data) => {
    let imgBase64 = 'data:image/jpeg;base64,' + data
    // let url = window.URL.createObjectURL(temp);
    info.cover = imgBase64
    })
    zip.file(zipName).async('blob').then((zipfile) => {
      console.log('zipfile', zipfile.files)
      const fileZip = new Blob([zipfile], { type: 'application/zip' })
      
      downloadHref.value = URL.createObjectURL(fileZip)

    })
})
}
,{
  deep:true,immediate: true
})

const operation = ref('comment')

const handlePost = ()=>{
  if(operation.value == 'comment'){
    handlePostMessage()
  }
  if(operation.value == 'reply'){
    handleAddReply(curCommentId.value)
  }
}

const comment = ref('')
const curCommentId = ref(-1)
const handlePostMessage = async()=>{
  try{
    const params = {
      comment:comment.value,
      commentUserId: store.info.userId,
      courseId: info.courseId,
      commentPrivilege: store.isTeacher ? 'teacher' :'student'
    }
    const { code ,data} = await createComment(params)
    if(code == 0){
      ElMessage.success('评论成功！')
      getCommentInfo()
    }
  }catch(e){
    ElMessage.error(e)
  }finally{
    dialogVisible.value = false
    comment.value = ''
  }
}

const handleAddReply = async(commentId)=>{
  try{
    const params = {
      comment:comment.value,
      commentUserId: store.info.userId,
      courseId: info.courseId,
      commentPrivilege: 'teacher',
      commentId
    }
    const { code ,data} = await createReply(params)
    if(code == 0){
      ElMessage.success('回复成功！')
      getCommentInfo()
    }
  }catch(e){
    ElMessage.error(e)
  }finally{
    dialogVisible.value = false
    comment.value = ''
  }
}

const addComment = ()=>{
  operation.value = 'comment'
  dialogVisible.value = true
}
const addReply = ( commentId)=>{
  operation.value = 'reply'
  dialogVisible.value = true
  curCommentId.value = commentId

}
const handlePostHomeWork = ()=>{
  router.push('/create-homework')
}

const commentList = ref([])
const getCommentInfo = async()=>{
  const {data} =await getCommentList({courseId: info.courseId})
  commentList.value = data
}

const handleGoHomeworkDetail =(index)=>{
  sessionStorage.setItem('homework', JSON.stringify(homeworkList.value[index]))
  router.push('/homework-detail')
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
.message-ask{
  &:hover{
    background-color: #b5c6e355;
    cursor: pointer;
  }
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
  // position: absolute;

display: flex;
justify-content: flex-end;
}
</style>
