<script setup>

</script>

<template>
   <el-menu :default-active="activeIndex" class="el-menu-wrap" mode="horizontal" :ellipsis="false"
      background-color="#CADFF6C4" text-color="#7e7e7e" @select="handleSelect" router default-active="/course/list">
      <el-menu-item index="/user">
        <span class="title">在线课程系统-教师端</span>
      </el-menu-item>
      <div class="flex-grow"></div>
      <el-menu-item index="/course/list" >课程中心</el-menu-item>
      <el-menu-item index="/exam">考试中心</el-menu-item>
      <el-menu-item index="/notice">通知中心</el-menu-item>
      <el-sub-menu index="3">
        <template #title>个人中心</template>
        <el-menu-item index="3-1" >我的课程</el-menu-item>
        <el-menu-item index="3-2">我的回复</el-menu-item>
        <el-menu-item index="3-3">我发布的考试</el-menu-item>
        <el-menu-item index="3-4">我发布的作业</el-menu-item>
        <el-menu-item index="3-5">我发布的通知</el-menu-item>
        <el-menu-item index="3-6">个人资料</el-menu-item>
        <el-menu-item index="/login">退出登录</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/login">后台中心</el-menu-item>
    </el-menu>
   <div class="student-content-wrap">
      <router-view></router-view>
   </div>
</template>

<style scoped lang="scss">
.student-content-wrap {
  padding:16px 24px;
  background-color: #d9d7d752;
  min-height: calc(100vh - 60px);
}
</style>
