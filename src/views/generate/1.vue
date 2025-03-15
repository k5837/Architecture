<template>
  <el-row style="height:100%">
    <el-col :span="7">
      <div>
        <p>GPT</p>
        <div class="chat-container">
          <div class="chat-messages">
            <p class="gpt1">Hi! This is GPT. What can I help you?</p>
            <div v-for="message in messages" :key="message.id" class="message"
              :class="{ 'user-message': message.isUser, 'bot-message': !message.isUser }">
              <div class="message-content">
                <div class="message-text" v-html="message.text"></div>
                <!-- <img v-if="message.isUser" src="../../assets/user.jpg" alt="User" class="avatar user-icon" />
                  <img v-if="!message.isUser" src="bot-icon.png" alt="Bot" class="avatar bot-icon" /> -->
              </div>
              <img v-if="message.isUser" src="../../assets/user1.jpg" alt="User" class="avatar user-icon" />
              <!-- <img v-if="!message.isUser" src="bot-icon.png" alt="Bot" class="avatar bot-icon" /> -->
            </div>
            <div v-if="isLoading" class="loading-spinner">
              <el-spinner size="small" />
            </div>
          </div>
          <div class="input-container">
            <el-input v-model="inputMessage" placeholder="Type your message..." @keyup.enter.native="sendMessage"
              clearable />
            <el-button class="button4" icon="el-icon-s-promotion" @click="sendMessage" />
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <p>Description</p>
      <el-input type="textarea" placeholder="Entry prompts to generate images for your design." v-model="textarea"
        clearable>
      </el-input>
      
      <div style="width:100%;margin-top: 10px;">
        <div style="width:95%;height:40px;margin-left:20px;display: flex;align-items: center;justify-content: center;">
          <div style="width:15%;display:inline-block;font-size: 13px;">Material Carbon</div>
          <div style="display:inline-block;width:80%">
            <el-slider v-model="value1" style="width:90%; margin-left: 20px;"></el-slider>
          </div>
        </div>

        <div style="width:95%;height:40px;margin-left:20px;display: flex; align-items: center;justify-content: center;">
          <div style="width:15%;display:inline-block;align-items: center;font-size: 13px;">Energy</div>
          <div style="display:inline-block;width:80%;">
            <el-slider v-model="value2" style="width:90%; margin-left: 20px;"></el-slider>
          </div>
        </div>

        <div style="width:95%;height:40px;margin-left:20px;display: flex; align-items: center;justify-content: center;">
          <div style="width:15%;display:inline-block;align-items: center;font-size: 13px;">Comfort</div>
          <div style="display:inline-block;width:80%;">
            <el-slider v-model="value3" style="width:90%; margin-left: 20px;"></el-slider>
          </div>
        </div>

        <div style="margin-left: 20px; width:95%;margin-top: 10px;">
          <el-divider style="background-color: #D3D3D3;"></el-divider>
        </div>

        <div style="width:95%;height:40px;margin-left:20px;display: flex; align-items: center;justify-content: center;margin-top: 15px;">
          <div style="width:15%;display:inline-block;align-items: center;font-size: 13px;">Realistic style</div>
          <div style="display:inline-block;width:80%;">
            <el-slider v-model="value4" style="width:90%; margin-left: 20px;"></el-slider>
          </div>
        </div>
      </div>

      <div>
        <el-row>
          <el-col>
            <div class="button-container">
              <el-popover placement="left-start">
                <div style="display: flex;">
                  <div style="flex: 1;">
                    <el-card
                      style="display:flex; width: 300px; height: 620px; position: fixed; top:8px; margin-left: -160px; border-radius:5px">
                      <div class="scroll-container">
                        <!-- 嵌套信息位于卡片内 -->
                        <div>
                          <el-input class="input1" placeholder="请输入关键字" v-model="searchQuery" clearable
                            @clear="clearSearch" suffix-icon="el-icon-search" @click="handleSearch" />
                        </div>
                        <h3 style="margin-left: 10px; font-style: italic;">In general</h3>
                        <el-divider></el-divider>
                        <p
                          style="font-style: italic;font-size: 20px;margin-top:20px;margin-bottom:5px;color:gray;margin-left:10px">
                          Style</p>
                        <el-button v-for="button in buttons1" :key="button"
                          :class="{ 'gray-button': isSelected1(button) }"
                          style="padding:10px 10px;margin-left: 10px;word-wrap: break-word;white-space: normal;"
                          @click="button1(button)">
                          {{ button }}
                        </el-button>
                        <el-button size="small" icon="el-icon-plus" style="width:20px;height:35px;padding-left: 5px;"
                          @click="addCustomButton1"></el-button>
                        <br>

                        <p
                          style="font-style: italic;font-size: 15px;margin-top:5px;margin-bottom:5px;color:gray;margin-left:10px">
                          Location</p>
                        <el-button v-for="button in buttons2" :key="button"
                          :class="{ 'gray-button': isSelected2(button) }"
                          style="padding:10px 10px;margin-left: 10px;word-wrap: break-word;white-space: normal;"
                          @click="button2(button)">
                          {{ button }}
                        </el-button>
                        <el-button size="small" icon="el-icon-plus" style="width:20px;height:35px;padding-left: 5px;"
                          @click="addCustomButton2"></el-button>
                        <br>
                        <p
                          style="font-style: italic;font-size: 15px;margin-top:7px;margin-bottom:5px;color:gray;margin-left:10px">
                          Function</p>
                        <el-button v-for="button in buttons3" :key="button"
                          :class="{ 'gray-button': isSelected3(button) }"
                          style="padding:10px 10px;margin-left: 10px;word-wrap: break-word;white-space: normal;"
                          @click="button3(button)">
                          {{ button }}
                        </el-button>
                        <el-button size="small" icon="el-icon-plus" style="width:20px;height:35px;padding-left: 5px;"
                          @click="addCustomButton3"></el-button>
                        <br>

                        <h4 style="margin-left: 10px; font-style: italic;">Facade</h4>
                        <el-divider></el-divider>
                        <p
                          style="font-style: italic;font-size: 15px;margin-top:5px;margin-bottom:5px;color:gray;margin-left:10px">
                          Facade form</p>
                        <el-button v-for="button in buttons4" :key="button"
                          :class="{ 'gray-button': isSelected4(button) }"
                          style="padding:10px 10px;margin-left: 10px;word-wrap: break-word;white-space: normal;"
                          @click="button4(button)">
                          {{ button }}
                        </el-button>
                        <el-button size="small" icon="el-icon-plus" style="width:20px;height:35px;padding-left: 5px;"
                          @click="addCustomButton4"></el-button>
                        <br>
                        <p
                          style="font-style: italic;font-size: 15px;margin-top:5px;margin-bottom:5px;color:gray;margin-left:10px">
                          Space</p>
                        <el-button v-for="button in buttons5" :key="button"
                          :class="{ 'gray-button': isSelected5(button) }"
                          style="padding:10px 10px;margin-left: 10px;word-wrap: break-word;white-space: normal;"
                          @click="button5(button)">
                          {{ button }}
                        </el-button>
                        <el-button size="small" icon="el-icon-plus" style="width:20px;height:35px;padding-left: 5px;"
                          @click="addCustomButton5"></el-button>
                        <br>

                        <p
                          style="font-style: italic;font-size: 15px;margin-top:7px;margin-bottom:5px;color:gray;margin-left:10px">
                          Movement</p>
                        <el-button v-for="button in buttons6" :key="button"
                          :class="{ 'gray-button': isSelected6(button) }"
                          style="padding:10px 10px;margin-left: 10px;word-wrap: break-word;white-space: normal;"
                          @click="button6(button)">
                          {{ button }}
                        </el-button>
                        <el-button size="small" icon="el-icon-plus" style="width:20px;height:35px;padding-left: 5px;"
                          @click="addCustomButton6"></el-button>
                        <br>

                        <p
                          style="font-style: italic;font-size: 15px;margin-top:7px;margin-bottom:5px;color:gray;margin-left:10px">
                          Thermal</p>
                        <el-button v-for="button in buttons7" :key="button"
                          :class="{ 'gray-button': isSelected7(button) }"
                          style="padding:10px 10px;margin-left: 10px;word-wrap: break-word;white-space: normal;"
                          @click="button7(button)">
                          {{ button }}
                        </el-button>
                        <el-button size="small" icon="el-icon-plus" style="width:20px;height:35px;padding-left: 5px;"
                          @click="addCustomButton7"></el-button>
                      </div>
                    </el-card>
                  </div>
                </div>
                <el-button class="button1" size="small" slot="reference">Keywords</el-button>

              </el-popover>



              <el-popover placement="left-start">
                <div style="display: flex;">
                  <div style="flex: 1;">
                    <el-card
                      style="display:flex; width: 300px; height: 440px; position: fixed; top:8px; margin-left: -275px; border-radius:5px; font-size:16px;">
                      <p>Upload Image</p>
                      <div class="rectangle-container">
                        <div class="rectangle">
                          <i class="el-icon-plus" style="font-size: 200px; cursor: pointer;color:#D3D3D3"
                            @click="handleImageUpload" v-if="!imageUrl"></i>
                          <input ref="fileInput" type="file" accept="image/*" style="display: none"
                            @change="handleFileChange" />
                          <img :src="imageUrl" alt="Uploaded Image" v-if="imageUrl" />
                        </div>
                        <div class="button-container1">
                          <el-button type="primary" @click="handleImageUpload" v-if="!imageUrl"
                            style="margin-top: 20px;;">Choose</el-button>
                          <el-button type="success" @click="uploadToDALLE" v-if="imageUrl"
                            style="margin:20px;">Upload</el-button>
                          <el-button type="danger" @click="deleteImage" v-if="imageUrl"
                            style="margin-right:20px;">Delete</el-button>
                        </div>
                      </div>

                    </el-card>
                  </div>
                </div>
                <el-button class="buttonimg" size="small" slot="reference">Upload IMG</el-button>
              </el-popover>
              <i class="el-icon-success" style="margin:15px 0px 10px 0px" v-if="showsuccess"></i>

              <el-button class="buttongo" size="small" @click="generateImages">GO</el-button>
            </div>
          </el-col>
        </el-row>

      </div>
    </el-col>



  </el-row>
