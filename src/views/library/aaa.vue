<template>
  <el-row style="width: 1800px;height: 1080px;">
    <el-col style="width:846px;height: 1080px;">
      <el-row style="width:846px;height:94px">
        <p style="font-family: 'Cabin'; font-size: 24px; margin:49px 0px 0px 24px">上传设计概念</p>
        <el-divider style="margin-top:0px"></el-divider>
      </el-row>
      <el-row>
        <el-popover placement="left-start">
          <!-- <div style="display: flex;">
            <div style="flex: 1;">

              <el-card
                style="display:flex; width: 300px; height: 460px; position: fixed; top:8px; margin-left: -160px;border-radius:5px; ">

                <el-button v-for="(folder, folderIndex) in folders" :key="folderIndex" class="folder"
                  @click="showImages(folder.images)">
                  <span class="folder-name">{{ folder.name }}</span>
                </el-button>

              </el-card>
              <el-dialog :visible="imageDialogVisible" title="照片" @close="closeImageDialog">
                <img v-for="(image, imageIndex) in currentImages" :key="imageIndex" :src="image" class="image"
                  style="width: 300px; height: 300px;" />
              </el-dialog>
            </div>
          </div> -->
          <el-button slot="reference"
            style="width:363px;height:363px;border-radius:20px;background-color:#D3D3D3;margin:33px 0px 10px 50px">
            <i class="el-icon-plus" style="font-size: 80px; color:	#F5F5F5"></i>
          </el-button>

          <!-- 外侧的第二个按钮 -->
          <el-button slot="reference"
            style="width:363px;height:363px;border-radius:20px;background-color:#D3D3D3;margin:10px 0px 10px 20px">
            <i class="el-icon-plus" style="font-size: 80px; color:	#F5F5F5"></i>
          </el-button>
          <!-- 外侧的第三个按钮 -->
          <el-button slot="reference"
            style="width:363px;height:363px;border-radius:20px;background-color:#D3D3D3;margin:23px 0px 10px 50px">
            <i class="el-icon-plus" style="font-size: 80px; color:	#F5F5F5"></i>
          </el-button>
          <!-- 外侧的第四个按钮 -->
          <el-button slot="reference"
            style="width:363px;height:363px;border-radius:20px;background-color:#D3D3D3;margin:10px 0px 10px 20px">
            <i class="el-icon-plus" style="font-size: 80px; color:	#F5F5F5"></i>
          </el-button>
        </el-popover>
      </el-row>
      <el-row>
        <el-col style="margin-left:50px;margin-top:10px;width: 180px;">
        <el-button style="width:165px;height:43px;padding:5px;background-color: #D9D9D9;border-radius: 10px;">上传评估标准</el-button> <br>
        <el-button style="margin-top:10px;width:165px;height:43px;padding:5px;background-color: #779D38;border-radius: 10px;" @click="selectlibrary">评估</el-button>
        </el-col>
        
        <el-col style="margin-top:10px;width: 180px;">
          <el-card style="width: 562px;height: 137px;border-radius: 20px;background-color: #FAFAFA;">

          </el-card>
        </el-col>
      </el-row>

    </el-col>
    <el-col :span="10">
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
</el-card>
</template>

<script>
import * as echarts from "echarts";
export default {
data() {
  return {
    isshow1: false,
    textarea: '',
    folders: [
      {
        name: 'Gothic Style',
        images: [
          'https://n1.itc.cn/img8/wb/recom/2016/05/20/146371615092735841.JPEG',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNyRWVHhl2xD7VbskKI7AC46tknN_Ua0uoQg&usqp=CAU',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/NotreDameI.jpg/338px-NotreDameI.jpg',
          'https://pic.quanjing.com/1i/tj/QJ6684597582.jpg@!350h',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-5Zocq44tw17miy_1MZNQAtkDnF7p0wL1_w&usqp=CAU'
        ],
      },
      // 可以继续添加更多文件夹
      {
        name: 'Modernist Style',
        images: [
          'image1.jpg',
          'image2.jpg',
          'image3.jpg',
          'image4.jpg',
          'image5.jpg',
          'image6.jpg',
          'image7.jpg',
          'image8.jpg',
        ],
      },
      {
        name: 'Futuristic Style',
        images: [
          'image1.jpg',
          'image2.jpg',
          'image3.jpg',
          'image4.jpg',
          'image5.jpg',
          'image6.jpg',
          'image7.jpg',
          'image8.jpg',
        ],
      },
      {
        images: [
          'image1.jpg',
          'image2.jpg',
          'image3.jpg',
          'image4.jpg',
          'image5.jpg',
          'image6.jpg',
          'image7.jpg',
          'image8.jpg',
        ],
      },
      {
        images: [
          'image1.jpg',
          'image2.jpg',
          'image3.jpg',
          'image4.jpg',
          'image5.jpg',
          'image6.jpg',
          'image7.jpg',
          'image8.jpg',
        ],
      },
      {
        images: [
          'image1.jpg',
          'image2.jpg',
          'image3.jpg',
          'image4.jpg',
          'image5.jpg',
          'image6.jpg',
          'image7.jpg',
          'image8.jpg',
        ],
      },
    ],
    imageDialogVisible: false, // 控制照片弹出框的显示状态
    currentImages: [],

  };
},
mounted() {

},
methods: {
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
  }
}
};
</script>

<style>
.el-icon-plus:before {
height: 100px;
width: 100px;
}

.el-popover {
padding: 0px;
background-color: #00000000;
border: 1px;
position: relative;
left: -200px;
}

.folder {
width: 130px;
height: 130px;
background-color: #D3D3D3;
margin: 10px 10px 10px 10px;
border-radius: 5px;

}

.v-modal {
background: rgb(255, 255, 255, 0)
}
</style>