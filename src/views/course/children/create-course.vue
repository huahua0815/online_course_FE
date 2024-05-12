<script setup>
import { reactive, ref } from 'vue';
import { useUserStore } from '@/store/user'
import { createCourse } from '@/api/index'

const store = useUserStore()
const formData = reactive({
  courseName: '',
  introduction: '',
  courseTeacherId:0,
  courseExamFrame: '',
  courseExamDate: '',
  typeId: 0,
  freeType: 0,
  freeType: '',
  courseStartTime: '',
  courseEndTime: ''
})

const coverUrl = ref('')
const payTypes = [
  { label: '免费', value: 0, },
  { label: '收费', value: 1, },
]

const params = new FormData()

const handleCoverChange = (file) => {
  coverUrl.value = URL.createObjectURL(file.raw)
  params.append('cover', file.raw)
}

const handleSubmit = async () => {
  // params.append('courseTeacherId', store.info.userId)
  formData.courseTeacherId = store.info.userId
  params.append('entity', JSON.stringify(formData))
  console.log('formData', formData)
  try{
    const {code,data} = await createCourse(params)
    if(code == 0){
      ElMessage.success('发布课程成功！')
    }else{
      ElMessage.error(message)
    }
  }catch(e){
    ElMessage.error('发布课程失败！')
  }
}

const handleFileChange = (file) => {
  console.log('file', file.raw)
  params.append('file', file.raw)
}

</script>

<template>
  <div class="create-course-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/course/list' }">课程中心</el-breadcrumb-item>
      <el-breadcrumb-item>发布课程</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content-wrap">
      <div class="form-wrap">
        <el-form :label-width="120">
          <el-form-item prop="course_name" label="课程名称">
            <el-input v-model="formData.courseName"></el-input>
          </el-form-item>
          <el-form-item prop="introduction" label="课程简介">
            <el-input v-model="formData.introduction"></el-input>
          </el-form-item>
          <el-form-item prop="courseExamFrame" label="课程考试大纲">
            <el-input type="textarea" v-model="formData.courseExamFrame"></el-input>
          </el-form-item>
          <el-form-item prop="cover" label="课程封面">
            <el-upload class="upload-demo mr-4" drag @change="handleCoverChange" :auto-upload="false" :show-file-list="false"
              accept=".jpg,.png,.jpeg">
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                拖拽文件到这或<em>点击上传</em>
              </div>
            </el-upload>
           <el-image v-if="coverUrl" :src="coverUrl" style="max-width: 200px; max-height: 120px;"></el-image>
          </el-form-item>
          <el-form-item prop="file" label="课程文件">
            <el-upload class="upload-demo" drag multiple @change="handleFileChange"  :auto-upload="false" :show-file-list="true">
              <el-icon class="el-icon--upload" ><upload-filled /></el-icon>
              <div class="el-upload__text">
                拖拽文件到这或<em>点击上传</em>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item prop="freeType" label="课程收费类型">
            <el-select v-model="formData.freeType" style="width: 240px">
              <el-option v-for="item in payTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="courseExamDate" label="课程考试时间">
            <el-date-picker v-model="formData.courseExamDate" type="datetime" placeholder="请选择课程考试时间" />
          </el-form-item>
          <el-form-item  label="课程开始时间">
            <el-date-picker v-model="formData.courseStartTime" type="datetime" placeholder="请选择课程开始时间" />
          </el-form-item>
          <el-form-item prop="name" label="课程结束时间">
            <el-date-picker v-model="formData.courseEndTime" type="datetime" placeholder="请选择课程结束时间" />
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="handleSubmit">创建</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.create-course-wrap {
  .content-wrap {
    padding: 24px;
    background-color: #fff;
    width: 1200px;
    margin: 24px auto;
  }

  .form-wrap {
    width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>

<style>
.el-upload-dragger .el-icon--upload svg {
  width: 40px;
  height: 40px;
}

.el-upload-dragger {
  width: 200px;
  height: 120px;
  padding: 6px;
}
.el-image__inner{
  border-radius: 4px;
}
</style>