</template>

<script>
import 'element-ui/lib/theme-chalk/base.css';
import { Button, Message } from 'element-ui';
import axios from 'axios';
export default {
  name: 'Rectangle',
  components: {
    [Button.name]: Button,
  },
  data() {
    return {
      textarea: "",
      fileList: [{ name: 'IMG.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },],
      messages: [],
      inputMessage: "",
      isLoading: false,
      apiKey: "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",
      value1: 0,
      value2: 0,
      value3: 0,
      value4: 0,
      // textInput: "",
      generatedImages: Array(4).fill(null),
      selectedIndex: -1,
      buttons: ["1", "2", "3", "4"],
      buttons1: ["Modernist", "Futuristic", "Gothic"],
      buttons2: ["Hong Kong", "Shenzhen", "Beijing"],
      buttons3: ["Office", "Residential building", "School"],
      buttons4: ["Double-skin", "Panel frame", "Curtain Walling"],
      buttons5: ["Tight", "Loose", "Regular"],
      buttons6: ["Horizontal", "Vertical", "Angle"],
      buttons7: ["Double-skin", "Panel frame", "Curtain Walling"],
      changedImages: Array(4).fill(null),
      searchQuery: '', // 存储搜索关键字
      selectedButtons: [],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      imageUrl: null,
      showsuccess: false,
    };
  },
  methods: {
    handleImageUpload() {
      // 触发文件选择框
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        // 读取文件并显示在矩形框中
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        Message.error('请选择有效的图片文件！');
      }
    },
    deleteImage() {
      // 删除图片
      this.imageUrl = null;
      this.showsuccess = false;
      this.$message({
        showClose: true,
        message: 'The image has been deleted.'
      });
    },
    uploadToDALLE() {
      this.$message({
        showClose: true,
        message: 'The image has been uploaded successfully',
        type: 'success'
      });
      this.showsuccess = true;
      if (this.imageUrl) {
        // 在这里实现将图片上传给DALL·E的逻辑
        // 你需要发送HTTP请求将图片数据发送给DALL·E的API
        // 可以使用Axios或其他HTTP库来处理上传
        // 记得处理API响应以获得生成的图片或其他数据
        // 以下是一个示例，具体实现可能有所不同
        // axios.post('DALL·E_API_URL', { image: this.imageUrl })
        //   .then(response => {
        //     // 处理响应，显示生成的图片或其他操作
        //   })
        //   .catch(error => {
        //     console.error('上传至DALL·E失败', error);
        //   });
      } else {
        Message.error('没有可上传的图片！');
      }
    },




    button1(buttonName) {
      if (this.isSelected1(buttonName)) {
        // 如果按钮已选中，取消选中
        this.selectedButtons = this.selectedButtons.filter(item => item !== buttonName);
        this.removeFromtextarea1(buttonName);
      } else {
        // 否则，选中按钮
        this.selectedButtons.push(buttonName);
        this.addTotextarea1(buttonName);
      }
    },
    isSelected1(buttonName) {
      return this.selectedButtons.includes(buttonName);
    },
    addTotextarea1(buttonName) {
      // 添加按钮名称到输入框中
      this.textarea += ' with ' + buttonName + ' style ';
    },
    removeFromtextarea1(buttonName) {
      // 从输入框中移除按钮名称
      this.textarea = this.textarea.replace(new RegExp(' with ' + buttonName + ' style ', 'g'), '');
    },



    button2(buttonName) {
      if (this.isSelected2(buttonName)) {
        // 如果按钮已选中，取消选中
        this.selectedButtons = this.selectedButtons.filter(item => item !== buttonName);
        this.removeFromtextarea2(buttonName);
      } else {
        // 否则，选中按钮
        this.selectedButtons.push(buttonName);
        this.addTotextarea2(buttonName);
      }
    },
    isSelected2(buttonName) {
      return this.selectedButtons.includes(buttonName);
    },
    addTotextarea2(buttonName) {
      // 添加按钮名称到输入框中
      this.textarea += ' in ' + buttonName;
    },
    removeFromtextarea2(buttonName) {
      // 从输入框中移除按钮名称
      this.textarea = this.textarea.replace(new RegExp(' in ' + buttonName, 'g'), '');
    },

    button3(buttonName) {
      if (this.isSelected3(buttonName)) {
        // 如果按钮已选中，取消选中
        this.selectedButtons = this.selectedButtons.filter(item => item !== buttonName);
        this.removeFromtextarea3(buttonName);
      } else {
        // 否则，选中按钮
        this.selectedButtons.push(buttonName);
        this.addTotextarea3(buttonName);
      }
    },
    isSelected3(buttonName) {
      return this.selectedButtons.includes(buttonName);
    },
    addTotextarea3(buttonName) {
      // 添加按钮名称到输入框中
      this.textarea += ' for ' + buttonName;
    },
    removeFromtextarea3(buttonName) {
      // 从输入框中移除按钮名称
      this.textarea = this.textarea.replace(new RegExp(' for ' + buttonName, 'g'), '');
    },

    button4(buttonName) {
      if (this.isSelected4(buttonName)) {
        // 如果按钮已选中，取消选中
        this.selectedButtons = this.selectedButtons.filter(item => item !== buttonName);
        this.removeFromtextarea4(buttonName);
      } else {
        // 否则，选中按钮
        this.selectedButtons.push(buttonName);
        this.addTotextarea4(buttonName);
      }
    },
    isSelected4(buttonName) {
      return this.selectedButtons.includes(buttonName);
    },
    addTotextarea4(buttonName) {
      // 添加按钮名称到输入框中
      this.textarea += ' with ' + buttonName + ' facade form ';
    },
    removeFromtextarea4(buttonName) {
      // 从输入框中移除按钮名称
      this.textarea = this.textarea.replace(new RegExp(' with ' + buttonName + ' facade form ', 'g'), '');
    },


    button5(buttonName) {
      if (this.isSelected5(buttonName)) {
        // 如果按钮已选中，取消选中
        this.selectedButtons = this.selectedButtons.filter(item => item !== buttonName);
        this.removeFromtextarea5(buttonName);
      } else {
        // 否则，选中按钮
        this.selectedButtons.push(buttonName);
        this.addTotextarea5(buttonName);
      }
    },
    isSelected5(buttonName) {
      return this.selectedButtons.includes(buttonName);
    },
    addTotextarea5(buttonName) {
      // 添加按钮名称到输入框中
      this.textarea += ' with ' + buttonName + ' space ';
    },
    removeFromtextarea5(buttonName) {
      // 从输入框中移除按钮名称
      this.textarea = this.textarea.replace(new RegExp(' with ' + buttonName + ' space ', 'g'), '');
    },


    button6(buttonName) {
      if (this.isSelected6(buttonName)) {
        // 如果按钮已选中，取消选中
        this.selectedButtons = this.selectedButtons.filter(item => item !== buttonName);
        this.removeFromtextarea6(buttonName);
      } else {
        // 否则，选中按钮
        this.selectedButtons.push(buttonName);
        this.addTotextarea6(buttonName);
      }
    },
    isSelected6(buttonName) {
      return this.selectedButtons.includes(buttonName);
    },
    addTotextarea6(buttonName) {
      // 添加按钮名称到输入框中
      this.textarea += ' with ' + buttonName + ' movement ';
    },
    removeFromtextarea6(buttonName) {
      // 从输入框中移除按钮名称
      this.textarea = this.textarea.replace(new RegExp(' with ' + buttonName + ' movement ', 'g'), '');
    },

    button7(buttonName) {
      if (this.isSelected7(buttonName)) {
        // 如果按钮已选中，取消选中
        this.selectedButtons = this.selectedButtons.filter(item => item !== buttonName);
        this.removeFromtextarea7(buttonName);
      } else {
        // 否则，选中按钮
        this.selectedButtons.push(buttonName);
        this.addTotextarea7(buttonName);
      }
    },
    isSelected7(buttonName) {
      return this.selectedButtons.includes(buttonName);
    },
    addTotextarea7(buttonName) {
      // 添加按钮名称到输入框中
      this.textarea += ' with ' + buttonName + ' thermal ';
    },
    removeFromtextarea7(buttonName) {
      // 从输入框中移除按钮名称
      this.textarea = this.textarea.replace(new RegExp(' with ' + buttonName + ' thermal ', 'g'), '');
    },

    // handleRemove(file) {
    //   console.log(file);
    // },
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // },
    // handleDownload(file) {
    //   console.log(file);
    // },

    async sendMessage() {
      if (!this.inputMessage) return;
      this.messages.push({ text: this.inputMessage, isUser: true });

      this.isLoading = true;

      try {
        const response = await this.sendToChatGPT(this.inputMessage);
        const botResponse = response.data.choices[0].message.content; // Adjust this according to your API response structure
        this.messages.push({ text: botResponse, isUser: false });
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        this.isLoading = false;
        this.inputMessage = "";
      }
    },
    async sendToChatGPT(userMessage) {
      // Use Axios to send the message to your ChatGPT API
      // Make sure to configure your API with the apiKey
      // Example:
      const url = "https://api.openai.com/v1/chat/completions"; // Replace with your actual API URL
      const headers = {
        Authorization: `Bearer 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`,
      };
      return await this.$axios.post(url, {

        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "user", "content": this.inputMessage
          },
          {
            "role": "system",
            "content": "You are a helpful assistant."
          },
        ],
        temperature: 0.7
      },
        { headers });
    },
    async generateImages() {
      this.$message({
        showClose: true,
        message: 'Submitted successfully',
        type: 'success'
      });
      this.generatedImages = [];
      this.selectedIndex = -1;
      // this.last=this.textarea+''+this.buttons1[1] ;
      for (let i = 0; i < 4; i++) {
        try {
          const response = await axios.post("https://api.openai.com/v1/images/generations", {
            prompt: this.textarea,
            // model: "image-davinci-003",
            n: 1,
          }, {
            headers: {
              Authorization: "Bearer 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"
            },
          });

          // this.generatedImages.push(response.data.data[0].url);
          this.$set(this.generatedImages, i, response.data.data[0].url); // 使用$set更新数组元素
        } catch (error) {
          console.error("生成图像时发生错误:", error);
        }
      }
    },
    selectImage(index) {
      this.selectedIndex = index;
    },
    selectImageByButton(index) {
      this.selectedIndex = index;
    },
    regenerateImages() {
      this.generateImages();
    },
    changeOption(command) {
      if (command === 'changeView') {
        if (this.selectedIndex !== -1) {
          this.generateChangedView(this.selectedIndex);
        }
      } else if (command === 'changeTime') {
        // 处理改变时间的逻辑
      }
    },
    async generateChangedView(index) {
      if (this.selectedIndex !== -1) {
        try {
          // 以示例方式将左视图生成视图
          // 实际情况可能需要使用合适的图像处理工具或OpenAI API
          // 下面的代码仅作示例
          const originalImage = this.generatedImages[index];
          const modifiedImage = this.applyLeftView(originalImage); // 假设 applyLeftView 是用于左视图的处理函数
          this.changedImages[index] = modifiedImage;
        } catch (error) {
          console.error("改变视角时发生错误:", error);
        }
      }
    },

    applyLeftView(imageData) {
      // 将 base64 编码的图像数据转换为图像对象
      // const image = new Image();
      // image.src = "data:image/jpeg;base64," + imageData;

      // return new Promise((resolve, reject) => {
      //   image.onload = () => {
      //     const canvas = document.createElement("canvas");
      //     canvas.width = image.width;
      //     canvas.height = image.height;
      //     const ctx = canvas.getContext("2d");

      //     // 将图像水平翻转
      //     ctx.translate(canvas.width, 0);
      //     ctx.scale(-1, 1);

      //     // 在画布上绘制图像
      //     ctx.drawImage(image, 0, 0, image.width, image.height);

      //     // 将画布上的内容转换为 base64 编码的图像数据
      //     const modifiedImageData = canvas.toDataURL("image/jpeg");

      //     // 返回处理后的图像数据
      //     resolve(modifiedImageData);
      //   };

      //   image.onerror = (error) => {
      //     reject(error);
      //   };
      // });
    },
    handleSearch() {
      // 处理搜索操作，你可以在这里执行搜索相关的操作
      console.log('搜索关键字：', this.searchQuery);
    },
    clearSearch() {
      this.searchQuery = '';
    },
    addCustomButton1() {
      this.$prompt('请输入按钮名称', '自定义按钮', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        // 在按钮数组中添加新的按钮名称
        this.buttons1.unshift(value);
      });
    },
    addCustomButton2() {
      this.$prompt('请输入按钮名称', '自定义按钮', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        // 在按钮数组中添加新的按钮名称
        this.buttons2.unshift(value);
      });
    },
    addCustomButton3() {
      this.$prompt('请输入按钮名称', '自定义按钮', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        // 在按钮数组中添加新的按钮名称
        this.buttons3.unshift(value);
      });
    },
    addCustomButton4() {
      this.$prompt('请输入按钮名称', '自定义按钮', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        // 在按钮数组中添加新的按钮名称
        this.buttons4.unshift(value);
      });
    },
    addCustomButton5() {
      this.$prompt('请输入按钮名称', '自定义按钮', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        // 在按钮数组中添加新的按钮名称
        this.buttons5.unshift(value);
      });
    },
    addCustomButton6() {
      this.$prompt('请输入按钮名称', '自定义按钮', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        // 在按钮数组中添加新的按钮名称
        this.buttons6.unshift(value);
      });
    },
  },
  addCustomButton7() {
    this.$prompt('请输入按钮名称', '自定义按钮', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }).then(({ value }) => {
      // 在按钮数组中添加新的按钮名称
      this.buttons7.unshift(value);
    });
  },
}
</script>

