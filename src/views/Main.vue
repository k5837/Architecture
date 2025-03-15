<template>
  <el-container class="app">
    <el-aside width="120px"><common-aside></common-aside></el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import CommonAside from "../components/CommonAside.vue";

export default {
  name: "Main",
  components: { CommonAside, },
};

</script>

<style>
.app {
  width: 1920px;
  height: 1080px;
  /* display: flex;
  flex-direction: column; */
}

.el-main {
  /* flex: 1; */
  width: 1800px;
  height: 1080px;
}

.el-aside {
  width: 120px;
  height: 1080px;
  background-color: #d9d9d9;
  overflow: hidden;
}

.el-card__body,
.el-main {
  padding: 0px;
}
</style>