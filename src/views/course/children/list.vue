<script setup>
import { reactive, ref, onMounted } from "vue";
import { getAssetsFile } from "@/util/utils.js";
import { useRouter } from "vue-router";
import { Edit } from "@element-plus/icons-vue";
import { getCourseList,getCourseFileList } from "@/api/index";
import JSZip from 'jszip'
import {ElMessage} from 'element-plus'
const router = useRouter();

const handleGoDetail = (item) => {
  router.push({ name: "CourseDetail" });
  sessionStorage.setItem("courseInfo", JSON.stringify(item));
};

const params = {
  "pageParam": {
    "pageNum": 1,
    "pageSize": 100,
  },
}
onMounted(async() => {
  // try{
    const {code,data } = await getCourseList(params)
    courseInfo.value = data.list
    const idArr = data.list.map(item=>item.courseId)
    const response = await getCourseFileList([350417])
  //   const blob =
  //   Object.prototype.toString.call(response) === "[object Blob]"
  //     ? response
  //     : new Blob([response], { type: "application/zip" });
  // // new Blob([data])用来创建URL的file对象或者blob对象
  // let url = window.URL.createObjectURL(blob);
  // // 生成一个a标签
  // let link = document.createElement("a");
  // link.style.display = "none";
  // link.href = url;
  // // 生成时间戳
  // let timestamp = new Date().getTime();
  // link.download = `${timestamp}.zip`;
  // document.body.appendChild(link);
  // link.click();
  // document.body.removeChild(link);
    const zip = new JSZip()
    zip.loadAsync(response).then((res) => {
	  consol.log(res.files) // 每个file
}) 

  // }catch(e){
  //   ElMessage.error(e)
  //   ElMessage.error('获取课程列表失败!')
  // }
});

const courseInfo = ref([
  {
    cover: "img/编程导论.jpeg",
    name: "计算机编程导论",
    teacher: "张伟",
    timeSpan: "8周",
    studentNum: 50,
  },
  {
    cover: "img/web.png",
    name: "Web开发基础",
    teacher: "李晓",
    timeSpan: "12周",
    studentNum: 35,
  },
  {
    cover: "img/数据结构.png",
    name: "数据结构与算法",
    teacher: "王华",
    timeSpan: "10周",
    studentNum: 45,
  },
  {
    cover: "img/人工智能.png",
    name: "人工智能原理与应用",
    teacher: "刘明",
    timeSpan: "16周",
    studentNum: 60,
  },
  {
    cover: "img/数据库.png",
    name: "数据库设计与管理",
    teacher: "陈琳",
    timeSpan: "8周",
    studentNum: 30,
  },
  {
    cover: "img/网络安全.png",
    name: "网络安全基础",
    teacher: "张强",
    timeSpan: "6周",
    studentNum: 25,
  },
  {
    cover: "img/移动应用.png",
    name: "移动应用开发",
    teacher: "杨婷",
    timeSpan: "12周",
    studentNum: 40,
  },
  {
    cover: "img/计算机图形学.png",
    name: "计算机图形学",
    teacher: "刘博",
    timeSpan: "10周",
    studentNum: 30,
  },
  {
    cover: "img/操作系统.png",
    name: "操作系统原理",
    teacher: "王刚",
    timeSpan: "10周",
    studentNum: 50,
  },
  {
    cover: "course10.jpg",
    name: "云计算与大数据",
    teacher: "赵丽",
    timeSpan: "8周",
    studentNum: 55,
  },
]);

const handleAddCourse = () => {
  router.push('/course/create-course')
}
</script>

<template>
  <div class="course-list-wrap">
    <div class="flex justify-start mb-4">
      <el-button type="primary" :icon="Edit" @click="handleAddCourse">发布课程</el-button>
    </div>
    <div class="course-list">
    <div
      class="course-card"
      v-for="info in courseInfo"
      :key="info"
      @click="handleGoDetail(info)"
    >
      <div class="course-cover">
        <el-image
          :src="getAssetsFile(info.cover)"
          style="width: 260px; height: 160px"
          fix="cover"
        ></el-image>
      </div>
      <div class="course-text-info">
        <div class="course-name">{{ info.courseName }}</div>
        <div class="course-teacher">{{ info.teacher }}</div>
        <div class="course-info">
          <div class="course-info-left">{{ `开始时间:${info.courseStartTime}` }}</div>
          <div class="course-info-right" style="color:#eca565;font-size: 14px;">{{ `${info.freeType == 0 ? '免费' : '付费'}` }}</div>
        </div>
      </div>
    </div>
  </div>
  </div>

</template>

<style scoped lang="scss">
@import "@/style/common.scss";
.course-wrap {
  display: flex;
  justify-content: center;
}
.course-list {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.course-card {
  width: 260px;
  height: 280px;
  cursor: pointer;
  border-radius: 8px;
  background-color: #fff;
  &:hover {
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.12);
  }
  .course-cover {
    width: 260px;
    height: 160px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    overflow: hidden;
  }
  .course-name {
    font-weight: 500;
    margin-bottom: 8px;
  }
  .course-text-info {
    padding: 8px;
  }
  .course-info {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    &-left {
      color: $active-color;
      font-size: 12px;
    }
    &-right {
      color: $text-plain-color;
      font-size: 12px;
    }
  }
}
</style>
