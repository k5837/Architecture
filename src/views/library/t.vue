<template>
    <el-row style="width: 1800px;height: 1080px;">
      <el-col style="width:846px;height: 1080px;">
        <el-row style="width:846px;height:94px">
          <p style="font-family: 'Cabin'; font-size: 24px; margin:49px 0px 0px 24px">上传设计概念</p>
          <el-divider style="margin-top:0px"></el-divider>
        </el-row>
        <el-row>
          <!-- 文件选择input，隐藏 -->
          <input type="file" style="display: none" ref="fileInput" @change="handleFileChange" accept="image/*">
          <!-- 按钮们 -->
          <el-button v-for="index in 4" :key="'button' + index" :ref="'button' + index" slot="reference"
            style="width:363px;height:363px;border-radius:20px;background-color:#D3D3D3;margin:33px 0px 10px 50px;position:relative;overflow:hidden"
            @click="selectImage(index)">
            <i class="el-icon-plus" style="font-size: 80px; color:#F5F5F5" :style="{ display: images[index] ? 'none' : 'block' }"></i>
          </el-button>
        </el-row>
        ...
      </el-col>
      ...
    </el-row>
</template>

<script>
export default {
  data() {
    return {
      currentButton: null, // 当前选中的按钮index
      images: { 1: null, 2: null, 3: null, 4: null } // 初始化每个按钮的图片为null
    };
  },
  methods: {
    selectImage(index) {
      // 触发文件选择
      this.$refs.fileInput.click();
      this.currentButton = index; // 存储当前按钮索引以便后续使用
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          // 存储图片数据，并设置图片为按钮背景
          this.$set(this.images, this.currentButton, e.target.result);
          const button = this.$refs['button' + this.currentButton][0];
          button.style.backgroundImage = `url(${e.target.result})`;
          button.style.backgroundSize = 'cover';
          button.style.backgroundPosition = 'center';
        };
        reader.readAsDataURL(file);
      }
      // 清空input以便再次选择相同文件时仍可触发change事件
      this.$refs.fileInput.value = '';
    }
  }
};
</script>

<style scoped>
/* 可以在这里添加组件特定的CSS样式 */
</style>
