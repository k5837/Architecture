<template>
    <div>
      <!-- 输入框 -->
      <el-input
        v-model="userInput"
        type="textarea"
        placeholder="请输入用户输入"
      ></el-input>
  
      <!-- 滑块 -->
      <el-slider v-model="sliderValue" :min="0" :max="100" show-stops></el-slider>
  
      <!-- 显示滑块的值 -->
  
      <!-- 发送按钮 -->
      <el-button @click="sendData">发送</el-button>
    </div>
  </template>
  
  <script>
  // 引入Vue和Element UI
  import Vue from 'vue';
  import ElementUI from 'element-ui';
  import 'element-ui/lib/theme-chalk/index.css';
  
  // 使用Element UI
  Vue.use(ElementUI);
  
  export default {
    data() {
      return {
        userInput: '', // 输入框的初始值
        sliderValue: 50,     // 滑块的初始值
      };
    },
    methods: {
      sendData() {
        // 获取当前滑块的数值
        const currentSliderValue = this.sliderValue;
  
        // 在用户输入的文字中查找是否已经存在窗墙比的数值
        const existingWindowRatio = /窗墙比：\d+/;
        const newUserInput = this.userInput.replace(existingWindowRatio, '');
  
        // 构造新的用户输入
        const message = `${newUserInput}  窗墙比：${currentSliderValue}`;
  
        // 更新输入框的值
        this.userInput = message;
  
        // 在这里执行发送数据的操作，你可以使用message变量包含的完整消息
        console.log('发送数据:', message);
      },
    },
  };
  </script>
  
  <style scoped>
  /* 可以在这里添加样式 */
  </style>
  