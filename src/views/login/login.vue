<template>
  <div class="login-wrap">
    <div class="login-wrap-left">
      <img id="login-bg" :src="getAssetsFile('img/login-bg.svg')" alt="">
    </div>
    <div class="login-wrap-right">
      <div class="login-box" v-if="isLogin">
        <div class="welcome">
          <p> 欢迎登录<span style="color:#315BF4">在线课程系统</span> 🎉</p>
        </div>
        <el-form :label-width="48" :model="formData">
          <el-form-item label="工号">
            <el-input v-model="formData.username" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formData.password" />
          </el-form-item>
          <el-form-item label="角色">
            <el-radio-group v-model="formData.userType">
              <el-radio-button label="学生" value="1" />
              <el-radio-button label="教师" value="2" />
              <el-radio-button label="管理员" value="3" />
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <div class="opreation-wrap flex  justify-center w-full"><el-button type="primary"
                @click="handleLogin">登录</el-button>
            </div>
          </el-form-item>
        </el-form>
        <div> <el-button class="reg-btn" type="primary" link @click="handleReg" v-if="role != 'admin'"
            size="small" >还没账号？点击注册</el-button></div>
      </div>
      <div class="register-box" v-else>
          <div class="welcome">
            <p> 欢迎注册<span style="color:#315BF4">在线课程系统</span> 🎉</p>
          </div>
          <el-form :label-width="58" :model="regFormData">
            <el-form-item label="工号">
              <el-input v-model="regFormData.number" />
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="regFormData.username" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="regFormData.password" />
            </el-form-item>
            <el-form-item label="角色">
              <el-radio-group v-model="regFormData.userType">
                <el-radio-button label="学生" value="1" />
                <el-radio-button label="教师" value="2" />
                <el-radio-button label="管理员" value="3" />
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <div class="opreation-wrap flex  justify-center w-full"><el-button type="primary"
                  @click="handleRegister">注册</el-button>
              </div>
            </el-form-item>
          </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { getAssetsFile } from '@/util/utils.js'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/store/user'
import { login,register } from '@/api/index.js'
import _ from 'lodash'


const isLogin = ref(true)
const store = useUserStore()
const router = useRouter()
const role = ref('student')
const formData = reactive({
  username: '',
  password: '',
  userType:1,
})

const regFormData = reactive({
  number:'',
  password:'',
  userType:1,
  username:''
})
const m = {
  1: { route: '/user' },
  2: {  route: '/teacher' },
  3: {  route: '/admin' },
}

const handleLogin = async() => {
  try{
    const {code,data} = await login(formData)
    if(code == 0){
      const userInfo = _.pick(data, ['username', 'userType', 'userId'])
      store.setUserInfo(userInfo)
      ElMessage.success('登录成功！')
      console.log('11',data.userId,m[data.userType].route)
      router.push(m[data.userType].route)
    }else{
      ElMessage.error('登录失败！')
    }
  }catch(e){

  }
}

const regformDataStudent = reactive({
  st: '',
  password: '',

})
const handleReg = () => {
  isLogin.value = false
}

const handleRegister = async() => {
  try{
    const {code} = await register(regFormData)
    if(code == 0){
      ElMessage.success('注册成功！')
      isLogin.value = true  
    }
  }catch(e){

  }
}
</script>

<style scoped lang="scss">
.login-wrap {
  display: flex;

  &-left {
    width: 50vw;
    height: 98vh;

    #login-bg {
      width: 100%;
      height: 100%;
    }
  }

  &-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    .login-box, .register-box {
      position: relative;
      width: 320px;
      height: 360px;
      box-sizing: border-box;
      padding: 34px;
      padding-top: 50px;
      border-radius: 8px;
      background-color: #fff;
      box-shadow: 2px 4px 14px 5px rgba(0, 0, 0, 0.08);
    }
    .register-box{
      height: 400px;
    }
  }
}

.welcome {
  text-align: center;
  margin-bottom: 24px;

  p {
    font-size: 20px;
  }

  p:nth-child(1) span {
    font-size: 20px;
    font-weight: 500;
  }
}

.operation-wrap {
  position: relative;
}

.reg-btn {
  position: absolute;
  right: 16px
}
</style>