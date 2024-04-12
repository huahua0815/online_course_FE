<template>
<div class="login-wrap">
 <div class="login-wrap-left">
  <img id="login-bg" :src="getAssetsFile('img/login-bg.svg')" alt="">
 </div>
 <div class="login-wrap-right">
  <div class="login-box">
    <div class="welcome">
        <p> 欢迎使用<span style="color:">在线课程系统</span>🎉</p>
    </div>
    <el-form :label-width="60">
      <el-form-item label="用户名">
        <el-input/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input/>
      </el-form-item>
      <el-form-item label="角色">
        <el-radio-group v-model="role" >
      <el-radio-button label="学生" value="student" />
      <el-radio-button label="教师" value="teacher" />
      <el-radio-button label="管理员" value="admint" />
    </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
 </div>
</div>
</template>

<script setup>
import {  ref } from 'vue'
import { getAssetsFile } from '@/util/utils.js'

const role = ref('student')
</script>

<style scoped lang="scss">
.login-wrap{
  display: flex;
  &-left{
    width: 50vw;
    height: 98vh;
    #login-bg{
      width: 100%;
      height: 100%;
    }
  }
  &-right{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    .login-box{
      width: 360px;
      height: 480px;
      box-sizing: border-box;
      padding: 24px;
      border-radius: 8px;
      background-color: #fff;
      box-shadow: 2px 4px 14px 5px rgba(0, 0, 0, 0.08);
    }
  }
}
.welcome p:nth-child(1) span{
  font-size: 20px;
  font-weight: 500;
}    
</style>