<style>
p {
  margin: 10px 0px 0px 20px;
  font: 16px;
}

.card1 {
  width: 170px;
  height: 130px;
  margin: 10px 0px 0px 15px;
  background-color: #D3D3D3;
  border: 0px;
}

.el-textarea__inner {
  margin: 10px 0px 0px 20px;
  width: 90%;
  height: 230px;
  background-color: #D3D3D3;
  font-style: italic;
  font-size: 14px
}

.button1 {
  margin: 10px 5px 0px 20px;
  padding: 0px;
  width: 120px;
  height: 25px;
  background-color: #d9d9e3;
}

.buttonimg {

  margin: 10px 0px 0px 10px;
  padding: 0px;
  width: 120px;
  height: 25px;
  background-color: #d9d9e3;
}

.buttongo {
  margin: 10px 0px 0px 15px;
  width: 120px;
  height: 25px;
  padding: 5px 15px 5px 15px;
  background-color: #d9d9e3;
}

.button2 {
  width: 70px;
  height: 27px;
  margin: 12px 0px 0px 10px;
  padding: 0px 0px 0px 0px;
  background-color: white;
  text-align: center;
}

.button3 {
  width: 150px;
  height: 27px;
  margin: 12px 10px 0px 10px;
}

.el-upload-list__item-name {
  margin: 0px 0px 0px 20px;
  width: 100px;
  height: 25px;
}

