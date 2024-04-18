<template>
home
<div style="width: 900px;height:800px">
  <!-- <vue-office-pdf 
        src="/file/ch01.pdf"
        @rendered="renderedHandler"
        @error="errorHandler"
    /> -->

</div>
</template>

<script setup>
import VueOfficePdf from '@vue-office/pdf'
const renderedHandler=()=> {
            console.log("渲染完成")
        }

 const errorHandler=()=> {
            console.log("渲染失败")
 }
</script>

<style scoped>

</style>