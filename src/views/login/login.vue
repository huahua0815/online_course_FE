<template>
<div class="login-wrap">
 <div class="login-wrap-left">
  <img id="login-bg" :src="getAssetsFile('img/login-bg.svg')" alt="">
 </div>
 <div class="login-wrap-right">
  <div class="login-box">
    <div class="welcome">
        <p> 欢迎使用<span style="color:#315BF4">在线课程系统</span> 🎉</p>
    </div>
    <el-form :label-width="60" :model="formData">
      <el-form-item label="用户名">
        <el-input v-model="formData.name"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"/>
      </el-form-item>
      <el-form-item label="角色">
        <el-radio-group v-model="role" >
      <el-radio-button label="学生" value="student" />
      <el-radio-button label="教师" value="teacher" />
      <el-radio-button label="管理员" value="admin" />
    </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="handleLogin">登录</el-button>
        <el-button type="primary" plain @click="handleReg">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
 </div>
</div>
</template>

<script setup>
import {  ref, reactive } from 'vue'
import { getAssetsFile } from '@/util/utils.js'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/store/user'

const store = useUserStore()
const router = useRouter()
const role = ref('student')
const formData = reactive({
  name:'',
  password:''
})
const m = {
  'student':{ name:'202201', password: '123456'},
  'admin':{name:'admin',password: '123456'},
  'teacher':{name:'001', password: '123456'}
}
const handleLogin = ()=>{
 let roleName = role.value
  const {name, password }= m[roleName]
  if(formData.name == name && formData.password == password){
    store.setUserInfo({name, role:roleName})
    router.push('/')
    ElMessage.success('登录成功！')
  }else{
    ElMessage.error('密码错误！')
  }
 
}

const handleReg = ()=>{
  router.push('/')
}
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
      width: 320px;
      height: 360px;
      box-sizing: border-box;
      padding: 24px;
      border-radius: 8px;
      background-color: #fff;
      box-shadow: 2px 4px 14px 5px rgba(0, 0, 0, 0.08);
    }
  }
}
.welcome{
  text-align: center;
  margin-bottom: 24px;
  p{
    font-size: 20px;
  }
  p:nth-child(1) span{
  font-size: 20px;
  font-weight: 500;
}
}
</style>