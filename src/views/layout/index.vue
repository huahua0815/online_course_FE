<script setup>
import { ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getAssetsFile } from "@/util/utils.js";
import { useUserStore } from '@/store/user'
import admin from "./chidren/admin.vue";
import student from "./chidren/student.vue";
import teacher from "./chidren/teacher.vue";

const store = useUserStore()

const isLogin = ref(false)
const curComponnet = ref(student)

watch(() => store.getUserInfo, (newObj, oldObj) => {
  let type = newObj.userType
  if (type) {
    switch(type){
      case 3: 
        curComponnet.value = admin
        break
      case 1:
        curComponnet.value = student
        break
      default:
        curComponnet.value = teacher
    }
  }
}, { immediate: true, deep: true })


</script>

<template>
  <div class="layout-wrap">
   <Component :is="curComponnet" />
  </div>
</template>

<style scoped lang="scss">


.layout-wrap {
  min-width: 1200px;
  width: 100%;

}


</style>
