<!-- <template>
    <el-row>
      <el-popover >
        <el-button
          v-for="(button, index) in buttons"
          :key="index"
          :style="buttonStyle(button)"
          @click="triggerFileInput(index)"  
          slot="reference"
        >
          <i class="el-icon-plus" style="font-size: 80px; color: #F5F5F5"></i>
        </el-button>
      </el-popover>
      <input ref="fileRef" type="file" @change="fileChange" style="display: none">
    </el-row>
  </template>
  
  <script>
  export default {
    data() {
      return {
        buttons: [
          { background: '#D3D3D3', margin: '33px 0px 10px 50px' },
          { background: '#D3D3D3', margin: '10px 0px 10px 20px' },
          { background: '#D3D3D3', margin: '23px 0px 10px 50px' },
          { background: '#D3D3D3', margin: '10px 0px 10px 20px' },
        ],
        selectedButtonIndex: 0 // 用于记录当前操作的按钮索引
      };
    },
    methods: {
      buttonStyle(button) {
        return {
          width: '363px',
          height: '363px',
          borderRadius: '20px',
          backgroundColor: button.background,
          margin: button.margin,
          backgroundSize: 'cover' // 将backgroundSize设置在这里以确保所有按钮都覆盖
        };
      },
      triggerFileInput(index) {
        this.selectedButtonIndex = index; // 记录当前点击的按钮索引
        this.$refs.fileRef.click(); // 直接使用click方法
      },
      fileChange(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.buttons[this.selectedButtonIndex].background = `url(${e.target.result})`; // 更新按钮背景
          };
          reader.readAsDataURL(file);
        }
      },
    },
  };
  </script>
  
  <style>
  .el-popover {
    padding: 0px;
    background-color: #00000000;
    border: 1px;
    position: relative;
    left: -200px;
  }
  </style>
   -->


