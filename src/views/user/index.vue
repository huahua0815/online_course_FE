<template>
<div class="user-front-wrap">
  <el-menu
    :default-active="activeIndex"
    class="el-menu-wrap"
    mode="horizontal"
    :ellipsis="false"
    background-color="#CADFF6C4"
    text-color="#7e7e7e"
    @select="handleSelect"
  >
    <el-menu-item index="0">
    <span class="title">在线课程系统-学生端</span>
    </el-menu-item>
    <div class="flex-grow" ></div>
    <el-menu-item index="1">课程中心</el-menu-item>
    <el-menu-item index="2">考试及作业</el-menu-item>
    <el-sub-menu index="3">
      <template #title>个人中心</template>
      <el-menu-item index="3-1">我的课程</el-menu-item>
      <el-menu-item index="3-2">我的留言</el-menu-item>
      <el-menu-item index="3-3">我的考试</el-menu-item>
      <el-menu-item index="3-4">我的作业</el-menu-item>
      <el-menu-item index="3-5">我的学习进度</el-menu-item>
      <el-menu-item index="3-6">个人资料</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="4">后台中心</el-menu-item>
  </el-menu>
  <div class="content-wrap">
   <div class="recommend-area">
   <div class="recommend-area-left">
      <span class="mb-4">精品课程分类</span>
      <div class="course-type-item" v-for="(item, index) in courseTypes" :key="index">
        <div class="type">{{ item.type }}</div>
       <div class="type-list">
        <div class="type-detail" v-for="(item1,index1) in item.typeList">{{ item1 }} /</div>
       </div>
      </div>
   </div>
   <div class="recommend-area-right">
    <el-carousel height="300px">
      <el-carousel-item v-for="item,index in 5" :key="item">
       <el-image style="width: 640px;min-height: 300px; object-fit: cover;" :src="getAssetsFile(`img/recommend/recommend${index+1}.jpeg`)">  </el-image>
      </el-carousel-item>
    </el-carousel>
   </div>
   <div class="user-info">
     <div class="user-info-item">
      <el-image style="width: 32px; height:32px" :src="getAssetsFile('img/学生头像.png')"></el-image>
      <span class="ml-4">小明</span>
    </div>
    <div class="user-info-item">
     正在学习:
    </div>
    <div class="user-info-item">
       <div class="course-learning-now ">
         <div class="course-learning-now-item" v-for="item in learningNow">
        {{ item }}</div>
       </div>
    </div>
    <div class="user-info-item mt-14 justify-center">
      <el-button type="primary">继续学习</el-button>
   </div>
   </div>
   </div>
   <div class="notice-area">
    <div class="title">通知中心</div>
    <div class="notice-list-wrap">
      <el-card style="max-width: 300px" v-for="(item,index) in noticeList">
    <template #header>
      <div class="card-header">
        <span>{{ item.title }}</span>
      </div>
    </template>
    <div class="card-content"> {{ item.content }}</div>
    <template #footer>
      <div class="flex space-between">
        <span class="name">{{ item.name }}</span>
        <span class="time">{{ item.time }}</span>

      </div>
    </template>
  </el-card>
    </div>
   </div>
  </div>
</div>
</template>

<script setup>
import { getAssetsFile } from "@/util/utils.js";
 const courseTypes = [
  {type:'计算机', typeList: ['大数据与人工智能','算法'] },
  {type:'外语', typeList: ['口语', '写作', '翻译'] },
  {type:'考研', typeList: ['数学','英语','政治'] },
  {type:'四六级', typeList: ['雅思','专四专八'] },
  {type:'专升本', typeList: ['河南','广东','浙江'] },
  {type:'期末冲刺', typeList: ['高数','线性代数','概率论'] },
  {type:'认证教育', typeList: ['工科','理科','文科'] },
  ]
  const learningNow = [
    '计算机基础','大数据与人工智能','算法'
  ]

  const noticeList =[
  {title:'关于考试批改的通知', content:'各位同学：你们好！本次课程考试的批改工作已经完成。大家可以登录在线课程管理系统查看自己的考试成绩。请大家认真核对成绩，如有疑问，请在2024.5.16前与我联系。希望大家能从考试中总结经验，不断进步。', creattime:'2024.5.15',name:'教师苏轩'},
    {title:'系统通知', content:'尊敬的用户：您好！为了给您提供更好的服务，在线课程管理系统将于2024.5.10进行维护升级。维护期间，系统功能可能会受到一定影响，具体如下：1.部分功能暂时无法使用。2.可能出现页面加载缓慢或显示异常。我们将尽最大努力缩短维护时间，确保系统尽快恢复正常运行。如您在使用过程中遇到任何问题，请及时联系我们的客服团队，联系电话18241576022感谢您的理解与支持，给您带来的不便，敬请谅解！', creattime:'2024.4.20',name:'系统管理员'},
    {title:'课程发布作业的通知', content:'各位同学：大家好！通过在线课程管理系统，我将为大家发布本次课程的作业。具体信息如下：作业名称：数据结构与算法提交截止时间：2024.5.12作业要求及相关说明已在系统中详细列出，请大家及时登录系统查看并认真完成作业。如有任何疑问，请随时与我联系。', creattime:'2024.5.15',name:'教师王芳'}

  ]
</script>

<style scoped lang="scss">
@import "@/style/common.scss";
.user-front-wrap{
  min-width: 1200px;
 
}
.el-menu-wrap{
  width: 100%;
}
.title{
  color: #409eff;
  font-size: 16px;
}
.flex-grow {
  flex-grow: 1;
}
.content-wrap{
  background-color: rgb(240 239 239 / 86%);
  padding: 10px 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.recommend-area{
  display: flex;
  margin:0 auto;
  &-left{
    width: 160px;
    background-color: #fff;
    border-radius: 6px;
    padding: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .course-type-item{
      display: flex;
      padding: 6px 8px;
      cursor: pointer;
      .type{
        font-size: 14px;
        color: #444444c6;
        margin-right: 10px;
      }
      .type-list{
        display: flex;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
       
      }
      .type-detail{
        font-size: 12px;
        color: $text-plain-color;
      }
      &:hover{
        background-color: #40a0ff28;
        .type,.type-detail{
          color: $active-color;
          transform: scale(1.05);
      }
      }
    }
  }
  &-right{
    width: 560px;
   
  }
}
.user-info{
  background-color: #fff;
  width: 160px;
  border-radius: 6px;
  padding: 12px;
  color: $text-plain-color;
}
.user-info-item{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.course-learning-now{
  padding-left: 6px;
  display: flex;
  flex-direction: column;
  &-item{
    margin-bottom: 6px;
  }
}
.notice-area{
  width: 880px;
  margin-top: 20px;
  .card-content{
    height: 126px;
    display: -webkit-box;
  -webkit-line-clamp: 6; /* number of lines to show */
  -webkit-box-orient: vertical;
  overflow: hidden;
  }
  .notice-list-wrap{
    display: flex;
    gap: 12px;
  }
}
</style>