<script setup>
// import Layout from "@/views/layout/index.vue";
</script>

<template>
  <div id="app">
    <!-- <Layout></Layout> -->
    <router-view></router-view>
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  list-style: none;
  /* color: #454545; */
  font-family: Avenir;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background-color: #d9d9d9;
}

::-webkit-scrollbar-track {
  /* -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
  border-radius: 5px;
  /* background-color: #d3dce6; */
}
</style>