ß
<!-- 
<template>
    <div class="test">
        <div class="upload">           
          <input type="file" id="file" multiple @change="upload">
        </div>
        <ul class="view">
          <li>
              <img src="../../assets/user1.jpg">
              <div class="delect" title="删不了我" @click="noDelect">×</div>
          </li>
          <li v-for="(item,index) in list" :key="index" >
            <img :src="item">
            <div class="delect" @click="delect(index)"></div>
          </li>     
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
       return {
          list:[],
       }
    },
    methods: {
        upload(e){
        //e.target指向事件执行时鼠标所点击区域的那个元素，那么为input的标签，
        // 可以输出 e.target.files 看看，这个files对象保存着选中的所有的图片的信息。
        console.log(e.target.files)
        //------------------------------------------------------     
        // 既然如此，循环这个files对象，用for of 循环，     
        for(let item of e.target.files) {
          //正则表达式，判断每个元素的type属性是否为图片形式，如图
          if (!/image\/\w+/.test(item.type)) {
          // 提示只能是图片，return
            alert("只能选择图片");
            return;
          } 
          // 保存下当前 this ，就是vue实例
          var _this = this;
          //  创建一个FileReader()对象，它里面有个readAsDataURL方法
          let reader = new FileReader();
            // readAsDataURL方法可以将上传的图片格式转为base64,然后在存入到图片路径, 
            //这样就可以上传电脑任意位置的图片
            reader.readAsDataURL(item);
            //文件读取成功完成时触发
            reader.addEventListener('load',function(){
            //  reader.result返回文件的内容。
            //只有在读取操作完成后，此属性才有效，返回的数据的格式取决于是使用哪种读取方法来执行读取操作的。
                //给数组添加这个文件也就是图片的内容
                _this.list.push(this.result)
            })
          }
          //------------------------------------------------------------
        },
        delect(index){
                console.log(index);
                this.list.splice(index,1);                    
            },
            // 这是默认图片的方法，弹出默认图片无法删除
        noDelect(){
            alert('默认图片无法删除。')
        },
  
    }
  }
  </script>
  
  <style>
  
  .test{
      width: 900px;
      background-color: rgb(241, 241, 241);
      margin: 50px auto;
  } 
  .view{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: space-around;
  }
   .view > li{
      width: 200px;
      height: 120px;
      background-color: rgba(54, 194, 35,0.1);
      list-style: none;
      margin: 20px;
      position: relative;
  }
  .view > li > img{
      width: 100%;
      height: 100%;
      object-fit: cover;
  }
  .delect{
      position: absolute;
      right: 0;
      top: 0;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      font-size: 15px;
      background-color: rgba(255, 255, 255,0.5);
      user-select: none;
      cursor: pointer;
      opacity: 0;
  }
  .delect:hover{
      
      background-color: rgba(31, 31, 31, 0.5);
        color: white;
  }
  .view>li:hover .delect{
      opacity: 1;
  }
   .upload{
      width: 80px;
      height: 20px;
      background-color: rgba(135, 206, 235,0.2);
      border: 1px dashed black;
      border-radius: 5px;
      position: relative;
  
  }
  .upload:hover{
      background-color: rgba(135, 206, 235,1);
  }
  .upload::before{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      content: '上传图片';
      font-size: 13px;
      text-align: center;
      font-family: 'fangsong';
      line-height: 20px;
      user-select: none;
  }
  #file{
      width: 100%;
      height: 100%;
      opacity: 0;
  }
  
  </style>
   -->

   <!-- <template>
    <el-row>
      <el-popover>
        <el-button
          v-for="(button, index) in buttons"
          :key="index"
          :style="buttonStyle(button)"
          @click="triggerFileInput(index)"
          slot="reference"
        >
          <i v-if="!button.backgroundImage" class="el-icon-plus" style="font-size: 80px; color: #F5F5F5"></i>
        </el-button>
      </el-popover>
      <input ref="fileRef" type="file" @change="fileChange" style="display: none">
    </el-row>
  </template>
  
  <script>
  export default {
    data() {
      return {
        buttons: [
          { background: '#D3D3D3', margin: '33px 0px 10px 50px' },
          { background: '#D3D3D3', margin: '10px 0px 10px 20px' },
          { background: '#D3D3D3', margin: '23px 0px 10px 50px' },
          { background: '#D3D3D3', margin: '10px 0px 10px 20px' },
        ],
        selectedButtonIndex: 0
      };
    },
    methods: {
      buttonStyle(button) {
        return {
          width: '363px',
          height: '363px',
          borderRadius: '20px',
          backgroundColor: button.background,
          margin: button.margin,
          backgroundImage: button.backgroundImage ? `url(${button.backgroundImage})` : undefined,
          backgroundSize: 'cover'
        };
      },
      triggerFileInput(index) {
        this.selectedButtonIndex = index;
        this.$refs.fileRef.click();
      },
      fileChange(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.$set(this.buttons[this.selectedButtonIndex], 'backgroundImage', e.target.result);
          };
          reader.readAsDataURL(file);
        }
      },
    },
  };
  </script>
  
  <style>
  .el-popover {
    padding: 0px;
    background-color: #00000000;
    border: 1px;
    position: relative;
    left: -200px;
  }
  </style> -->
  


  <template>
    <el-row style="width: 1800px; height: 1080px;">
      <el-col style="width: 846px; height: 1080px;">
        <el-row style="width: 846px; height: 94px">
          <!-- 标题和分割线保持不变 -->
        </el-row>
        <el-row>
          <el-popover placement="left-start">
            <template v-slot:reference>
              <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-content: space-between; height: 100%;">
                <el-button
                  v-for="(button, index) in buttons"
                  :key="index"
                  style="width: 363px; height: 363px; border-radius: 20px;  background-color: #D3D3D3; background-size: cover; background-position: center; margin:20px 0px 10px 60px"
                  :style="{ backgroundImage: button.backgroundImage ? 'url(' + button.backgroundImage + ')' : '' }"
                  @click="triggerFileInput(index)">
                  <i v-if="!button.backgroundImage" class="el-icon-plus" style="font-size: 80px; color: #F5F5F5;"></i>
                </el-button>
              </div>
            </template>
            <input ref="fileRef" type="file" @change="fileChange" style="display: none">
          </el-popover>
        </el-row>
      </el-col>
      <el-col :span="10">
        <!-- 右侧内容保持不变 -->
      </el-col>
    </el-row>
  </template>
  
  <script>
  export default {
    data() {
      return {
        buttons: [
          { background: '#D3D3D3', backgroundImage: null },
          { background: '#D3D3D3', backgroundImage: null },
          { background: '#D3D3D3', backgroundImage: null },
          { background: '#D3D3D3', backgroundImage: null }
        ],
        selectedButtonIndex: null
      };
    },
    methods: {
      triggerFileInput(index) {
        this.selectedButtonIndex = index;
        this.$refs.fileRef.click();
      },
      fileChange(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.$set(this.buttons[this.selectedButtonIndex], 'backgroundImage', e.target.result);
          };
          reader.readAsDataURL(file);
        }
      },
    }
  };
  </script>
  

  <style>
.el-icon-plus:before {
  content: "+";
  height: 80px;
  width: 80px;
  font-size: 80px;
  color: #F5F5F5;
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
</style>