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
  }
})