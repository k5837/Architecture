<template>
  <el-row style="width: 1800px;height: 1080px;">
    <el-col style="width:846px;height: 1080px;border-right: 1px solid #cccccc;">
      <el-row style="width:846px;height:94px">
        <p style="font-family: 'Cabin'; font-size: 24px; margin:49px 0px 0px 24px">Upload Concepts</p>
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
              style="width:165px;height:43px;padding:5px;background-color: #D9D9D9;border-radius: 10px;">Upload Criteria</el-button>
          </el-upload>
          <el-button
            style="margin-top:10px;width:165px;height:43px;padding:5px;background-color: #779D38;border-radius: 10px;"
            @click="analyzeImage">Evaluation</el-button>
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
        <p style="font-family: 'Cabin'; font-size: 24px; margin:49px 0px 0px 24px">Assessment results</p>
        <el-divider style="margin-top:0px"></el-divider>
      </el-row>

      <el-row>
        <el-col style="width: 585px;">
          <div v-html="chatResponse" style="width: 515px;height: 893px;border-radius: 20px;background-color:#EDEDED ;margin: 35px 0px 10px 20px;padding:15px; font-size: 20px;font-family: 'Cabin';overflow-y: auto;scrollbar-width: thin;
    scrollbar-color: auto #888;">
          </div>
        </el-col>




        <el-col style="width: 355px">
          <div>
            <el-card style="width:355px;height:415px;background-color:#FAFAFA;margin-top:35px;border-radius: 20px;">
              <p style="margin-left:20px;">评价维度图</p>
              <div id="evaluation" style="width:350px;height: 380px;margin:5px" ref="mychat"></div>
            </el-card>
          </div>

          <div>
            <el-card style="width:355px;height:488px;background-color:#FAFAFA;margin-top:15px;border-radius: 20px;">
              <p style="margin-left:20px;">Keywords Suggestion</p>
              
              <div v-show="isVisible">
                <el-button class="button1">Sustainable Building Materials</el-button>
                <el-button class="button1">User-Centered Design</el-button>
                <el-button class="button1">Smart Building Solutions</el-button>
                <el-button class="button1">Enhanced Protective Features</el-button>
                <el-button class="button1" size="small">Green Building Practices</el-button>
              </div>

            </el-card>
          </div>
          <!-- <div style="height: 400px; overflow-y: auto; border: 1px solid #ccc; margin-top: 20px;">
            <pre>{{ analysisResults }}</pre>
          </div> -->
        </el-col>
      </el-row>

    </el-col>

  </el-row>
</template>