.el-upload-list__item {
  width: 130px;
}

.el-textarea__inner::-webkit-input-placeholder {
  /* 修改字体 */
  font-family: Arial, sans-serif;
  /* 修改颜色 */
  color: #d72727;
  font-size: 14px;
}

.el-textarea__inner::-moz-placeholder {
  font-family: Arial, sans-serif;
  color: #d72727;
  font-size: 14px;
}

.el-textarea__inner:-ms-input-placeholder {
  font-family: Arial, sans-serif;
  color: #d72727;
  font-size: 14px;
}


.chat-container {
  display: flex;
  flex-direction: column;
  height: 490px;
  width: 95%;
  padding: 0px;
}

.chat-messages {
  /* flex: 1; */
  overflow-y: scroll;
  /* padding: 10px; */
  height: 100%;
  width: 100%;
  background-color: #D3D3D3;
  border-radius: 4px;
  margin: 10px 0px 0px 20px;
}

.message {

  display: flex;
  word-wrap: break-word;
  padding: 5px;
  border-radius: 5px;
  align-items: center;
}

.user-bubble {
  background-color: #42b983;
  color: white;
  border-radius: 3px;

  clear: both;
  word-wrap: break-word;
  display: inline-block;
  /* 自适应宽度 */
  max-width: 70%;
  /* 设置最大宽度 */
}

