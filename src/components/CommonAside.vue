<!-- <template>
  <el-menu style="width:120px;height:1080px;background-color: #d9d9d9;overflow-x: hidden;overflow-y: hidden;">
   
    <router-link to="/generate">
      <el-menu-item style="margin-top: 98px;padding:0px 0px 0px 5px" class="custom-menu-item">
       <span class="text"> AI Generate</span>
      </el-menu-item>
    </router-link>

    
    <router-link to="/option2">
      <el-menu-item class="custom-menu-item">
        Option 2
      </el-menu-item>
    </router-link>
    
    <router-link to="/option3">
      <el-menu-item class="custom-menu-item">
        Option 3
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<style scoped>
.custom-menu-item {
  width: 119px; /* 宽度 */
  height: 120px; /* 高度 */
  background-color: #ededed; /* 背景色 */
  padding: 0px 0px 0px 5px;
}

.custom-menu-item:hover,
.custom-menu-item.is-active {
  background-color: #ffffff; /* 选中时的背景色 */
}
.text{
  font-family: 'Cabin', sans-serif; /* 字体为Cabin */
  font-size: 24px; /* 大小是24px */
  white-space: normal;
  padding:30px 5px 31px ;
}
</style> -->

<template>
  
  <el-menu style="width:120px;height:1080px;background-color: #d9d9d9;overflow-x: hidden;overflow-y: hidden;">
    <!-- 第一个选项，距离顶部98px -->
 
    <router-link to="/generate" class="a">
    
      <el-menu-item style="margin-top: 98px;padding:0px 0px 0px 5px"  class="custom-menu-item" :class="{ 'is-active': isActiveOption1 }" @click="setActiveItem('option1')">
        <span class="text">AI Generate</span>
      </el-menu-item>
    </router-link>
  
    <!-- 其他选项 -->
    <router-link to="/evaluation" class="a">
      <el-menu-item style="margin-top: 0px;padding:0px 0px 0px 5px"  class="custom-menu-item" :class="{ 'is-active': isActiveOption2 }" @click="setActiveItem('option2')">
        <span class="text1" >Evaluation</span>
      </el-menu-item>
    </router-link>
    
    <!-- <router-link to="/library" class="a">
      <el-menu-item style="margin-top: 0px;padding:0px 0px 0px 5px"  class="custom-menu-item" :class="{ 'is-active': isActiveOption3 }" @click="setActiveItem('option3')">
        <span class="text1" >Library</span>
      </el-menu-item>
    </router-link> -->
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeItem: '', // 记录当前活动的选项
      isActiveOption1: false, // 仅选项1是否为活动状态
    };
  },
  methods: {
    setActiveItem(item) {
      // 设置活动选项
      this.activeItem = item;
      this.isActiveOption1 = item === 'option1';
    },
  },
  watch: {
    $route(to, from) {
      // 当路由切换时更新活动选项
      this.activeItem = to.name || '';
      this.isActiveOption1 = this.activeItem === 'option1';
    },
  },
};
</script>

<style scoped>
.a{
  text-decoration: none; /* 去除router-link的下划线 */
}
.custom-menu-item {
  width: 119px; /* 宽度 */
  height: 120px; /* 高度 */
  background-color: #ededed; /* 背景色 */
  padding: 0px 0px 0px 5px;
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.custom-menu-item:hover {
  background-color: #ffffff; /* 鼠标悬停时的背景色 */
}

.custom-menu-item.is-active {
  background-color: #ffffff !important; /* 选中时的背景色 */
}

.text {
  font-family: 'Cabin', sans-serif; /* 字体为Cabin */
  font-size: 24px; /* 大小是24px */
  white-space: normal;
  padding:30px 5px 31px ;
}


</style>

<style>
.text1 {
  font-family: 'Cabin', sans-serif; /* 字体为Cabin */
  font-size: 24px; /* 大小是24px */
  white-space: normal;
  padding:30px 5px 31px ;
  text-align:center;
}</style>

