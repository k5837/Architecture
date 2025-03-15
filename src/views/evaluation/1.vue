<template>
  <div>
    <el-row style="width:830px;">
      <el-popover placement="left-start">
        <template v-slot:reference>
          <div
            style="display: flex; flex-wrap: wrap; justify-content: space-between; align-content: space-between; height: 100%;">
            <el-button v-for="(button, index) in buttons" :key="index"
              style="position: relative; width: 363px; height: 363px; border-radius: 20px; background-color: #EDEDED; background-size: cover; background-position: center; margin:30px 0px 10px 50px"
              :style="{ backgroundImage: button.backgroundImage ? 'url(' + button.backgroundImage + ')' : '' }"
              @click="triggerFileInput(index)">
              <i v-if="!button.backgroundImage" class="plus"></i>
              <i v-if="button.errorIconVisible" class="el-icon-error"
                style="position: absolute; top: -10px; right: -10px; font-size: 35px; color: black"
                @click.stop="revokeImage(index)"></i>
            </el-button>
          </div>
        </template>
        <input ref="fileRef" type="file" @change="fileChange" style="display: none">
      </el-popover>
    </el-row>

    <el-row>
      <el-col style="margin-left:50px;margin-top:10px;width: 190px;">
        <el-button style="width:165px;height:43px;padding:5px;background-color: #779D38;border-radius: 10px;"
          @click="analyzeImage">评估</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttons: [
        { backgroundImage: null, errorIconVisible: false },
        { backgroundImage: null, errorIconVisible: false },
        { backgroundImage: null, errorIconVisible: false },
        { backgroundImage: null, errorIconVisible: false }
      ],
      selectedImageBase64: null,
      currentButtonIndex: null  // 添加此行跟踪当前选中的按钮索引
    }
  },
  methods: {
    triggerFileInput(index) {
      this.$refs.fileRef.click();
      this.currentButtonIndex = index;  // 更新当前按钮索引
    },
    fileChange(e) {
      const file = e.target.files[0];
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        // 更新按钮的背景图像
        this.buttons[this.currentButtonIndex].backgroundImage = event.target.result;
        // 同时更新 selectedImageBase64 用于图片分析
        this.selectedImageBase64 = event.target.result.split(',')[1]; // 移除 'data:image/jpeg;base64,' 前缀
      };
      reader.readAsDataURL(file);
    },
    analyzeImage() {
      if (!this.selectedImageBase64) {
        alert('No image selected!');
        return;
      }
      const url = "https://api.openai.com/v1/chat/completions"; // API URL
      const headers = {
        Authorization: `Bearer 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`, // 使用具体的API密钥
        "Content-Type": "application/json",
      };
      const payload = {
        model: "gpt-4o-mini",
        messages: [{
          "role": "user",
          "content": [{
            "type": "text",
            "text": "What’s in this image?"
          },
          {
            "type": "image_url",
            "image_url": {
              "url": `data:image/jpeg;base64,${this.selectedImageBase64}` // 使用base64图像数据
            }
          }]
        }],
        max_tokens: 300
      };

      fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
      })
        .then(response => response.json())
        .then(data => {
          const content = data.choices[0].message.content;
          console.log('Content from OpenAI:', content);
        })
    },
  }
};
</script>
