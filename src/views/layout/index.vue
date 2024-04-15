<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const title = ref("在线课程系统");
const menuInfo = [
  { name: "首页", icon: "HomeFilled", path: "/home" },
  { name: "课程中心", icon: "Collection", path: "/course/list" },
  { name: "个人中心", icon: "Grid", path: "" },
];
const handleOpen = (key, keyPath) => {};
</script>

<template>
  <div class="layout-wrap">
    <div class="header">
      <div class="header-left">{{ title }}</div>
      <div class="header-right"></div>
    </div>
    <div class="main">
      <div class="main-left">
        <el-menu default-active="2" class="el-menu-vertical-demo" router>
          <el-menu-item
            v-for="(info, index) in menuInfo"
            :key="index"
            :index="`${index + 1}`"
            :route="{ path: info.path }"
          >
            <el-icon><component :is="info.icon" /> </el-icon> {{ info.name }}
          </el-menu-item>
        </el-menu>
      </div>
      <div class="main-right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-wrap {
  width: 100%;
  .header {
    height: 60px;
    display: flex;
    padding: 0 40px;
    justify-content: space-between;
    align-items: center;
    background-color: #779fcc;
    color: #ffffff;
    font-size: 20px;
  
    &-left{
      color: #ffffff;
      font-weight: 500;
      font-size: 18px;
    }
  }
  .main {
    height: calc(100vh - 60px);
    display: flex;
    &-left {
      width: 150px;
      height: 100%;
    }
    &-right {
      background: #e8e8e857;
      flex: 1;
      display: flex;
      justify-content: center;
    }
  }
}

.el-menu {
  height: 100%;
}
</style>
