<template>
  <el-row style="width: 1800px;height: 1080px;">
    <el-col style="width:846px;height: 1080px;">
      <el-row style="width:846px;height:94px">
        <p style="font-family: 'Cabin'; font-size: 24px; margin:49px 0px 0px 24px">上传设计概念</p>
        <el-divider style="margin-top:0px"></el-divider>
      </el-row>
      <el-row style="width:830px;margin-right: px;">


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
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-change="handleChange"
            :file-list="fileList" :auto-upload="false" ref="upload" list-type="text">
            <el-button
              style="width:165px;height:43px;padding:5px;background-color: #D9D9D9;border-radius: 10px;">上传评估标准</el-button>
          </el-upload>
          <el-button
            style="margin-top:10px;width:165px;height:43px;padding:5px;background-color: #779D38;border-radius: 10px;"
            @click="analyzeImage">评估</el-button>
        </el-col>

        <el-col style="margin-top:10px;width: 180px; ">

          <el-card class="file-display-card">
            <div v-for="(file, index) in fileList" :key="file.name"
              style="display: flex; align-items: center; justify-content: space-between;font-size: 25px;">
              <div>
                <i v-if="fileList.length > 0" class="el-icon-document" style="margin:10px 0px 0px 5px;">
                  <document />
                </i>
                <span style="margin-left: 8px;">{{ file.name }}</span>
                <i class="el-icon-error" @click="removeFile(index)" style="margin-left: 5px;">
                </i>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>


    </el-col>
    <el-col style="width:954px;height: 1080px;">
      <el-row style="width:954px;height:94px">
        <p style="font-family: 'Cabin'; font-size: 24px; margin:49px 0px 0px 24px">评估结果</p>
        <el-divider style="margin-top:0px"></el-divider>
      </el-row>

      <el-row>
        <el-col style="width: 625px;">
          <div
            style="width: 575px;height: 923px;border-radius: 20px;background-color:#EDEDED ;margin: 35px 0px 25px 50px;">

          </div>
        </el-col>




        <el-col style="width: 325px">
          <div>
            <p style="margin: 10px 0px 0px 20px;">Suggestion from AI:</p>
          </div>
          <div>
            <el-card
              style="width:300px;height:380px;background-color:#D3D3D3;margin-left:10px;margin-top:10px; overflow-y: scroll;">
              <el-card style="width:260px;height:250px;margin:10px;background-color:#eeeeee">
                <div id="evaluation" style="width: 100%; height: 230px;" ref="mychat"></div>
              </el-card>
              <el-card style="width:240px;height:100px;margin:10px;background-color:#eeeeee">
                <div>
                  <p v-show="isshow1" style="margin:10px">AI analysis Report...</p>
                </div>
              </el-card>
            </el-card>
          </div>

          <div>
            <p style="margin: 10px 0px 0px 20px;">Notes for concept</p>
            <el-input type="textarea" placeholder="Entry prompts to generate images for your design." v-model="textarea"
              style="width:300px" clearable>
            </el-input>
          </div>
        </el-col>
      </el-row>

    </el-col>

  </el-row>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      fileList: [],
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
  mounted() {

  },
  methods: {
    selectlibrary() {

    },


    revokeImage(index) {
      this.$set(this.buttons[index], 'backgroundImage', null);
      this.$set(this.buttons[index], 'errorIconVisible', false);
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
    triggerFileInput(index) {
      this.$refs.fileRef.click();
      this.currentButtonIndex = index;  // 更新当前按钮索引
    },


    evaluationchart() {
      let getchart = echarts.init(this.$refs.mychat);
      var option = {
        title: {
          // text: 'Basic Radar Chart'
        },
        legend: {
          // data: ['Allocated Budget', 'Actual Spending']
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: 'Energy and environmental perforemance', max: 6500 },
            { name: 'A', max: 16000 },
            { name: 'experience', max: 30000 },
            { name: 'Maintenance', max: 38000 },
            { name: 'B', max: 52000 },
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                // name: 'Allocated Budget'
              },
            ]
          }
        ]
      };
      getchart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        getchart.resize();
      });
    },

    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    removeFile(index) {
      this.fileList.splice(index, 1); // 移除指定索引的文件
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
    },

    showImages(images) {
      this.currentImages = images; // 设置要显示的照片
      this.imageDialogVisible = true; // 打开照片弹出框
    },
    closeImageDialog() {
      this.imageDialogVisible = false; // 关闭照片弹出框
    },
    selectlibrary() {
      this.evaluationchart();
      this.isshow1 = true;
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

<style>
.plus:before {
  content: "+";
  font-size: 300px;
  color: #CCCCCC;
  font-weight: 900;
  font-family: Arial, sans-serif;
  /* 添加字体族 */
}

.plus {
  position: absolute;
  top: 60%;
  left: 45%;
  transform: translate(-50%, -60%);
}

.el-popover {
  padding: 0;
  background-color: transparent;
  border: none;
}

.folder {
  width: 130px;
  height: 130px;
  background-color: #D3D3D3;
  margin: 10px;
  border-radius: 5px;
}

.v-modal {
  background: rgba(255, 255, 255, 0);
}

.upload-demo .el-upload-list {
  display: none;
  /* 隐藏上传组件自带的文件列表 */
}

.file-display-card {
  width: 562px;
  height: 137px;
  padding: 10px;
  border-radius: 20px;
  background-color: #FAFAFA;
}

.remove-icon {
  cursor: pointer;
  color: #ff4949;
  /* 设置图标颜色为红色，表示删除 */
}
</style>