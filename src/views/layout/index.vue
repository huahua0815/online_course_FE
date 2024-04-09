<script setup>
const menuInfo = [
    {}
]
</script>

<template>
  <div class="layout-wrap">
    <div class="header">

    </div>
    <div class="main">
        <div class="main-left">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
      
      </el-menu>
        </div>
        <div class="main-right">

        </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-wrap{
    width: 100%;
    height: 100%;
}
.main{
    &-left{
        width: 200px;
    }
}
</style>
