<template>
<div class="user-front-wrap">
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
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
    <el-menu-item index="4">后台</el-menu-item>
  </el-menu>
  <div class="content-wrap">
   <div class="recommend-area">
   <div class="recommend-area-left">
      <span>精品课程</span>
      <div class="course-type-item" v-for="(item, index) in courseTypes" :key="index">
        <div class="type">{{ item.type }}</div>
       <div class="type-list">
        <div class="type-detail" v-for="(item1,index1) in item.typeList">{{ item1 }} /</div>
       </div>
      </div>
   </div>
   <div class="recommend-area-right">
    <el-carousel height="460px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
   </div>
   </div>
  </div>
</div>
</template>

<script setup>
 const courseTypes = [
  {type:'计算机', typeList: ['大数据与人工智能','算法'] },
  {type:'外语', typeList: ['口语', '写作', '翻译'] },
  {type:'考研', typeList: ['数学','英语','政治'] },
  {type:'四六级', typeList: ['雅思','专四专八'] },
  {type:'专升本', typeList: ['河南','广东','浙江'] },
  ]
</script>

<style scoped lang="scss">
@import "@/style/common.scss";

.title{
  color: #409eff;
  font-size: 16px;
}
.flex-grow {
  flex-grow: 1;
}
.content-wrap{
  background-color: rgb(240 239 239 / 26%);
  padding: 10px 30px;
}
.recommend-area{
  display: flex;
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
      padding: 4px 8px;
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
</style>