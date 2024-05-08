import { defineStore } from 'pinia'

export const useUserStore = defineStore('user',{
  state:()=>({
    info:{name:'', role:'' }
  }),
  getters:{
    getUserInfo :(state)=>{
      return state.info
    }
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