<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { getAssetsFile } from '@/util/utils.js'

const router = useRouter()

const title = ref("在线课程系统");
const menuInfoAdmin = [
    { name: "课程管理", icon: "SetUp", path: "/course/manage" },
    { name: "用户管理", icon: "User", path: "/teacher1" },
    { name: "讲师管理", icon: "Orange", path: "/teacher" },
    { name: "留言管理", icon: "ChatDotSquare", path: "/discuss" },
    { name: "考试管理", icon: "Calendar", path: "/exam/manage" },
    { name: "作业管理", icon: "School", path: "/homework" },
    { name: "通知管理", icon: "MessageBox", path: "/notice" },
];
</script>

<template>
    <div class="header">
        <div class="header-left">{{ title }}</div>
        <div class="header-right">
            <el-popover placement="bottom" :width="100" trigger="hover">
                <div class="login-out" @click="router.push('/login')">退出登录</div>
                <template #reference>
                    <el-image :src="getAssetsFile('img/管理员头像.png')"></el-image>
                </template>
            </el-popover>
        </div>
    </div>
    <div class="main">
        <div class="main-left">
            <el-menu class="el-menu-vertical-demo" router default-active="/home">
                <el-menu-item v-for="(info, index) in menuInfoAdmin" :key="index" :index="info.path"
                   >
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
</template>

<style scoped lang="scss">
.login-text {
    font-size: 16px;
    cursor: pointer;
}

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
    display: flex;
    background-color: #d9d7d752;

    &-left {
        width: 150px;
        height: calc(100vh - 60px);
    }

    &-right {
        display: flex;
        justify-content: center;
        width: calc(100% - 280px);
        margin: 0 auto;
        padding: 16px 24px;
        max-height: calc(100vh - 60px);
        overflow: auto;
    }
}

.login-out {
    text-align: center;
    height: 40px;
    line-height: 40px;
    cursor: pointer;

    &:hover {
        background-color: #6ba3e456;
    }
}


</style>
<style>
.el-menu {
  height: 100%;
}
</style>