.robot-bubble {
  background-color: #409eff;
  color: white;
  border-radius: 10px;
  margin-right: auto;
  clear: both;
  word-wrap: break-word;
  display: inline-block;
  /* 自适应宽度 */
  max-width: 70%;
  /* 设置最大宽度 */
}

.chat-input {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f5f7fa;
}



.request-animation {
  text-align: center;
  display: none;
}


.user-icon {
  border-radius: 3px;
  /* margin-left: auto; */
  clear: both;
  word-wrap: break-word;
  display: inline-block;
}

.bot-icon {
  align-self: flex-start;
  /* Bot icon on the left */
  margin-right: auto;
}

.user-message {
  justify-content: flex-end;
  background-color: #00000000;
  /* User message on the right */
}

.bot-message {
  justify-content: flex-start;
  /* Bot message on the left */
}

.message-content {
  background-color: #f0f0f0;
  padding: 2px;
  border-radius: 10px;
  max-width: 70%;
  word-wrap: break-word;
  font-size: 10px;
  display: flex;
  flex-direction: column;
}

.message-text {
  display: inline-block;
}

.input-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 5px;
  background-color: #f0f0f0;
  border-top: 1px solid #ccc;
  margin-bottom: 5px;
}

loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.el-input__inner {
  background-color: #D3D3D3;
  height: 30px;
  margin-left: 20px;
  width: 275px;
}

