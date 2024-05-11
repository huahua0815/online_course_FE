import { defineStore } from 'pinia'

export const useUserStore = defineStore('user',{
  state:()=>({
    info:{username:'', userType:'' ,userId:0}
  }),
  getters:{
    getUserInfo :(state)=>{
      return state.info
    },
    isStudent:(state)=>{
      return state.info.userType == 1
    },
    isTeacher:(state)=>{
      return state.info.userType == 2
    },
    isAdmin:(state)=>{
      return state.info.userType == 3
    },
  },
  actions:{
    setUserInfo(obj){
      this.info = obj
    }
  },
  persist: {
    enabled: true // true 表示开启持久化保存
  }
})