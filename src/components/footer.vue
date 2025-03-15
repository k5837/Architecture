<template>
    <el-row>
      <el-col :span="8">
        <div>
            <el-button class="grid-content bg-purple" type="info" plain @click="generate">AI-Generate</el-button>
        </div>
    </el-col>
    <el-col :span="8">
        <div>
            <el-button class="grid-content bg-purple-light" type="info" plain @click="evaluation">Evaluation</el-button>
       </div>
    </el-col>
      <el-col :span="8">
        <div>
            <el-button class="grid-content bg-purple" type="info" plain @click="library">Library</el-button>
        </div></el-col>
    </el-row>
    </template>
    
    <script>
        export default {
        data () {
            return {}
        },
        methods:{
        generate() {
            //1、不打开新页面
            this.$router.push('/generate')
            
            // //2、打开新页面
            // const generate = this.$router.resolve('/generate')
            // window.open(generate.href,'_blank')
        },
        evaluation() {
            //1、不打开新页面
            this.$router.push('/evaluation')
            
            // //2、打开新页面
            // const generate = this.$router.resolve('/evaluation')
            // window.open(evaluation.href,'_blank')
        },
        library() {
            //1、不打开新页面
            this.$router.push('/library')
            
            // //2、打开新页面
            // const generate = this.$router.resolve('/library')
            // window.open(library.href,'_blank')
        },
    }
    
     
    }
    </script>
    
    
    <style>
      .el-col {
        border-radius: 4px;
      }
    .bg-purple {
        background: #d3dce6;
        width:100%;
      }
      .bg-purple-light {
        background: #e5e9f2;
        width:100%;
      }
      .grid-content {
        border-radius: 4px;
        min-height: 40px;
        width:100%;
      }
    </style>