.el-input {
  display: flex;
}

.button4 {
  background-color: #D3D3D3;
  height: 30px;
  padding: 10px 10px 10px 10px;
}

.gpt1 {
  background-color: #f0f0f0;
  padding: 2px;
  border-radius: 10px;
  max-width: 70%;
  word-wrap: break-word;
  font-size: 10px;
  display: flex;
  flex-direction: column;
  margin: 10px 0px 0px 10px;
}

.el-slider__button {
  border: 2px solid #595959;
}

.el-slider__bar {
  background-color: #595959;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 200px;
  height: 210px;
}

.image-container {
  text-align: center;
  display: flex;
  background-color: #D3D3D3;
  /* 背景颜色 */
  width: 200px;
  height: 210px;
  border-radius: 5px;
}

.selected {
  border: 2px solid blue;
}

.button-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: static;
  width: 430px;
  margin-left: 20px;
}

.el-button.is-disabled {
  color: #000000;
  background-color: #bcc7d4a3;
}

.el-popover {
  padding: 0px;
  background-color: #00000000;
  border: 1px;
  position: relative;
  left: -200px;
}

.el-divider--horizontal {
  width: 90%;
  margin: 0px 10px 0px 10px;
  height: 1px;
}

.el-divider {
  background-color: black;
}

h4 {
  margin: 5px 0px 5px 0px
}

.input1 {
  width: 260px;
  margin: 10px 10px 0px 0px;
  background-color: white;
}

.scroll-container {
  height: 620px;
  overflow-y: auto;
}

.gray-button {
  background-color: #D3D3D3;
  color: white;
}

.button-container1 {
  /* display: flex; */
  /* 使用 Flex 布局 */
  justify-content: space-between;
  /* 水平分散对齐按钮 */
}

.el-upload--picture-card {
  width: 140px;
  height: 140px;
}

.rectangle-container {
  text-align: center;
}

.rectangle {
  width: 280px;
  height: 300px;
  margin: 10px;
  border: 2px dashed lightblue;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.rectangle i {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.rectangle img {
  max-width: 100%;
  max-height: 100%;
}

.button-container {
  margin-top: 5px;
  display: flex;
  width: 90%;
}

.el-divider {
  background-color: #D3D3D3;
  border: 1px solid  #D3D3D3;
}
</style>




