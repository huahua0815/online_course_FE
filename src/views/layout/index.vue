<script setup>
import { ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getAssetsFile } from "@/util/utils.js";
import { useUserStore } from '@/store/user'

const store = useUserStore()
const router = useRouter()
const isLogin = ref(false)
const imgPic = ref('')

const m = {
  'student': 'img/学生头像.png',
  'admin': 'img/管理员头像.png',
  'teacher': 'img/老师头像.png'
}
const menuInfoAdmin = [
  { name: "首页", icon: "HomeFilled", path: "/home" },
  { name: "课程中心", icon: "Collection", path: "/course/list" },
  { name: "课程管理", icon: "SetUp", path: "/course/manage" },
  { name: "用户管理", icon: "UserFilled", path: "/teacher1" },
  { name: "讲师管理", icon: "UserFilled", path: "/teacher" },
  { name: "留言管理", icon: "ChatSquare", path: "/discuss" },
  { name: "个人中心", icon: "Grid", path: "" },
];
const menuInfoStudent = [
  // { name: "首页", icon: "HomeFilled", path: "/home" },
  { name: "课程中心", icon: "Collection", path: "/course/list" },
  { name: "课程管理", icon: "SetUp", path: "/course/manage" },
  { name: "个人中心", icon: "Grid", path: "" },
];
const menuInfoTeacher = [
  { name: "课程中心", icon: "Collection", path: "/course/list" },
  { name: "课程管理", icon: "SetUp", path: "/course/manage" },
  { name: "个人中心", icon: "Grid", path: "" },
];
const menuInfo = ref([{ name: "首页", icon: "HomeFilled", path: "/home" },])
watch(() => store.getUserInfo, (newObj, oldObj) => {
  let role = newObj.role
  if (role) {
    imgPic.value = m[role]
    isLogin.value = true
    switch(role){
      case 'admin': 
        menuInfo.value = menuInfoAdmin
        break
      case 'student':
      menuInfo.value = menuInfoStudent
        break
      default:
      menuInfo.value = menuInfoTeacher
    }
  }
}, { immediate: true, deep: true })
const title = ref("在线课程系统");

const handleOpen = (key, keyPath) => { };
</script>

<template>
  <div class="layout-wrap">
    <div class="header">
      <div class="header-left">{{ title }}</div>
      <div class="header-right">
        <div class="login-text" v-if="!isLogin" @click="router.push('/login')">登录</div>
        <div v-else>
          <el-popover placement="bottom" :width="100" trigger="hover">
            <div class="login-out" @click="router.push('/login')">退出登录</div>
            <template #reference>
              <el-image :src="getAssetsFile(imgPic)"></el-image>
            </template>
          </el-popover>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main-left">
        <el-menu class="el-menu-vertical-demo" router default-active="/course/list">
          <el-menu-item v-for="(info, index) in menuInfo" :key="index" :index="info.path"
            :route="{ path: info.path }">
            <el-icon>
              <component :is="info.icon" />
            </el-icon> {{ info.name }}
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
.login-text {
  font-size: 16px;
  cursor: pointer;
}

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

    &-left {
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
.login-out{
  text-align: center;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  &:hover{
    background-color: #6ba3e456;
  }
}
</style>