<script>
import 'element-ui/lib/theme-chalk/base.css';
import axios from 'axios';
import * as echarts from "echarts";
export default {
  data() {
    return {
      isVisible: false,
      analysisResults: [], // 存储分析结果的数组
      chatResponse: '',
      fileList: [],
      buttons: [
        { backgroundImage: null, errorIconVisible: false },
        { backgroundImage: null, errorIconVisible: false },
        { backgroundImage: null, errorIconVisible: false },
        { backgroundImage: null, errorIconVisible: false }
      ],
      selectedImageBase64: [],
      currentButtonIndex: null  // 添加此行跟踪当前选中的按钮索引
    }
  },
  mounted() {

  },
  methods: {

    revokeImage(index) {
      this.$set(this.buttons[index], 'backgroundImage', null);
      this.$set(this.buttons[index], 'errorIconVisible', false);
    },
    // fileChange(e) {
    //   const file = e.target.files[0];
    //   if (!file) {
    //     return;
    //   }
    //   const reader = new FileReader();
    //   reader.onload = (event) => {
    //     // 更新按钮的背景图像
    //     this.buttons[this.currentButtonIndex].backgroundImage = event.target.result;
    //     // 同时更新 selectedImageBase64 用于图片分析
    //     this.selectedImageBase64 = event.target.result.split(',')[1]; // 移除 'data:image/jpeg;base64,' 前缀
    //   };
    //   reader.readAsDataURL(file);
    // },
    triggerFileInput(index) {
      this.$refs.fileRef.click();
      this.currentButtonIndex = index;  // 更新当前按钮索引
    },
    fileChange(e) {
      const files = e.target.files;
      if (!files.length) {
        return;
      }

      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          // 更新当前按钮的背景图像
          this.buttons[this.currentButtonIndex].backgroundImage = event.target.result;
          // 同时更新 selectedImageBase64 数组用于图片分析
          this.selectedImageBase64.push(event.target.result.split(',')[1]); // 移除 'data:image/jpeg;base64,' 前缀
        };
        reader.readAsDataURL(file);
      });
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
            { name: '能源和环境', max: 6500 },
            { name: '保护', max: 16000 },
            { name: '建筑控制和服务', max: 30000 },
            { name: '用户控制和体验', max: 38000 },
            { name: '维护', max: 52000 },
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

    // analyzeImage() {

    //   this.evaluationchart();
    //   // this.isshow1 = true;


    //   if (!this.selectedImageBase64) {
    //     alert('No image selected!');
    //     return;
    //   }
    //   const url = "https://api.openai.com/v1/chat/completions"; // API URL
    //   const headers = {
    //     Authorization: `Bearer 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`, // 使用具体的API密钥
    //     "Content-Type": "application/json",
    //   };
    //   const payload = {
    //     model: "gpt-4o-mini",
    //     messages: [{
    //       "role": "user",
    //       "content": [{
    //         "type": "text",
    //         "text": "What"s in this image?"
    //       },
    //       {
    //         "type": "image_url",
    //         "image_url": {
    //           "url": `data:image/jpeg;base64,${this.selectedImageBase64}` // 使用base64图像数据
    //         }
    //       }]
    //     }],
    //     max_tokens: 300
    //   };

    //   fetch(url, {
    //     method: 'POST',
    //     headers: headers,
    //     body: JSON.stringify(payload),
    //   })
    //     .then(response => response.json())
    //     .then(data => {
    //       const content = data.choices[0].message.content;
    //       console.log('Content from OpenAI:', content);
    //       this.evaluateImageContent(content);
    //     })
    // },


    // analyzeImage() {
    //   if (this.selectedImageBase64.length === 0) {
    //     alert('No image selected!');
    //     return;
    //   }

    //   this.selectedImageBase64.forEach(base64Image => {
    //     const url = "https://api.openai.com/v1/chat/completions";
    //     const headers = {
    //       Authorization: `Bearer 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`, // 替换为实际的API密钥
    //       "Content-Type": "application/json",
    //     };
    //     const payload = {
    //       model: "gpt-4o-mini",
    //       messages: [{
    //         "role": "user",
    //         "content": [
    //           {
    //             "type": "text",
    //             "text": "What"s in this image?"
    //           },
    //           {
    //             "type": "image_url",
    //             "image_url": {
    //               "url": `data:image/jpeg;base64,${base64Image}`  // 使用base64图像数据
    //             }
    //           }
    //         ]
    //       }],
    //       max_tokens: 300
    //     };

    //     fetch(url, {
    //       method: 'POST',
    //       headers: headers,
    //       body: JSON.stringify(payload),
    //     })
    //       .then(response => response.json())
    //       .then(data => {
    //         const content = data.choices[0].message.content;
    //         console.log('Content from OpenAI:', content);
    //         this.evaluateImageContent(content);
    //       });
    //   });
    // },

    // async evaluateImageContent(imageContent) {
    //   const principles = `1. Energy and environmental performance. As part of the building, AF are associated with multiple environ mental variables. In this category, we classifified energy and carbon emissions related aspects that get inflfluenced by, or interact with, the façade design. This includes operational or embodied energy and carbon for AF. AF systems directly inflfluence the building in door environment and have an impact on the cooling and heating loads. The underlying building physics of AF systems in relation to building energy performance and envelope life cycle assessment is one of the KPIs for AF. The logic behind this category is to group the variables that quantify the façade"s environmental impact and performance. 
    //   2. Protective performance. The following set of KPIs is the protective performance of AF. Inspired by the defifinition of Herzog et al we grouped all per formance aspects related to structural stability and safety, together with construction related criteria under this category. The underlying building physics and material science of AF systems takes into account fifire resistance and structural performance next to acoustic and visual performance. This includes water and air permeability and the radiation properties for natural lighting and solar control.The logic behind this category is to group the variables that justify the façade"s function and stability from a user point of view. 
    //   3. Building control and services. The interaction between HVAC systems and the AF that takes place to assure comfort is the third category. Under this group we address the four types of comfort, in direct relation with building management systems and façade controls. The management and interaction through automated and smart technologies is based on a set of variables that fifits under this category. Building services including mechanical ventilation and active systems and their direct control to achieve indoor comfort are grouped under this category. The logic behind this category is to group the variables that relate to active control of the building services in relation to the façade and indoor comfort requirements. 
    //   4. User control and experience. The fourth KPI category, groups variables related to occupant control and engagement. The subjective perception on the indoor environment of users in relation to their ability to act and engage with the façade to regulate their living or working environment is grouped under this category. The logic behind this category is to group the variables that quantify occupant control and engagement with the façade within the indoor environment. 
    //   5. Maintenance, durability and life cycle. The fififth group of KPIs collects the variables related to time. As pects related to the life of the façade during operation are grouped in this category including maintenance, replacement, cleaning and durability. This category also includes cost-related parameters and end of life cycle or guarantee issues. The logic behind this category is to group the variables that maintain the façade performance, components and elements.`; // 插入全部原则文字

    //   try {
    //     const response = await this.sendToChatGPT(imageContent, principles);
    //     let botResponse = response.data.choices[0].message.content; // Adjust according to your API response structure
    //     botResponse = botResponse.replace(/(\d+)\.|综合来看|综合评估|综上所述/g, '<br><br>$&');
    //     this.chatResponse = botResponse;

    //   } catch (error) {
    //     console.error("Error during evaluation:", error);
    //     this.chatResponse = 'Error retrieving response'; // 处理错误情况
    //   }
    // },
    // analyzeImage() {
    //   if (!this.generatedImages || this.generatedImages.length === 0) {
    //     console.error('No image generated!');
    //     return;
    //   }

    //   let analysisResults = [];
    //   let analyzeCount = 0;

    //   this.generatedImages.forEach(image => {
    //     if (image.url) {
    //       const url = "https://api.openai.com/v1/chat/completions";
    //       const headers = {
    //         Authorization: "Bearer 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",
    //         "Content-Type": "application/json",
    //       };
    //       const payload = {
    //         model: "gpt-4o-mini",
    //         messages: [
    //           {
    //             "role": "user",
    //             "content": [
    //               {
    //                 "type": "text",
    //                 "text": "请根据图片中的建筑的建造材料来评估该建筑外立面的建材碳排放量，并使用A、B、C、D进行评级。"
    //               },
    //               {
    //                 "type": "image_url",
    //                 "image_url": image.url
    //               }
    //             ]
    //           }
    //         ],
    //         max_tokens: 300
    //       };
    //       console.log("Sending Payload:", JSON.stringify(payload, null, 2));

    //       fetch(url, {
    //         method: 'POST',
    //         headers: headers,
    //         body: JSON.stringify(payload),
    //       })
    //         .then(response => response.json())
    //         .then(data => {
    //           analysisResults.push(data.choices[0].message.content);
    //           analyzeCount++;
    //           if (analyzeCount === this.generatedImages.length) {
    //             console.log('Complete response for image analysis:', analysisResults); // 打印完整的响应内容
    //             this.analysisResults = analysisResults;
    //           }
    //         });
    //     }
    //   });
    // },
    analyzeImage() {
      this.isVisible = !this.isVisible;
      this.evaluationchart();

      if (this.selectedImageBase64.length === 0) {
        alert('No image selected!');
        return;
      }

      let analysisResults = [];
      let analyzeCount = 0;

      this.selectedImageBase64.forEach(base64Image => {
        const url = "https://api.openai.com/v1/chat/completions";
        const headers = {
          Authorization: `Bearer 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`, // 替换为实际的API密钥
          "Content-Type": "application/json",
        };
        const payload = {
          model: "gpt-4o-mini",
          messages: [{
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": "Please analyze the uploaded building image and identify its shape and structural features (such as curves, waves, straight lines), exterior materials (such as glass, metal, concrete), primary colors, any adaptive or dynamic features (such as movable shading devices, responsive glazing), classify its architectural style based on the shape, materials, and colors, and identify functional elements (such as windows, balconies), and provide a summary."
              },
              {
                "type": "image_url",
                "image_url": {
                  "url": `data:image/jpeg;base64,${base64Image}`  // 使用base64图像数据
                }
              }
            ]
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
            console.log('Complete response for image analysis:', data); // 打印完整的响应内容
            analysisResults.push(data.choices[0].message.content);
            analyzeCount++;
            if (analyzeCount === this.selectedImageBase64.length) {
              this.analysisResults = analysisResults;
              this.evaluateImageContent(analysisResults);  // 当所有图片都分析完毕后，调用评估方法
            }
          });
      });
    },


    async evaluateImageContent(imageAnalysisResults) {
      const combinedContent = imageAnalysisResults.join("\n");
      // 调用一个API或者内部逻辑来对合并的结果进行评估
      //       const principles = `Abstract
      // During the last decades, a great number of innovative building envelope materials and façade components have been developed. The majority of these technologies promise significant improvements in energy efficiency and occupant's comfort, with products that are easily available in the market. However, it remains a challenge to assess the performance of such facades, leading to difficulties for efficient design, operation, and maintenance. As a consequence, the market adoption of adaptive facades is not realizing its full potential, resulting in missed opportunities for energy savings and improved occupant satisfaction. In this study, the current trends of adaptive facades are investigated, with particular emphasis on their performance assessment. Based on extensive literature review, the gaps in assessment of adaptive facades are determined and a novel object-based façade characterization and classification framework is proposed. Furthermore, a generic stakeholder map and process map are presented to explain current adaptive façade delivery practices. In addition, the findings of interviews and two focus group discussions with experts and specialists are presented to elucidate their expert opinions, leading to a validated framework of key performance indicators. As results of this paper, the gaps related to adaptive façade systems" assessment are identified with respect to the different actors and stakeholders, and insights and perspectives on current trends and future challenges of adaptive façade system assessment are provided.

      // Keywords
      // Assessment frameworkDynamic facadesEnvelopeDelivery processFaçade contractorKey performance indicators


      // 1. Introduction
      // Adaptive facades (AF) are building envelopes that are able to adapt to changing boundary conditions in the form of short-term weather fluctuations, diurnal cycles or seasonal patterns. Such facades have the ability to respond to, or benefit from, changes in outside climatic conditions and dynamic occupant requirements [54], [55]. By "adaptive façade system", we mean the whole façade assembly, including the components that can be preassembled in plants as prefabricated units or supplied separately on site, and which is designed to perform as an integral part of the building. This definition is in line with the scope of EU COST Action TU1403 "adaptive facades network", under whose auspices the present study was carried out [21]. The initiated COST Action TU1403 "adaptive facades network" aims to pool together the knowledge, technologies and research from across European countries and beyond [57]. The main objective of this Action is to harmonize, share and disseminate technological knowledge on adaptive facades at a European level. It is in this context that we use the term "adaptive facades" and articulate their definition.
      // When the façade state transitions are controlled in an optimal way, maximum indoor environmental quality and comfort can be ensured without compromising on energy consumption [26]. Perino and Serra [63] identified that AF can accomplish step-change progress in energy efficiency and in promoting the use of renewable energy in the built environment. Various AF technologies and components are commercially available, including movable shading, electrochromic glazing and phase change materials. Scientific publications, documenting the research and development phase of such façade systems, consistently demonstrate significant performance benefits compared to conventional alternatives (e.g. [28], [29], [40], [75], [76], [14]). However, despite continued technological development of façade solutions, many of which break new ground with respect to innovative dynamic use of façade glazing and fenestration, AF have not yet achieved a significant market share.
      // If buildings with AF do indeed lead to higher occupant satisfaction and reduced environmental impact, then it is of primary importance to investigate and better understand how these "early adopter" buildings perform, and to communicate these findings to relevant stakeholders [45]. By showing how design intent can successfully translate into high operational performance, it is expected that the market adoption of innovative building technologies such as AF can be accelerated [2], [20], [46], [52], [57], [83].
      // Apart from process challenges in the early design phase, which have been discussed elsewhere [36], [39], [74], and are outside the scope of this study, there are two other types of barriers that hinder the successful market adoption of buildings with AF.
      // * •
      // The first barrier relates to difficulties in performance quantification and evaluation of buildings with AF. There is a lack of holistic performance criteria based on testing, assessment and monitoring ([1], [65]). Although there is an ample amount of standards and criteria to assess façades at the material or component level, there are hardly any standards for complete façade assemblies [41]. In addition, there are no prospective studies or best-practices assessing and documenting the performance of AF systems. This knowledge gap is significant and requires being addressed by the scientific community in order to simplify the evaluation of AF based on solid science.
      // * •
      // A second barrier concerns the delivery process of high-performance facades, which consists of multiple stages, including the design-assist stage (e.g. durability testing, visual mock-ups, onsite panel mounting and weather stripping), construction verification stage, commissioning stage, soft-landing stage and operation stage. Design and construction of buildings with AF tends to transcend multiple engineering disciplines, expecting a high degree of coordination among all the actors involved. This leads to a number of process-related challenges, which take place in a professional environment with procurement mechanisms that in many cases are not streamlined to efficiently accomplish these tasks [13], [24], [37], [6].
      // As a contribution to addressing the mentioned barriers, the purpose of this paper is to identify the gaps related to AF systems" evaluation requirements and processes, and to provide insights into current trends and future challenges in this domain. More importantly, the study presents a novel assessment framework with key performance indicators (KPIs), intended to be used to structure the assessment of requirements, performance criteria and qualitative technical characteristics of AF systems, considering their multi-domain and multi-stakeholder features. The originality of the paper is twofold. The paper provides a broad overview on the challenges of AF evaluation and assessment bringing insights from EU member states, which has not been done before. Also, the paper identifies an initial framework for AF assessment that was validated based on mixed methods of research. As such, the framework brings a consensus for best practices in European countries regarding AF performance assessment, to bridge the knowledge gap and to eventually increase the AF market uptake.
      // Major components of the paper include a literature review that covers more than 50 publications, process mapping based on detailed analysis of three case studies with AF, followed by the results of twenty interviews and two focus groups discussions (FGD). The literature review allowed us to identify the definitions and functions of AF and to propose an assessment framework that distinguishes AF on the material, component, system and building level. Then, the process mapping allowed us to map the key construction and operation milestones of AF while identifying the roles of stakeholders, including façade contractors and facility managers. The process mapping was associated with identifying the key performance indicators (KPI) related to contractual obligations, occupant comfort and façade operation. This led to the development of an initial framework of KPIs, intended to be used to structure the assessment of requirements, performance criteria and qualitative technical characteristics of AF systems. This was followed by the results of a series of interviews and two FGD that were conducted to gain a deeper understanding from façade experts on the performance expectations of AF.
      // This study is organized into eight sections. The research methodology and study framework is presented in Section 2. Section 3 describes a literature review in which more than 50 publications were analysed, and discusses the definition of AF that is used throughout this study. In the fourth section, the process-mapping activity of three detailed case studies is presented, leading to a generic process map for AF design and delivery. In Section 5, the set-up and main results of series of interviews and FGD with façade industry professionals, which were used to validate the AF assessment framework, are described. Section 6 presents an object-based classification of KPIs and AF assessment framework. Finally, Sections 7 and 8 discuss the main findings of the study and concludes the study.
      // 2. Materials and methods
      // In this section, we present the research methodology, including the study concept. Similar to the work of Prieto et al. [66], Loonen et al. [52] and Attia et al. [10], [9], our research methodology combines mixed methods of research involving collecting, analysing and integrating quantitative (e.g., case studies) and qualitative (e.g., focus groups, interviews) research.
      // 2.1. Study concept
      // The concept of this study was built around four axes in the context of developing a framework to assess adaptive facades and creating a performance classification system. The study concept adapted in this research borrowed from the review continuum that will be presented in Section 3. The study concept focused on four key approaches for data collection and validation of the proposed assessment framework. Fig. 1 illustrates a detailed flow chart of the research endeavor. The figure illustrates the earliest steps comprising the literature review, passing by the selection of three case studies of adaptive facades and mapping their delivery process until the validation of the framework based on experts" interviews and focus group discussions.
      //  Fig 1 

      //    * Download: Download high-res image (229KB)
      //    * Download: Download full-size image
      // Fig. 1
      // 2.2. Literature review
      // A literature review comprising more than 50 publications was conducted to identify elements found in literature relevant to adaptive facades" performance evaluation and assessment. In order to elaborate the review, Google Scholar, Elsevier Engineering Village and Web of Science database searches were conducted during May 2018. The aim here was to collect articles exploring studies which may have performed any evaluation and assessment of AF. The aim was to collect articles and group them, exploring factors which may have an impact of adaptive façade's performance during construction and operation. The literature review presented in Section 3 identifies and describes a knowledge gap on the assessment of adaptive facades.
      // 2.3. Process mapping and case studies analysis
      // In the published scientific literature, there is very little information about the delivery process of advanced facades, and no information could be found concerning AF. As part of identifying the current trends and future challenges in AF system assessment, we have therefore carried out detailed mapping of the façade's project delivery process of three cases studies with adaptive facades. These analyses were based on process mapping and interviews with design, construction and operation stakeholders (see Section 3.2).
      // Process mapping is very valuable when coupled to well-documented case studies because it brings direct insights from the practical experience and production and assembly chain ([[30], [61], 79]). It is considered as an effective methodology used in several industries to detect errors and clashes and prospectively improves quality [77], [43]. Based on the work done in Working Group 3 of the COST Action TU1403, we identified the best available and documented case studies with AF. The selection criteria were based on finding detailed and available data including process maps for the construction and operation stages of adaptive facades. The three case study analyses included:
      //    * •
      // AGC Building in Louvain-La-Neuve, Belgium has an adaptive glass façade. The external façade is fully covered with double glazing system in combination with thermally insulated glass sunshades printed with white silk screen. These louvers respond dynamically and automatically to the angle of the sun which improves the control over energy consumption, solar radiation and glare with the ability to admit natural light into the building while affording a view over the surrounding countryside. The results of a mapping process and study analysis can be found in the previous work of Attia and Bashandy [6].
      //    * •
      // Al Bahr Towers in Dubai, UAE has an adaptive screen system. The curtain wall is separated from the kinetic shading system through a substructure by means of movement joints. The dynamic shading system is a screen comprised of triangulate units such as origami umbrellas. The triangular units act as individual shading devices that unfold to various angles in response to the sun's movement in order to obstruct the direct solar radiation. The results of a mapping process and study analysis can be found in the previous work of Attia [7], [5]
      //    * •
      // The Swiss School in Dubai, UAE has an electrochromic glazing facade. One hundred ten square meters of electronically tintable glass was installed in both façade with a window-to-wall ratio (WWR) of 85%. Dynamic glass controls sunlight in order to optimize daylight and maintain outdoor views while simultaneously enhance occupant comfort by preventing glare and solar heat. The results of a mapping process and study analysis can be found in the previous work of Bilir et al. [12].
      // The three case studies include AF technology and are considered as real construction projects that embed innovative AF technologies and manufacturing techniques. The case study analysis focused on the project delivery process and in particular looked at the processes immediately before and after construction, including operation. Multiple stakeholders involved in the three case studies were interviewed and several documents were reviewed to identify key actors and their roles in each project. The results of the process mapping and case studies analysis are reported in Section 4.
      // 2.4. Interview set-up and background information
      // One of the data collection approaches adopted in this study was semi-structured interviews with façade experts. Validation of the performance assessment framework was one of the key objectives of the interviews, together with the focus group discussions presented in Section 2.5. A semi-structured interview guide was developed based on elements found in relevant literature (see Section 3). Before the interviews were conducted, the authors set up a pilot study to test and improve the questionnaire's consistency. Peer reviewers were asked to comment and revise the questionnaire to provide critical feedback in order to optimize the clarity and relevance of the questions. The interview questionnaire form was validated by a façade engineer pursuing research in facades testing and inspection. The sampling of interviewees was based on a pool of experts. Façade experts, working mainly in practice, were recruited. Experts who worked at least for 5 years in the field of façade engineering and participated in at least one AF project were identified during façade-related conferences and were interviewed from 2015 to 2018. Of those who met inclusion criteria 30 interviewees were chosen. However, only 20 replied our invitation and went through the interview process. After interviews, verbatim transcriptions were prepared, and the authors asked interviewees for approval of their answers or to include the necessary revisions. All interviews took place with experts linked to European based companies.
      // Details on the interviewed professionals and their companies are not herewith given for the sake of privacy and to prevent any commercialism. However, it is important to state that all the interviewed professionals belong to internationally active companies with a reputation of being leading actors or innovative firms in the AEC industry. These companies are on a daily-basis involved in both independently developed and cooperative research and innovation activities.
      // As interviews were conducted in English, a thematic content analysis took place. Interviews were analyzed for content by research terms (delivery process, performance monitoring, quality assurance and POE) and then classified by theme. After, all information was organized into a table, categorized and analyzed to understand its underlying meaning. Interpretations of interviews were validated by two external researchers. The detailed results can be found in the report of Attia et al. [2].
      // The interview structure consisted of five main sections (Attia et al., [2]). In the first section, we identified the background information of the interviewees and their professional experience. In the second section, the definition and interpretation of an adaptive facade was discussed with the experts. In the third section of the interview, participants were asked about the advantages of adaptive facades. On the contrary, in Section 4, the participants were asked about the perceived disadvantages of adaptive facades. Finally, in Section 5, their thoughts about the future of adaptive facades were recorded (see Section 5).
      // 2.5. Focus group discussions
      // Guided focus group discussions (FGD) were conducted during the COST Action TU1403 Industrial workshops. The focus groups were administered as a collective exercise. With the guidance of a facilitator we identified the barriers of increasing the market uptake of AF and understand the gaps between their theoretical design and implementation in operational reality. The output of the FGD was two reports, which were developed via participants" consensus to reflect the key steps and roadblocks identified during the panel conversations of the industrial workshops (see Appendix A). Participants of the FGD were identified based on their experience in practice representing engineering and architectural firms. Two focus groups were conducted during the industry workshops of the COST Action TU1403 in and 2015 and 2018. FGD (overall 10 participants) were held on the September 16th 2015 in TU-Delft and the 15th of March 2018 in Nova University of Lisbon. Validated FGD were analysed by research theme to identify and understand the reality of adaptive facades performance, added value and potential for scaling up (see Section 5).
      // 3. Definition and assessments of framework
      // In this section, we present a common definition of AF that describes their protective and performance capabilities based on a literature review. Then, we provide a summary of key publications that aimed to propose or develop performance assessment schemes to quantify the performance benefits of AF systems on the building scale and occupant level. Finally, we discuss the literature results and highlight the key approaches and measures towards an AF assessment framework.
      // 3.1. Definition of adaptive façade
      // Facades are one of the main building elements that influence the energy performance and occupant well-being in buildings. Current standards assume constant climatic conditions when the performance of building envelopes is assessed. However, adaptive facades can react to climate in a dynamic way, thereby creating opportunities for improving indoor environmental quality. According to the EU COST Action TU1403 - Adaptive Façades Network, AF can ensure step-change progress regarding energy efficiency and promote the use of renewable energy while increasing the productivity and satisfaction of occupants [55]. AF can adapt to changing climatic conditions and occupant requirements on a time horizon that ranges from minutes to seasonal variation. By using the word "adaptive", we refer to the capacity to respond to, or benefit from, outside climatic conditions to meet efficiently, and more essential, successfully occupants" needs [1], [55].
      // Several existing projects integrating adaptive building envelopes have been constructed worldwide. According to the online climate adaptive building shells (CABS) database, which has been continuously updated, there are at the moment more than five hundred examples of buildings with adaptive facades [54]. Currently, European research in the field of adaptive building envelopes is coined by numerous nationally funded projects. Among those projects that intend to create value through knowledge transfer between the individual research institutes and with the industry is EU COST Action TU1403.
      // 3.2. Summary of literature review
      // The outcomes of this section take two previous literature reviews conducted by the co-authors as a starting point. The studies of Attia et al. [8] and Struck et al. [73], reviewed more than 50 books, research projects and papers in relation to AF" performance assessment. However, in this section, we selected only the 13 most relevant publications and listed them in Table 1. We will discuss the literature review results in the following paragraph.
      // Table 1. A brief literature review about assessments of AFs.
      // #
      // 	Reference
      // 	Study parameters
      // 	Focus
      // 	Gaps
      // 	Findings
      // 	1
      // 	[54]
      // 	Sources of inspiration, relevant physics, time-scales, scale of adaptation (macro-micro), control types (extrinsic-intrinsic)
      // 	The paper presents a comprehensive review of research, design and development efforts in the field of CABS. Based on literature review, a classification of 44 CABS is made to place the variety of concepts in context with each other, and concurrent developments.
      // 	The paper was concluded with a view on the future perspectives of CABS (design and decision support, operational issues, human aspects, future perspectives) however there is no data about AF system assessment.
      // 	The concept of CABS cannot yet be considered mature. Future research needs and further challenges to be resolved are therefore identified as well.

      // 	In doing so, the overall enabling technologies, and characteristic features that have contributed to the development of CABS are highlighted.motivations,


      // 	2
      // 	[1]
      // 	Thermal comfort, energy performance, IAQ and visual and acoustic performance, durability, solar radiation, outdoor temperature and humidity, wind and precipitation, noise, building type, type of surface
      // 	The focus of this paper is to contribute to these developments aiming at providing a classification of the adaptive façade materials, components and systems according to indoor and outdoor parameters.
      // 	In this study, external factors associated with the need of adaptive façades were assessed, however, there is no data about AF system assessment.
      // 	Solar radiation together with outdoor temperature is the most common external factors associated with adaptive façades. Because the factors are known to have a direct influence on thermal and visual comfort and on energy performance of buildings it is reasonable to conclude that the existing adaptive façades projects have as primary objective the improvement of human's comfort.
      // 	3
      // 	[8]
      // 	The dynamic insulation efficiency, the preheating efficiency, the BTR factor
      // 	This paper reviews current evaluation methods for assessing adaptive facade systems through a literature review. It also discusses occupant behavior, post-occupancy evaluation and commissioning issues and presents the procedures.
      // 	The study only addressed the performance evaluation in an initial study context without investigating market needs, occupant expectations and façade experts" experiences.
      // 	Specialized technology monitoring techniques to assess the performance of technologies such as fabric-integrated solutions (e.g. electrochromic glazing, phase-change materials, building-Integrated Photovoltaics with heat recovery (BIPV/T, shade shutters) and advanced controls.
      // 	4
      // 	[73]
      // 	Performance requirements, façade components, innovative facade concepts
      // 	This paper reviews performance requirements and design approaches. It also discusses cases and market needs of AF systems.
      // 	The study only addressed the performance evaluation in an initial study context without investigating occupant expectations and façade experts" experiences.
      // 	An overview of the state of the art in the field of AF and their applications to the built environment.
      // 	5
      // 	[11]
      // 	Control strategies, occupant influence options, dynamic daylight aspects, visual performance
      // 	This paper explores and quantifies the influence of automated facade operation on user satisfaction and interaction by presenting the results of a pilot study.
      // 	The study presents four different scenarios and hypotheses, however, there is no data about AF system assessment.
      // 	Less frequent but discrete transitions in facade configuration are significantly better appreciated than smooth transitions at a higher frequency.


      // 	There is a need for further development of effective facade control algorithms. The ability for manual override is a requisite for high-performance operation of dynamic facades.
      // 	6
      // 	[53]
      // 	Heating energy use and thermal comfort
      // 	This paper investigates two different strategies for representing the dynamic aspects of RBEs using whole-building performance simulation tools.
      // 	This study is only simulation-based, so it is rather theoretical. There is no measure or evaluation data about real-world AF system assessment.
      // 	A simplified simulation strategy is not always capable of accurately capturing the relevant physical phenomena in RBEs. Especially when thermal storage effects are involved, the adaptation needs to take place during simulation run-time, to prevent significant errors in the results.


      // 	Simulations are performed for two case studies: (i) A coating with variable emissivity/absorptivity properties, (ii) A storage wall with switchable insulation.


      // 	[68]
      // 	Transmission, cavity air flow rate, temperature (interior-exterior), annual heating and cooling demand,
      // 	This study discusses modeling the energy performance of an office equipped with a conventional insulated glazing unit with exterior shading and with three multiple-skin facade typologies (an airflow window, a supply air window, and a naturally ventilated window) under typical Belgian weather conditions.
      // 	This study is only simulation-based, so it is rather theoretical. There is no measure or evaluation data about real-world AF system assessment.
      // 	Variants performing well in winter are not necessarily beneficial in summer. Combining typologies or changing the systems" settings according to the particular situation will be necessary to obtain an overall year-round improvement. The results further indicate that evaluating the energy efficiency of multiple-skin facades cannot be performed by solely analyzing the transmission losses and gains.


      // 	It is imperative to take into account the enthalpy change of the cavity air and to perform a whole building energy analysis.
      // 	8
      // 	[72]
      // 	Occupant control, automated element, automation use, layout of surveyed area, ventilation/cooling, level of control, façade type
      // 	The focus of the study is the most common form of intelligent facade which the research has termed automated glazed facades. The main elements of occupant concern are identified and the potential of the automated provision of occupant requirements is discussed in light of the findings.
      // 	There are no measures or evaluation data about the AF system assessment.
      // 	Occupant control is found to be the dominant issue affecting occupant satisfaction in buildings with intelligent facades. The importance of occupant control is shown to be rooted in the occupants" ability to achieve their desired conditions.
      // 	9
      // 	[25]
      // 	Energy savings, reduction in thermal solar heat gains, useful daylight autonomy, glare threshold and visual comfort, glare threshold incidence
      // 	This paper compares the performance of different dynamic shading typologies and assesses their impacts on building energy savings, daylighting distribution, glare control, and solar insolation management for a typical office space in ASHRAE Climate Zone 4C.
      // 	There are no measures or evaluation data about the AF system assessment.
      // 	A framework for the parametric design and assessment of dynamic shade systems based on their performance and climatic suitability for the main eight ASHRAE's climate zones
      // 	10
      // 	[62]
      // 	Summer energy performance, thermal comfort, summer thermal comfort
      // 	This paper presented and analyzed some recent innovative solutions for penetration: PCM material to improve the poor thermal inertia of the glass and self-switchable technologies such as thermotropics.
      // 	The study presents innovative solutions for design of transparent building envelopes, however, there is no data about AF system assessment.
      // 	A new methodology for the design phase is proposed to simplify and optimize the designers' choice among innovative envelope technologies, besides encourage their spread.
      // 	11
      // 	[69]
      // 	U-factor, G-value
      // 	In this paper, a numerical model to evaluate the thermal behavior of active envelopes is discussed and compared with in situ measurements. After implementing the numerical model in an energy simulation program, an annual energy simulation on a selected number of active envelope typologies has been performed and compared to a classical cladding system.
      // 	This study is only simulation-based, so it is rather theoretical. There is no measure or evaluation data about real-world AF system assessment.
      // 	The results were compared to those of a traditional cladding system. Compared to the traditional cladding solution, active envelopes proved to have lower transmission losses but higher transmission gains. These results cannot, however, be extrapolated to the office heating and cooling load. Also, in order to correctly evaluate the energy efficiency of active envelopes, it is imperative to take into account the enthalpy change of the cavity air.
      // 	12
      // 	[49]
      // 	Technical solutions, design process, building performance, building case studies
      // 	In this study, the authors investigated the building physics concepts, building performance and design tools of high performance commercial building facades.
      // 	The study addressed the concepts, performance evaluation and case studies without investigating occupant expectations and façade experts" experiences.
      // 	The authors determined some critical needs that must be satisfied before such systems can be routinely engineered. Some of these needs are: 1.Design tools must provide enhanced power to accurately model complex integrated building systems. 2. Algorithms to model optically complex façade elements must be developed and validated. 3. A variety of thermal coupling strategies between the façade and the whole building must be adequately simulated.
      // 	13
      // 	EN 13830 (10.07.2015)
      // 	Product characteristics (e.g. fire resistance, water tightness, wind load resistance), testing, assessment and sampling methods
      // 	This document specifies requirements of curtain walling kit intended to be used as a building envelope.
      // 	This standard only contains curtain walling characteristics and assessment. There is not any measure or evaluation data about other AF systems.
      // 	This standard gives the assessment and verification of constancy of performance (AVCP) of curtain walling used as a building envelope.
      // 	14
      // 	[42]
      // 	Heat transfer model, dynamic heat dissipation, thermal time constant, thermal conductivity, density of concretes, average daytime temperature
      // 	This study investigates the potential of energy simulations to support the exploration-driven development of two innovative responsive building elements: Sponge3D and Convective Concrete
      // 	This study is only simulation and experimentation based, so it is rather theoretical. There is no evaluation data about real-world AF system assessment.
      // 	This study summarized the process and outcomes of simulation-based research activities in the development of 2 adaptive building envelope systems (Sponge3D and Convective Concrete).
      // 	15
      // 	[16]
      // 	Dynamic glazing; electrochromic glazing; smart windows; gasochromic window; electrokinetic pixel window; nanocrystal in-glass composites window
      // 	Review of active dynamic glazing technologies on the market or in development, such as electrochromics, gasochromics, and further emerging technologies, including nanocrystal in-glass composites, electrokinetic pixels, elastomer-deformation tunable window, and liquid infill tunable window
      // 	The study remains theoretical without a classification or categorization of active dynamic windows assessment criteria. The use experience is not present and the comparative data is based on suppliers and producers data.
      // 	Highly innovative glazing for the building envelope is discussed.


      // 	Active dynamic glazing technologies available or in development are thoroughly reviewed.



      // 	Performance and benefits/drawbacks of different smart windows technologies are compared.


      // 	Needs for improvement and future trends of active dynamic glazing are considered.
      // 	One of the earliest publications on AF is the Intelligent Skins book [81] that was based on the EU COST Action C13: Glass and Interactive Building Envelopes. The project BESTFAÇADE funded by the EU resulted in producing one of the earliest databases on Best Practice for Double Skin Façades [35]. Then, the book of Knaack et al. [44] entitled "Facades: Principles of Construction" that appeared in its first edition in 2007 was one of the first publication that explicitly uses the term "adaptive facades" for façades types classification. More specifically, the study of Loonen et al. [54] defined AF as climate adaptive building shells (CABS). In this study, the authors reviewed and classified 44 CABS and distinguished different technologies, features and characteristics of dynamic facades. Similarly, the study of Aelenei et al. [1] aimed to classify AF regarding materials, components and systems according to indoor and outdoor parameters. The study tested 130 buildings to characterize the building envelope adaptivity following a qualitative approach. However, all those studies focused mainly on proposing a classification for AF that can be used during early design phases. A discussion on the post-construction performance expectation was not provided. The work of Attia et al. [8] and Struck et al. [73] is one of the few contributions towards the identification of dynamic performance requirements for AF systems. Both studies presented an initial literature review compared to our current study that explores the topic of AF performance assessment more profoundly and in an extended way.
      // Among the reviewed publications, Table 1 is lists the work of Pierleoni et al. [62] Saelens and Hens [69]; Stevens [72]; Saelens et al. [68]; Bakker et al. [11]; Loonen et al. [53]; Tavares et al. [75]; de Klijn-Chevalerias et al. [42] and Elzeyadi [25]. All these publications have something in common. They are focusing on single performance parameters of facades, mainly during the design phase using simulation methods or based on lab experiment measurements. In fact, there is an extended body of knowledge about single facades performance variables, but it is mainly focused on static facades. In addition, there are many studies that discuss simulation-based performance prediction of conventional and adaptive facades [52], but these studies are disconnected from performance in the post-construction phase. For this study, we could not find a body of knowledge that is concerned with evaluations of AF performance. On the other hand, two important reference documents were identified as valuable for this review. The first is the study of Lee et al. [49], which is focused on high performance commercial building facades. The study investigated the concepts and trends of transparent glazed facades and the optical and thermal modelling of advanced façade systems. The study also provides a valuable insight into the role of stakeholders in the façade delivery process and the determining factors of facade design and engineering. The second reference is the European standard for curtain walls [15]. This standard specifies the technical characteristics of curtain walls and includes a systematic framework of requirements, test methods and compliance criteria for curtain wall façade systems. The normative references are grouped under 17 main criteria as listed below:
      //       * •
      // Fire resistance
      //       * •
      // Fire propagation
      //       * •
      // Water tightness
      //       * •
      // Resistance to dead load
      //       * •
      // Wind load resistance
      //       * •
      // Resistance to snow load
      //       * •
      // Impact resistance
      //       * •
      // Resistance to horizontal loads
      //       * •
      // Seismic resistance
      //       * •
      // Thermal shock resistance
      //       * •
      // Direct airborne sound insulation
      //       * •
      // Flanking sound transmission
      //       * •
      // Thermal transmittance
      //       * •
      // Air permeability
      //       * •
      // Water vapour permeability
      //       * •
      // Radiation properties
      //       * •
      // Durability
      // The document was published recently and cites key normative references that are available to ensure the integrity and quality of curtain walls. Both documents remain technical and generic, lacking an assessment of the façade interaction with building services and occupant personal control. In the case of AF, it is crucial to rely on a set of KPIs that address the dynamic nature of the façade and establish requirements for the façade system performance in relation to building and users. As a conclusion of our literature review, we confirm the presence of a knowledge gap regarding the assessment the AF systems and the necessity to develop an assessment framework on the short term and normative standards in the long term.
      // 3.3. Towards the assessment of adaptive facades systems
      // During our literature review, we could identify four levels of research intervention with facades" evaluation. Table 2, categorizes those levels following an object-based logic that decomposes the façade system as a material, as a component, as a system and as part of a building.
      // Table 2. Object-based façade classification review table.
      // Empty Cell
      // 	Related journal papers
      // 	Building

      // 	System

      // 	Component

      // 	Material

      // 	The complexity of facades and in particular high-performance facades makes it intersect with different domains of knowledge. The domains of knowledge include building physics, optical and thermal modelling, material science, chemical engineering, construction engineering, architectural design and building services engineering. Therefore, the literature review was based on a thematic classification of the publications according to the domain of knowledge of the publication. Out of 50 reviewed publication we selected 15 publications that had a direct relation with AF performance assessment and grouped them as shown in Table 1. The inclusion criteria used to generate the table included terms such as "performance" "assessment" "evaluation" "monitoring" "facade" "skin" "envelope" "quality" "operation" and "system".
      // Remarkably, our literature review confirmed our finding on the lack of assessment criteria for advanced building facades and in particular AF. Table 2 lists the key publications found in literature that are directly or indirectly related to dynamic facades" performance. As shown in the Table, most publications are deeply focused on the façade's performance assessment on the material level. Then, this assessment gets less on the component level and becomes almost rare on the building level. According to EN 13830 there are 72 EN or ISO standards that prescribe the performance expectation of facades as components, products or materials. Those standards are focused on single calculation methods or compliance criteria. However, none of those standards addresses AF on the system or building level. With the complexity of high-performance buildings and high-performance facades, it becomes very difficult to assure the integrative performance of facades. Façade contractors and facade engineers take the burden of this responsibility most of the time away from the architect's scope of responsibility. On the operation side, occupants are the most vulnerable and directly affected by the façade's performance. Therefore, we confirm our previous finding on the lack of knowledge of AF systems" assessment. Another observation from the literature review is that there are no published studies that provide an in-depth description of the design and delivery process of buildings with AF. As a consequence of this lack of knowledge, it is difficult to propose an evidence-based assessment framework that addresses real problems encountered by multiple stakeholders in different phases in the AF lifecycle. The process mapping case studies presented in Section 4 were therefore carried out to fill this gap.
      // Our object-based façade characterization and classification presented in Table 1 does not reflect our idea about an assessment framework for AF that is suitable to encourage their market adoption in the construction industry. It only helped us to understand the cause of the knowledge gap and sort the different publications found in literature. We do not think that the characterization and classification of AF should be based on this scheme. We invite the readers after reviewing Section 4 (process mapping) and Section 5 (interview and FGD results) to explore our validated assessment framework.
      // 4. Process mapping
      // In this section, we present the results of a generic stakeholder's scheme and a façade delivery scheme to provide a snapshot on the project delivery, milestones and key stakeholders of AF system assessment. Finally, we discuss the process-related challenges of AF assessment.
      // 4.1. Stakeholders
      // The result of our stakeholders mapping and comparative analysis is presented in Fig. 2. We could group the stakeholders under three categories namely, client, design team and builder.

      // One of the key findings represented in Fig. 2 is that the façade engineers, who are responsible for the realization of the façade, work intensively with the façade contractor and façade suppliers under the builder team. On the other hand, architects work under the design team during early stages with lower involvement in the façade realization issues. We can conclude that in the three investigated case studies, the façade concept design was done by the architect in a schematic way and the façade contractor did the façade realization in a detailed way. Having two different façade stakeholders intervening at different design phases and looking at different performance criteria creates a discrepancy between the as-designed and as-built façade. In the case of AF, this problem gets more magnified due to the complexity of AF system performance.
      // 4.2. Façade delivery process
      // Next, we traced the design process in the three case studies and validated with the interviewed stakeholders a process map. The aims of this activity were to create a common process map for AF delivery process and to identify the key problems commonly encountered by façade professionals when designing, building and operating the AF. The result of our process mapping activity is presented in Fig. 3 and highlights the three major problems associated with AF delivery processes.

      // The first problem that affects the performance of AF is related to the project delivery method and contract type. Although exceptions exist in the form of so-called pre-construction services, in traditional (design-bid-build) delivery methods, the façade subcontractor is usually only assigned after the architect has developed the façade design. The architect delivers an architectural project and the façade specifications without any consultation with the façade contractor. In most cases, the design-bid-build process allows the façade contractor to join the project, under the supervision of the main contractor; only after the façade design has been developed. At the moment of receiving the architectural facades" design schemes and specifications, the subcontractor can start the real façade design, prototyping and testing. The façade subcontractor has to check, based on material availability, the different material datasheets to come up with feasible engineering solutions and prototypes. This work includes research and development activities and requires detailed and precise sizing and calculation of the façade components and elements. This dual approach of sub-subcontracting creates scope for several performance errors and problems and likely results in performance compromises. Based on our analysis illustrated in Fig. 3 we can confirm that the design-bid-build method does not empower façade design stakeholders, is time-consuming, with large potential for delays and reduces the overall performance quality of AF. Although post-occupancy evaluations are receiving increasing interest from design firms and engineering consultants [3], [51], the initial design approaches mainly rely on simulation-based activities. Façade contractors, on the other hand, tend to be more involved with practical considerations and rely more on experimental approaches. The problem of design-bid-build process delivery is that the late involvement of façade contractors undermines their role in the design process, leading to missed opportunities for improving the façade design because of difficulties to benefit from their hands-on knowledge and experiential implementation approaches.
      // The second problem related to AF performance and quality is the façade handover and commissioning. According to the three investigated case studies (Attia et al., 2016; [7], [12]), AF do not get commissioned by third-party entities. Under the pressure of time and as a consequence of the design-bid-build project delivery process described above, façade subcontractors commission the AF by themselves to themselves. We could not identify any project with an adaptive facade that went through a third-party commissioning process to inspect its facades" performance. Even when we interviewed the project owners about this matter, they underestimated the importance of third-party commissioning of the AF. Project managers representing the client are also not aware of the importance of façade commissioning. As a result, we identified this problem as a major barrier that affects the performance of AF as shown in Fig. 3. Prefabrication of AF and pre-assembled façade solutions with smart sensors and less wiring and cabling can be an approach to address this problem.
      // The third key problem is related to façade users and the façade operation. AF must go through a soft-landing process [80] and must have an operation manager. The role of the soft-landing process is to customize and adapt the AF technology to users" needs and expectations. Depending on the façade orientation, building story, HVAC system interaction and many other parameters, façade operators must take enough time to control and program the façade actions depending on the occupants" needs. Based on our analysis, we recommend a minimum of two years of soft-landing for all new AF. During this period, facility managers, users, façade contractors and architects test and customize the façade operation and control, and develop "lessons learned" for future projects. Building occupants and users should be approached using post-occupancy evaluation to assess the effectiveness of the AF regarding comfort, satisfaction and productivity. It is recommended to assign a full-time facility manager that can interact with the users and perform corrective measures for the façade operation. Despite this importance, it was found that in the three investigated case studies, soft-landing was not performed formally and was performed in some projects very shortly or was postponed.
      // 4.3. Process related challenges of AF assessment
      // Based on our analysis in Sections 4.1 and 4.2, we could identify two major challenges related to AF: the first important challenge is the problem of undermining façade users [12]. A similar observation was recently reported for high-performance buildings in North-America, some of which also included advanced façade features [22]. The flexible nature of AF should cater for occupant comfort and wellbeing [58]. Improving the use and operation of AF is one of the added values of high performance envelopes and advanced façade systems. Without the articulation of the relation between the AF technology and the occupants" wellbeing, in the form of performance criteria, it will be hard to increase the penetration and market uptake of AF. Additionally Post-Occupancy Evaluations for AF should be part of delivery and operation processes. We elaborated on this issue and provided some recommendations to address this challenge in another paper published [3].
      // The second major challenge is related to the AF value chain for production and delivery. As shown in Fig. 4 and as discussed earlier in Section 4.2, the experimental and evidence-based approach of façade contractors occurs late in the design process. Architects, façade engineers and façade contractors should come early together to discuss the façade design, mock-ups, prototypes and performance inspection tests. Our process of mapping the three case studies indicates the complexity of bringing together façade elements such as brackets, sealants, point fixing systems and inspecting their performance on-site. The assembly and onsite mounting of AF requires special attention and tedious collaboration to reduce risks, such as thermal bridges, followed by strict site testing for performance assurance and guarantee. Mock-up testing, hose tests, sprinkler tests, impact tests and acoustic tests are part of this production and delivery challenge. However, our case studies indicate that soft-landing should be an extension of the inspection and testing process. Also, pre-construction services for envelope testing and value engineering can play a major role to assure the facade's system performance.

      // Our interviews with façade experts indicate that most deformations or failures or damages of adaptive façade happen between late summer and early winter. This requires a continuous follow up of the façade operation and control in relation to occupants interaction to optimize the overall façade system operation and response. Additionally, the assembly of the façade elements require good planning for logistics, storage and transportation. For AF, the material availability and the façade components" life cycle and operation should be addressed involving the maximum possible number of façade stakeholders.
      // Therefore, architects, engineers and façade contractors should work hand-in-hand from day one, while exploring the whole façade production value chain including factory assembly and site installation. There is a serious challenge in optimising the assembly process, and optimize the system design taking into account the post-construction stage. This is the only way to make sure AF will perform as expected and will achieve the required occupants needs and control.
      // 5. Interviews and focus groups results
      // In this chapter, we will present the interview and focus group discussions results and describe the identified advantages and disadvantages of AF. The main objectives of the interview and FGD are to define the evaluation and assessment of adaptive facades, as perceived by AEC professionals and to investigate the relationship between adaptive facades and users (see Appendix A). This information was then used to validate the performance assessment framework for AF that is proposed in this paper.
      // The interviewed experts represented façade engineers, façade contractors and architects. Experts were selected to cover a wide range of different actors involved in the processes of façade construction, inspection, operation and maintenance. The final number (n = 20) of interviewees and background information can be found in the on-going report of Attia et al. [2]. Most interviewees associated AF with their dynamic nature and ability to react to outdoor or indoor conditions. Solar radiation and light transmittance control were mentioned by 16/20 experts as examples of useful AF" characteristics, followed by ventilation. However, no particular key performance indicator was cited when interviewees were asked how they assess the performance of an adaptive facade. Structural stability was found to be the most commonly discussed performance criterion during project commissioning and inspection.
      // 5.1. Advantages and disadvantages of adaptive facades
      // Fig. 5 presents an interesting finding, when interviewees were asked to rank cost, energy and occupant satisfaction in order of importance for AF. The results presented in Fig. 5 list environmental impact reduction, cost reduction and occupant satisfaction in the theoretically ideal order of importance. However, all interviewees had a different ranking about the order of importance of AF in reality. They mentioned that in real construction projects, the cost is considered to be the most important variable followed by energy and finally occupant satisfaction. In fact, they explained that the linear and segmented project delivery process does not allow respecting the order illustrated in Fig. 5. For most projects they participated in, there was no feedback loop regarding occupant satisfaction. Only 6 out of 20 interviewees had been involved in a soft-landing stage and performed POE for their designed and constructed AF. When interviewees were asked to list the measures that need to be taken to advance AF the frequency diagram in Fig. 5 indicated the "integration of multi-disciplinary approaches for smart facades operation" as the most important measure.
      //  Fig 5 

      //          * Download: Download high-res image (364KB)
      //          * Download: Download full-size image
      // Fig. 5
      // As shown in Table 3, we grouped the expert opinions and ideas in a table. The strengths of AF involved providing dynamic operation for optimal daylighting, solar control and natural ventilation and the optimization of heating and cooling loads. Also, interviewees identified the empowerment of users to control the indoor climate as a powerful benefit leading to higher occupant satisfaction and productivity. In parallel, there is an opportunity to increase AF in the market due to mass customization and the advancement of building controls. On the other hand, the high investment cost and the need for tailor-made solutions for AF were identified as weaknesses. The largest risk associated with AF was the operational and construction stage and the weak management of the maintenance and long-term performance and occupant control. The analysis succeeded to determine the priorities of AF design and operation while reflecting the challenges in relation to occupant satisfaction.
      // Table 3. Grouped expert opinions on AFs.
      // Empty Cell
      // 	Related journal papers
      // 	Advantages
      // 	Provide optimal daylighting, solar control and natural ventilation based on dynamic operation
      // 	Empty Cell
      // 	Increase the energy efficiency of the building by reducing heating energy in winter and cooling energy in summer
      // 	Empty Cell
      // 	Empower user to tightly control indoor climate with overriding manual control over the building management system, leading to higher occupant satisfaction and productivity
      // 	Empty Cell
      // 	Enhance the climatic comfort indoors and well-being to increase the occupant satisfaction and productivity
      // 	Disadvantages
      // 	Are not always user friendly and do not empower users through interaction with the façade system and personalized control
      // 	Empty Cell
      // 	Have high investment cost and may increase the operational cost
      // 	Empty Cell
      // 	Lack a generic and standardized assessment framework, criteria and delivery process
      // 	Empty Cell
      // 	End up being tailor made solutions that are time consuming requiring highly skilled expertise and intensive coordination and collaboration
      // 	Empty Cell
      // 	Complex high-tech systems that require intelligent and flexible automation and predictive control
      // 	Empty Cell
      // 	Require a steep learning curve to educate users and facility managers to optimally operate them
      // 	Potential
      // 	Architects can satisfy their client and provide high quality architecture and experience for clients and users
      // 	Empty Cell
      // 	Mass customization can increase their market penetration
      // 	Empty Cell
      // 	Can accelerate the technology advancement of smart buildings and controls in relation to load management
      // 	Empty Cell
      // 	Influence the users perception and increase their satisfaction
      // 	Empty Cell
      // 	Use of new composite materials and smart technology
      // 	Limitation
      // 	Can easily turn into fashionable and aesthetical gadgets without potential for scaling up. For example, they are used sometimes to show economic and politic power countries
      // 	Empty Cell
      // 	Commissioning and operational maintenance can be easily underestimated
      // 	Empty Cell
      // 	Increases the risk of energy use intensity increase in relation to BMS and jeopardizes the building guarantee
      // 	Empty Cell
      // 	Full automation can kill personal control if users are not taken into account
      // 	5.2. Interview results – future perspectives
      // The last part of the interviews investigated the future of AF. Interviewees described their expectations and future ideas that AF should integrate. Five major questions shaped the responses and are structured under the following paragraphs:
      // What needs to be done for a better adaptive facades" design process and performance quality?
      //          * •
      // Develop a framework of KPIs that are user-centric and that address occupants" well-being and productivity in relation to AF.
      //          * •
      // Create better measuring methods and services to monitor AF performance and visualize the data to close the feedback loop for building users and building operators.
      //          * •
      // Determine universal user satisfaction indicators and standards and associate them with AF environmental performance.
      //          * •
      // Increase the effectiveness of control systems and allow more flexibility for personal control through combining manual and automated control.
      //          * •
      // Develop better tools to predict AF performance while taking into account users and their behavioural variability and the dynamic nature of AF.
      //          * •
      // Provide feedback through data and performance reference points to maintain the façade at peak performance.
      // Should we mass customize/produce adaptive facades or will they remain tailor-made solutions? And why?
      //             * •
      // The only way to increase AF market penetration is to decrease their cost through mass customization and prefabrication.
      //             * •
      // The evolution of the supply chain of AF, which currently relies mostly on small and medium enterprises, will play a key role to answer this question.
      //             * •
      // Most probably, a mixed approach that depends on the clients" budget, needs and architect's vision will determine the level of mass customization.
      //             * •
      // Depending on the advancement of 3D printing and additive manufacturing for façade modules and elements, tailor-made façade solutions can become mainstream.
      //             * •
      // The technology of customized façade manufacturing using computer technology is constantly progressing in a way that the customized production itself becomes mass production. We believe that 3D printed façade components or elements in-situ will transform the façade industry.
      // What features would you expect to find in future adaptive facades?
      //                * •
      // User-driven façade technologies using smartphones or individualized pre-set occupant operation preferences.
      //                * •
      // Real-time personalized and individualized control.
      //                * •
      // Intelligent feedback mechanisms to visualize outdoor and indoor conditions in real-time.
      //                * •
      // Coupling artificial intelligence to facade operation allowing AF to learn and predict.
      // Do you agree that soft landings and post-occupancy evaluation of AF should become obligatory?
      //                   * •
      // This can be an added value; however, there is a disagreement to make it mandatory.
      //                   * •
      // Raising the awareness among the AEC industry about AF design, best-practices and user-centred design would be more effective.
      //                   * •
      // By quantifying the tangible benefits of AF there will be an intrinsic motivation to perform soft landings and post-occupancy evaluation.
      //                   * •
      // Education and awareness raising of occupants and building operators should be part of the facility management.
      // Who should be responsible for maintaining the adaptive façade performance after construction?
      //                      * •
      // Performance contracts can be used to maintain the performance of AF as part of the whole building level performance.
      //                      * •
      // By developing holistic guarantees for AF" maintenance, operation and continuous commissioning, it will become a common practice resulting in a robust facade performance.
      // 5.3. Focus group discussions
      // Beside the validation of the AF assessment framework the two FGD can be highlighted under the following statements:
      //                         * •
      // The façade industry professionals don't know the market size. Automated shading solutions are the most common AF technology that is available in the market. However, the AF market remains a niche market with high potential.
      //                         * •
      // There is a lack of common standards and platforms to assess the performance of AF in a comparative way with traditional facades.
      //                         * •
      // There is a lack of perception and cognitive abilities on AF technology types.
      //                         * •
      // Software tools and smart artificial intelligence codes, including predictive model control algorithms, are missing. There is a serious need to share control codes and algorithms to facilitate the operation of AF.
      //                         * •
      // AF are about integration and cooperation between technologies to bring benefit to people first and then to the planet and finally to clients. Without a carbon or environmental impact taxation on energy use in buildings the added value or AF remains insignificant.
      // Finally, participants in the FGD agreed that AF technology is not ready enough to cross those barriers today, however, AF remain a promising technology that can get better.
      // 6. Future of adaptive facades assessment framework
      // As a result of our literature review, process mapping and analysis of 3 case studies we developed an assessment framework for AF. Several iterations took place to validate the framework. The validation process relied mainly on the interviews and FGD. Together with the help of the COST Action TU1403 members a consensus was reached. In this section, we present the final version of the framework that is inspired by the study findings.
      // 6.1. Adaptive facades assessment framework
      // The literature review, process mapping and interview results allowed us to develop and test an initial assessment framework of AF. Fig. 6 presents a graph that classifies the AF performance parameters under five categories. These categories are illustrated in detail in Fig. 7 and described in the following paragraphs.

      // Fig. 7
      // 6.1.1. Energy and environmental performance
      // As part of the building, AF are associated with multiple environmental variables. In this category, we classified energy and carbon emissions related aspects that get influenced by, or interact with, the façade design. This includes operational or embodied energy and carbon for AF. AF systems directly influence the building indoor environment and have an impact on the cooling and heating loads. The underlying building physics of AF systems in relation to building energy performance and envelope life cycle assessment is one of the KPIs for AF. The logic behind this category is to group the variables that quantify the façade's environmental impact and performance.
      // 6.1.2. Protective performance
      // The following set of KPIs is the protective performance of AF. Inspired by the definition of Herzog et al. [34] we grouped all performance aspects related to structural stability and safety, together with construction related criteria under this category. The underlying building physics and material science of AF systems takes into account fire resistance and structural performance next to acoustic and visual performance. This includes water and air permeability and the radiation properties for natural lighting and solar control. The logic behind this category is to group the variables that justify the façade's function and stability from a user point of view.
      // 6.1.3. Building control and services
      // The interaction between HVAC systems and the AF that takes place to assure comfort is the third category. Under this group we address the four types of comfort, in direct relation with building management systems and façade controls. The management and interaction through automated and smart technologies is based on a set of variables that fits under this category [27]. Building services including mechanical ventilation and active systems and their direct control to achieve indoor comfort are grouped under this category. The logic behind this category is to group the variables that relate to active control of the building services in relation to the façade and indoor comfort requirements.
      // 6.1.4. User control and experience
      // The fourth KPI category, groups variables related to occupant control and engagement. The subjective perception on the indoor environment of users in relation to their ability to act and engage with the façade to regulate their living or working environment is grouped under this category. The logic behind this category is to group the variables that quantify occupant control and engagement with the façade within the indoor environment.
      // 6.1.5. Maintenance, durability and life cycle
      // The fifth group of KPIs collects the variables related to time. Aspects related to the life of the façade during operation are grouped in this category including maintenance, replacement, cleaning and durability. This category also includes cost-related parameters and end of life cycle or guarantee issues. The logic behind this category is to group the variables that maintain the façade performance, components and elements.
      // 7. Discussion
      // 7.1. Summary of main findings
      // For this study, we developed an assessment framework for AF systems that can be used by architects, façade engineers, façade contractors, façade suppliers, facilities managers and future occupants. By mapping performance standards and indicators of AF, the assessment framework intends to identify and group key performance characteristics of AF. The framework is meant to define the intrinsic performance driven functions of AF in a structured way. In this sense, we did not develop new indicators; however, we developed a group of indicator sets that can provide a logical framework to assess the dynamic nature of AF. This involves occupant satisfaction and behaviour, comfort, energy consumption or systems controls as well as cost.
      // This framework was based on the identification of different façade delivery processes and milestones, and highlighted the importance of prototyping and façade testing and inspection. One of the deep-rooted problems of AF is that they tend to be designed on the product or component level with less attention to the building level. This fragmented composition of façade elements and materials, in particularly for movable facades, increases the risk of performance failures that no one would report or document. The integration of advanced material technologies into façade products or components is the first challenge in façade design and construction. The façade business or industry does not encourage reliability and quality of facades, on the system level. Currently, AF are commissioned for protective performance (structure, water and air permeability etc. see Fig. 6) but not on the environmental or user level. We proved that there is a need to address AF from a system level and not from a product or component level. In general, there is an underestimation of the important role of façade testing, inspection and operation, as an integral part of the building in relation to comfort and energy savings.
      // We could also identify a problem with the façade project delivery process. Currently, this process is linear in most investigated cases and does not encourage synergies between the design and construction team. Architects and clients, in the investigated case studies, were concerned with aesthetical aspects using basic simulation tools during early design stages. Little is known about the accuracy of simulation results for AF systems because long-term performance monitoring in the post-construction phase is rarely conducted [56]. The influence of AF on the energy performance gap is an unknown field. The importance of AF on long-term monitoring tends to be underestimated, and undermines the influence of weather, occupant behaviour and technical control uncertainty. More importantly, the part of the performance improvement that can directly be attributed to AF remains unknown. We need to select KPIs for AF and set up a priority using a multi-attribute approach for their assessment and performance evaluation.
      // Based on the three investigated case studies, we can confirm that there is a serious need for user-centred AF design and evaluation. Across Europe there is a need for:
      //                            * 1.
      // The production of unique experimental datasets to establish reference benchmarks for innovative facades technologies and performance monitoring techniques to allow comparison with traditional facades.
      //                            * 2.
      // Providing access to experimental data to answer critical modelling questions of advanced facades [52].
      //                            * 3.
      // The development of a European database on advanced facades monitoring and performance modelling and assessment.
      //                            * 4.
      // Ensuring that the produced datasets will be available after the end of the project in relation to European (European standards complying) products.
      //                            * 5.
      // Performing full environmental impact assessment of AF and address the operational energy associated with advanced control and data storage and management.
      //                            * 6.
      // Investigating the circularity of materials used for AF and the end-of-life considerations.
      // The role of AF is to make it possible for users to control their personal environment, privacy and/or view to outside, to fulfil comfort needs. It is vital for AF post-occupancy evaluations to investigate the users" interaction opportunities or individual control with HVAC systems and BMS. Even with soft-landing and education of building users, the lack of understanding about how to operate or interact with an AF remains a barrier towards reaching occupants satisfaction [23]. Within any automated AF system, it is very important to allow users to control their indoor environment [38], [67]. AF should not be seen only as advanced technologies. If the culture, social acceptance and state of mind of users are not ready to adopt and embrace the new innovation and solution technology, AF will become meaningless. Therefore, training and continuous coaching of building users is a key to maintain and expand the presence of AF in buildings. Training and continuous coaching is recommended for the occupant to make sure they will be able to engage with the façade system. Investment in soft-landing and educational briefing regarding the operation and interaction with the operation system are essential. However, if occupants are not empowered and do not have personal control opportunities to interact with AF, they will easily get frustrated and dissatisfied.
      // 7.2. Strengths and limitations of the study
      // We are not aware of any conducted study that aimed to set up a framework to assess the performance of AF and identifies the opportunities and challenges to increase their market uptake. Despite the difficulty to develop a holistic assessment framework for AF, the research benefited from the contribution of façade stakeholders who fostered a consensus for a novel AF assessment framework. Accordingly, this research aimed to provide a perspective for façade professionals based on the analysis of the existing literature and body of knowledge in order to identify the current trends and future challenges in AF system assessment. The methodology used in the study was based on literature review, process mapping for three case studies, semi-structured interviews and focus group discussions. The present study's approach remains novel in that such an approach has never been used to qualitatively evaluate the technology maturation and barriers of market adoption of AF in relation to users" well-being.
      // We proposed and validated an AF" assessment framework within the scope of COST Action TU1403 Working Group 3 activities. This framework identified KPIs that should be selected to assess AF performance during the construction and operation phase while empowering users. The developed framework and key criteria identified in the study will improve the understanding of practitioners, and allow for comparison, discussion and learning. In other words, it will allow benchmarking of AF performance, so that researchers can measure social, economic and environmental sustainability of these advanced façade technologies.
      // Verbatim transcriptions from the 20 interviewees" population sample were analysed and interpreted providing relevant perspectives on AF that were previously not documented in scientific literature. We critically investigated stakeholders" practices, values and perceptions for the assessment of AF. The interviewed experts could not form a statistically representative sample; however, our interviewing process that started in 2015 has reached data saturation in 2018. Additionally, the two focus group seminars confirmed our findings and we noted repetition in the data. Experts and façade users confirm the current performance of AF is always less favourable in practical use than expected. Also, our findings are in line with other recent publications [66]. The experts provided insights and in-depth responses that were elaborated on by the authors in terms of trends and future challenges in AF system assessment. The study approach remains novel in that such a study has never been used to qualitatively set up an assessment framework of AF via stakeholder experiences and perceptions.
      // The stakeholders, who participated in this study, indicated the importance of identifying how well AF compares to their state-of-the-art non-adaptive counterparts. Currently, the industry does not evaluate the environmental performance (energy and carbon emission) and occupant well-being (comfort and interaction) close to AF properly and users have other priorities that do not allow them to engage and use the technology. Without quantifying the advantages of AF, their market uptake will remain low. The interview findings have been helpful together with the process mapping and the discussions with façade contractors to set a portrait on the state of AF in the AEC industry. Thereby, we are facilitating through this work the assessment of AF in relation to their performance. We assume this will have an impact on the façade practitioners" community and can lead to the development of future standards and assessment schemes.
      // It is acknowledged that capital expenses and life-cycle costs play a major role in decision-making processes regarding refurbishment and construction of new facades. These economic considerations also have a direct influence on technical performance characteristics of AF, and are therefore important to consider in the context of the present study. We nevertheless decided to discuss these aspects only briefly, because the identified research gap outlined the need for addressing various barriers concerning performance assessment of technological aspects first. We expect that the economic performance will follow suit once the technical performance metrics and evaluation procedures of AF get consolidated, and suggest that future studies focus on ways of reconciling high technical facade performance with options for profitable business operations for both the client and the façade industry.
      // 7.3. Implications for practice and future research
      // AF are not cosmetic skins or plain gadgets. AF must function in relation to occupant well-being. In this study, we identified and classified KPIs to assess AF. AF should be designed, constructed and operated as integrated systems. Quality assurance and holistic assessment can only be guaranteed by long-term monitoring and by coupling performance to their operations [4]. We are expecting that the assessment of AF and performance evaluation will increase its market penetration. However, this needs to be coupled to mass customization and personalized occupant control. Smart and predictive maintenance can assure AF robust performance and their liability.
      // At present, the assessment of AF systems is a research issue. Based on this study, an initial assessment framework is presented. Similar to the EN 13830 standard on curtain walls there is a need to develop a new standard for AF evaluation that empowers users. Architects and façade engineers will need to agree on issues concerning intrinsic and specific risks related to façade design, contracting and operation. In the literature and in professional practice there is still a gap on how to assess and evaluate AF. Our framework suggests a multi-criteria assessment scheme that groups most parameters under five KPI categories. We find it important that future research builds on our findings and develops more consistent and acceptable assessment models and frameworks that empower users [58]. Also we need a better understanding on how to design AF so that an appropriate use is rather intuitive and therefore increases user satisfaction and also decreases the performance cap. Finally, the present study is the first European milestone in widening the research about AF assessment.
      // 8. Conclusions
      // Within the building, façades are one of the most important parts of the construction through which energy-saving potentials and low environmental impact can be achieved. They are of principal importance not only for the architectural appearance of a building, but also in shaping the quality of the indoor spaces, being the interface between inside and outside of the buildings where we live. The façade engineering community is well grouped and organized around the themes of structural engineering, chemical engineering, material science and building physics. However, the construction sector needs to adapt rapidly to digest the advanced technologies of adaptive façades (AF) and operate in an optimal way that can reduce building's environmental impact and empower users. To be able to communicate the potential advantages of AF the authors developed a performance assessment framework for adaptive facades which provide holistic performance criteria and account for the delivery process of AF. The applicability of the assessment framework has been validated in interviews and two focus groups. With the framework the authors open up the scope of AF assessment and link it to building scale and environmental performance and occupancy centred fields. It is expected that the framework supports practitioners to resolve observed problems with regards to the high-performance façades delivery process, which are:
      //                               * 1.
      // the project delivery method,
      //                               * 2.
      // the façade delivery contracts, and
      //                               * 3.
      // third-party commissioning and soft-landing (full time facility management). However, the façade subcontractor has the most important role in the façade value chain when evaluating and AF.
      // Furthermore, the framework of AF performance assessment identifies and classifies the large variety of performance indicators for adaptive facades thereby starting a process towards the development of a new European Standard for advanced facades. The framework is not only useful for future research development but also needed for immediate practical purposes. Façade engineering is expected to become more tightly bound to IT technologies and advanced fabrication innovations. The industrial integration capabilities and strength in Europe, North America and Asia will depend on addressing the current trends and future challenges in the assessment of adaptive façade systems. Using the proposed assessment framework evaluation data should be collected and better quantified to better benchmark of the real performance of AF.
      // Acknowledgements
      // The authors express their thanks to Philippe Samyn, Kurt Booms, Claude Pimpurniaux, Abdulmajid Karanouh, Thaleia Konstantinou, Nikolaus Nestle, Andreas Luible, Henk de Bleecker, Lone Feifer, Davide Ciavatti, Agnes Koltay and all anonymous interviewees who did not wish to reveal their identity. The authors appreciate their valuable comments and feedback. We would like extend our thanks to the organisers and facilitators of the two industrial workshops in Delft and Lisbon that allowed the focus group discussions.
      // This research was partially funded by the European Cooperation in Science and Technology Action TU 1403. The authors would like to gratefully acknowledge COST Action TU1403 "Adaptive Facades Network" for providing excellent research networking. The authors would like to acknowledge the support of Working Group 3 members.`;


      //       const principles = `1. Energy and environmental performance As part of the building, AF are associated with multiple environ mental variables. In this category, we classifified energy and carbon emissions related aspects that get inflfluenced by, or interact with, the façade design. This includes operational or embodied energy and carbon for AF. AF systems directly inflfluence the building in door environment and have an impact on the cooling and heating loads. The underlying building physics of AF systems in relation to building energy performance and envelope life cycle assessment is one of the KPIs for AF. The logic behind this category is to group the variables that quantify the façade"s environmental impact and performance. 
      // 2. Protective performance The following set of KPIs is the protective performance of AF. Inspired by the defifinition of Herzog et al. [34] we grouped all per formance aspects related to structural stability and safety, together with construction related criteria under this category. The underlying building physics and material science of AF systems takes into account fifire resistance and structural performance next to acoustic and visual performance. This includes water and air permeability and the radiation properties for natural lighting and solar control.The logic behind this category is to group the variables that justify the façade"s function and stability from a user point of view. 
      // 3. Building control and services The interaction between HVAC systems and the AF that takes place to assure comfort is the third category. Under this group we address the four types of comfort, in direct relation with building management systems and façade controls. The management and interaction through automated and smart technologies is based on a set of variables that fifits under this category. Building services including mechanical ventilation and active systems and their direct control to achieve indoor comfort are grouped under this category. The logic behind this category is to group the variables that relate to active control of the building services in relation to the façade and indoor comfort requirements. 
      // 4. User control and experience The fourth KPI category, groups variables related to occupant control and engagement. The subjective perception on the indoor environment of users in relation to their ability to act and engage with the façade to regulate their living or working environment is grouped under this category. The logic behind this category is to group the variables that quantify occupant control and engagement with the façade within the indoor environment. 
      // 5. Maintenance, durability and life cycle The fififth group of KPIs collects the variables related to time. As pects related to the life of the façade during operation are grouped in this category including maintenance, replacement, cleaning and durability. This category also includes cost-related parameters and end of life cycle or guarantee issues. The logic behind this category is to group the variables that maintain the façade performance, components and elements.`;
      const principles = `1. Energy and Environmental Performance:
Energy Efficiency: Adaptive facades are expected to improve the building's energy efficiency by reducing heating and cooling loads. They achieve this through advanced materials and technologies such as phase change materials (PCMs) and electrochromic glazing. Environmental Impact: This includes operational or embodied energy and carbon emissions related to the façade design. The façade should contribute to low environmental impact by utilizing sustainable materials and technologies.

2. Occupant Comfort:
Thermal Comfort: Facades should adapt to changing weather conditions to maintain a stable and comfortable indoor temperature. Visual Comfort: Proper daylighting without glare is essential, providing adequate natural light to the interiors. Acoustic Comfort: The design should include sound-insulating materials to reduce external noise, enhancing the acoustic comfort for occupants .

3. Dynamic Response:
Adaptation to Environmental Conditions: The façade should dynamically respond to external weather changes, such as solar radiation and temperature variations. This can include features like movable shading devices and responsive glazing. User Interaction: Occupants should have the ability to control certain aspects of the façade, allowing for personalized comfort adjustments.

4. Structural Stability:
Safety and Durability: The design must ensure structural integrity, including resistance to wind loads, thermal expansion, and other stresses. This category also covers fire resistance and other safety-related performance aspects.

5. Maintenance and Lifecycle:
Ease of Maintenance: Facades should be designed for easy cleaning and maintenance to ensure long-term durability. Lifecycle Assessment: This includes evaluating the materials' lifecycle, ensuring sustainability and cost-effectiveness over the building"s lifespan. Maintenance, replacement, and durability aspects are critical in this assessment.`;

      try {
        const response = await this.sendToChatGPT(combinedContent, principles);
        let botResponse = response.data.choices[0].message.content;
        botResponse = botResponse.replace(/(\d+)\.|Comprehensive view|Comprehensive assessment|In summary|Summary|Overall|Recommendations for improvement/g, '<br><br>$&');
        this.chatResponse = botResponse;
      } catch (error) {
        console.error("Error during evaluation:", error);
        this.chatResponse = 'Error retrieving response';
      }
    },

    // Method to interact with OpenAI API
    async sendToChatGPT(imageContent, principles) {
      const url = "https://api.openai.com/v1/chat/completions"; // Actual API URL
      const headers = {
        Authorization: `Bearer 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`, // Replace 'your_api_key' with actual API key
      };
      const payload = {
        //model: "gpt-3.5-turbo",gpt-4o-mini
        model: "gpt-4o-mini",
        messages: [
          // {
          //   "role": "system",
          //   "content": "请根据以下原则进行评估：" + principles
          // },
          // {
          //   "role": "user",
          //   "content": "这是从图像中提取的描述：" + imageContent + "。请根据上述原则对这段描述进行评估。"
          // },
          // {
          //   "role": "system",
          //   "content": "根据您提供的描述和我们的评估原则，以下是评估结果： " + "。请对评估结果的每个方面打分A代表最好，B代表不错，C代表一般，D代表差。"
          // },
          // {
          //   "role": "system",
          //   "content": "根据上述评估结果，请你根据评估结果提供关于建筑材料、建筑外立面形状及建筑窗墙比的一些改进建议： " + "（此处将根据评估结果动态生成具体建议内容）"
          // }
          {
            "role": "system",
            "content": "Please conduct an assessment based on the following principles:" + principles
          }, 
          {
            "role": "user", "content": "This is the description extracted from the image:" + imageContent , 
            "content": "This is the description extracted from the image:" + imageContent + ". Please evaluate this description against the above principles."
          },

          {
            "role": "system", 
            "content": "Based on the description you provided and our evaluation principles, here are the results of the evaluation: " + ". Please rate each aspect of the assessment results A for best, B for good, C for fair, and D for poor."
          },
          {
            "role": "system", 
            "content": "Based on the above assessment results, please provide some suggestions for improving the building materials, the shape of the building façade and the window-to-wall ratio of the building based on the assessment results: " + "(specific suggestion content will be dynamically generated here based on the assessment results)"
          }
        ],

        temperature: 0.7
      };

      return await axios.post(url, payload, { headers });
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



.remove-icon {
  cursor: pointer;
  color: #ff4949;
  /* 设置图标颜色为红色，表示删除 */
}

.file-display-card {
  width: 562px;
  height: 137px;
  padding: 10px;
  border-radius: 20px;
  background-color: #FAFAFA;
}

.button1 {
  margin-top: 20px;
  margin-left: 18px;
  padding: 0px;
  width: 300px;
  height: 39px;
  /* background-color: #d9d9d9; */
  font-size: 18px;
  font-weight: 500;
}
</style>
