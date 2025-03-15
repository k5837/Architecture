<template>
    <div>
        <el-row style="width: 1800px;height: 1080px;">
            <el-col style="width:500px;height: 1080px;background-color: #EDEDED; ">
                <el-row style="width:500px;height:94px">
                    <p style="font-family: 'Cabin'; font-size: 24px; margin:49px 0px 0px 24px">Ask GPT for Research</p>
                    <el-divider style="margin-top:0px"></el-divider>
                </el-row>
                <!-- <el-row style="width:500px;height:986px">
                    <div class="chat-container">
                        <div class="chat-messages">
                            <p class="gpt1">Hi! This is GPT. What can I help you?</p>
                            <div v-for="message in messages" :key="message.id" class="message"
                                :class="{ 'user-message': message.isUser, 'bot-message': !message.isUser }">
                                <div class="message-content">
                                    <div class="message-text" v-html="message.text"></div>
                                </div>
                                <img v-if="message.isUser" src="../../assets/user1.jpg" alt="User"
                                    class="avatar user-icon" />
                            </div>
                            <div v-if="isLoading" class="loading-spinner">
                                <el-spinner size="small" />
                            </div>
                        </div>



                        <div class="input_container">
                            <el-input type="textarea" class="a" :rows="4" style="min-height:90px" v-model="generalInput"
                                :placeholder="currentPlaceholder" clearable>
                            </el-input>
                        </div>

                        <div>
                            <el-button
                                style="margin-left: 30px;border-radius: 5px;background-color: #d9d9d9; width: 200px;"
                                size="small" icon="el-icon-s-promotion" @click="handleSendMessage">搜索信息</el-button>
                            <el-button
                                style="margin-left: 30px; border-radius: 5px;background-color: #d9d9d9; width: 200px;background-color: #779D38;"
                                size="small" @click="prepareAndGenerateImages">生成图片</el-button>
                        </div>

                    </div>
                </el-row> -->
                <el-row style="width:500px;height:986px">
                    <div class="chat-container">
                        <div class="chat-messages">
                            <p class="gpt1">Hi! This is GPT. What can I help you?</p>
                            <div v-for="message in messages" :key="message.id" class="message"
                                :class="{ 'user-message': message.isUser, 'bot-message': !message.isUser }">
                                <div class="message-content">
                                    <div class="message-text" v-html="message.text"></div>
                                </div>
                                <img v-if="message.isUser" src="../../assets/user1.jpg" alt="User"
                                    class="avatar user-icon" />
                            </div>
                            <div v-if="isLoading" class="loading-spinner">
                                <el-spinner size="small" />
                            </div>
                        </div>

                        <div class="input_container">
                            <el-input type="textarea" class="a" :rows="4" style="min-height:180px" v-model="generalInput"
                                :placeholder="currentPlaceholder" clearable>
                            </el-input>
                        </div>

                        <div>
                            <el-button
                                style="margin-left: 30px;border-radius: 5px;background-color: #d9d9d9; width: 200px; height:43px;font-size:18px ;"
                                size="small" icon="el-icon-s-promotion" @click="handleSendMessage">文生文
                            </el-button>
                            <el-button
                                style="margin-left: 30px; border-radius: 5px;background-color: #d9d9d9; width: 200px;height:43px;font-size:18px"
                                size="small" icon="el-icon-upload2" @click="prepareAndGenerateImages">文生图
                            </el-button>
                        </div>
                    </div>
                </el-row>

            </el-col>

            <el-col style="width:15px;height: 1080px">
                <el-button
                    style="display: flex; align-items: center; justify-content: center; margin-top: 500px;padding: 0px; height:100px; width:15px; background-color:#D9D9D9; border: 1px solid #D9D9D9; border-radius:0px;size: 24px;"
                    :icon="isSecondColVisible ? 'el-icon-caret-right' : 'el-icon-caret-left'" @click="toggleSecondCol">
                </el-button>
            </el-col>
            <el-col v-show="isSecondColVisible"
                style="width:480px;height: 1080px;background-color: #FFFFFF;border-left: 1px solid #cccccc;border-right: 1px solid #cccccc;">
                <el-row style="width:500px;height:94px">
                    <p style="font-family: 'Cabin'; font-size: 24px; margin:49px 0px 0px 24px">Describe Your
                        Requirements
                    </p>
                    <el-divider style="margin-top:0px"></el-divider>
                </el-row>
                <el-row style="width:480px;height:986px">

                    <div class="card">
                        <div>
                            <el-card
                                style="width:443px; height: 800px; overflow-y: auto; border-radius:15px; background-color: #F8F8F8;"
                                class="cardh">
                                <!-- 第一块区域，高度80px -->
                                <div
                                    style="height: 57px; width:443px; background-color:#F8F8F8;display:flex; align-items: center;">
                                    <p
                                        style="font-family: 'Cabin'; font-size: 20px; margin-top:27px;margin-left: 13px;font-style: italic;color: #999999;">
                                        可持续发展
                                    </p>
                                    <!-- 图标区域 -->
                                    <div style="width: 30px; cursor: pointer;color:#999999;font-size: 20px;margin-left:270px;"
                                        @click="toggleIcon1">
                                        {{ icon1 === '+' ? '+' : '-' }}
                                    </div>
                                    <br>
                                </div>
                                <div class="divider1">
                                    <el-divider style="margin:0px"></el-divider>
                                </div>

                                <!-- 第二块区域，高度150px -->
                                <div v-show="icon1 === '-'" style="height: 420px; background-color: #F8F8F8;">
                                    <el-row>
                                        <div style=" display: flex;width:443px;height:58px">
                                            <el-checkbox v-model="slider1Enabled"
                                                style="margin-top:24px;margin-left:10px"></el-checkbox>
                                            <span
                                                style="width:41px;font-size: 16px;font-family: 'Cabin';margin-top:24px;margin-left: 18px;font-weight:500">
                                                WWR</span>
                                            <el-slider v-model="value1" :marks="marks" :disabled="!slider1Enabled"
                                                style="width: 300px;height:8px;margin-left: 30px;margin-top: 16px;">
                                            </el-slider>
                                        </div>
                                    </el-row>
                                    <el-row>
                                        <div class="drop" style="display: fixed;width:443px;height:119px">
                                            <div style="height: 39.67px;">
                                                <span
                                                    style="width:85px;font-size: 12px;font-family: 'Cabin';margin-top:25px;margin-left: 99px;">
                                                    Building Type</span>
                                                <el-select v-model="selectedOption" placeholder="" clearable
                                                    @change="handleChange1"
                                                    style="margin-top: 22px;margin-right: 104px;">
                                                    <el-option v-for="option in options" :key="option.value"
                                                        :label="option.label" :value="option.value"></el-option>
                                                </el-select>
                                            </div>
                                            <div>
                                                <span
                                                    style="width:85px;font-size: 12px;font-family: 'Cabin';margin-top:25px;margin-left: 99px;">
                                                    Region</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <el-select v-model="selectedOption" placeholder="" clearable
                                                    @change="handleChange2"
                                                    style="margin-top: 22px;margin-right: 104px;">
                                                    <el-option v-for="option in options" :key="option.value"
                                                        :label="option.label" :value="option.value"></el-option>
                                                </el-select>
                                            </div>
                                            <div>
                                                <span
                                                    style="width:85px;font-size: 12px;font-family: 'Cabin';margin-top:25px;margin-left: 99px;">
                                                    Orientation</span>&nbsp;&nbsp;
                                                <el-select v-model="selectedOption" placeholder="" clearable
                                                    @change="handleChange3"
                                                    style="margin-top: 22px;margin-right: 104px;">
                                                    <el-option v-for="option in options" :key="option.value"
                                                        :label="option.label" :value="option.value"></el-option>
                                                </el-select>
                                            </div>
                                        </div>
                                    </el-row>
                                    <el-row>
                                        <div style=" display: flex;width:443px;height:58px">
                                            <el-checkbox v-model="slider2Enabled"
                                                style="margin-top:24px;margin-left:10px"></el-checkbox>
                                            <span
                                                style="width:41px;font-size: 13px;font-family: 'Cabin';margin-top:24px;margin-left: 18px;font-weight:500">
                                                建材碳排放量</span>
                                            <el-slider v-model="value2" :min="1" :max="1000" :marks="marks2"
                                                :disabled="!slider2Enabled"
                                                style="width: 300px;height:8px;margin-left: 30px;margin-top: 23px;">
                                            </el-slider>
                                        </div>
                                    </el-row>
                                    <el-row>
                                        <div style=" display: flex;width:443px;height:80px">
                                            <el-checkbox v-model="slider3Enabled"
                                                style="margin-top:24px;margin-left:10px"></el-checkbox>
                                            <span
                                                style="word-wrap: break-word;width:56px;font-size: 13px;font-family: 'Cabin';margin-top:20px;margin-left: 18px;font-weight:500">
                                                光反射率</span>
                                            <el-slider v-model="value3" :min="0" :max="100" :marks="marks3"
                                                :disabled="!slider3Enabled"
                                                style="width: 300px;height:8px;margin-left: 15px;margin-top: 10px;">
                                            </el-slider>
                                        </div>
                                    </el-row>
                                    <el-row>
                                        <div style="display: flex;width: 443px;height:112px">
                                            <el-checkbox v-model="button44"
                                                style="margin-top:14px;margin-left:10px"></el-checkbox>
                                            <span
                                                style="word-wrap: break-word;width:40px;font-size: 14px;font-family: 'Cabin';margin-top:10px;margin-left: 18px;font-weight:500">
                                                遮阳类型</span>
                                            <div style="margin-top: 15px;margin-left: 10px;">
                                                <el-row>
                                                    <div style="display: inline-block;vertical-align: middle;">
                                                        <img src="../../assets/1.png" alt="1" width="30" height="30"
                                                            style="vertical-align: middle;" />
                                                        <el-button round
                                                            :style="{ backgroundColor: shadeType === '横向' ? '#ededed' : '' }"
                                                            style="width:97px;height:29px;padding-top: 6px; border-radius: 15px; "
                                                            @click="setShadeType('横向')"
                                                            :disabled="!button44">水平式</el-button>
                                                        <img src="../../assets/2.png" alt="1" width="30" height="30"
                                                            style="vertical-align: middle; margin-left: 20px;" />
                                                        <el-button round
                                                            :style="{ backgroundColor: shadeType === '垂直' ? '#ededed' : '' }"
                                                            style="width:97px;height:29px;padding-top: 6px; border-radius: 15px;"
                                                            @click="setShadeType('垂直')"
                                                            :disabled="!button44">垂直式</el-button>
                                                    </div>

                                                </el-row>

                                                <el-row>
                                                    <div>
                                                        <img src="../../assets/3.png" alt="1" width="30" height="30"
                                                            style="vertical-align: middle;" />
                                                        <el-button round
                                                            :style="{ backgroundColor: shadeType === '综合' ? '#ededed' : '' }"
                                                            style="width:97px;height:29px;padding-top: 6px; border-radius: 15px; margin-top: 5px;margin-left:0px"
                                                            @click="setShadeType('综合')"
                                                            :disabled="!button44">综合式</el-button>
                                                        <img src="../../assets/4.png" alt="1" width="30" height="30"
                                                            style="vertical-align: middle; margin-left: 20px;" />
                                                        <el-button round
                                                            :style="{ backgroundColor: shadeType === '挡板' ? '#ededed' : '' }"
                                                            style="width:97px;height:29px;padding-top: 6px; border-radius: 15px;margin-top: 5px;"
                                                            @click="setShadeType('挡板')"
                                                            :disabled="!button44">挡板式</el-button>
                                                    </div>
                                                </el-row>
                                                <br>
                                            </div>

                                        </div>

                                    </el-row>
                                </div>

                                <!-- 第三块区域，高度80px -->
                                <div
                                    style="height: 57px; width:443px; background-color: #F8F8F8; display: flex; align-items: center;">
                                    <p
                                        style="font-family: 'Cabin'; font-size: 20px; margin-top:27px;margin-left: 13px;font-style: italic;color: #999999;">
                                        图片风格
                                    </p>
                                    <!-- 图标区域 -->
                                    <div style="width: 30px; cursor: pointer;color:#999999;font-size: 20px;margin-left:290px;"
                                        @click="toggleIcon2">
                                        {{ icon2 === '+' ? '+' : '-' }}
                                    </div>
                                    <br>
                                </div>
                                <div class="divider1">
                                    <el-divider style="margin:0px"></el-divider>
                                </div>

                                <!-- 第四块区域，高度150px -->
                                <div v-show="icon2 === '-'" style="height: 66px; background-color: #F8F8F8;">
                                    <el-row>
                                        <div style=" display: flex;width:443px;height:58px">
                                            <el-checkbox v-model="slider4Enabled"
                                                style="margin-top:24px;margin-left:10px"></el-checkbox>
                                            <span
                                                style="width:41px;font-size: 14px;font-family: 'Cabin';margin-top:24px;margin-left: 18px;font-weight:500">
                                                Style</span>
                                            <el-slider v-model="value4" :min="0" :max="100" :marks="marks4"
                                                :disabled="!slider4Enabled"
                                                style="width: 300px;height:8px;margin-left: 10px;margin-top: 16px;">
                                            </el-slider>
                                        </div>
                                    </el-row>
                                </div>

                                <!-- 第五块区域，高度150px -->
                                <div
                                    style="height: 57px; width:443px; background-color: #F8F8F8; display: flex; align-items: center;">
                                    <p
                                        style="font-family: 'Cabin'; width:300px;font-size: 20px; margin-top:27px;margin-left: 13px;font-style: italic;color: #999999;">
                                        角度与视角
                                    </p>
                                    <!-- 图标区域 -->
                                    <div style="width: 30px; cursor: pointer;color:#999999;font-size: 20px;margin-left:70px;"
                                        @click="toggleIcon3">
                                        {{ icon3 === '+' ? '+' : '-' }}
                                    </div>
                                    <br>
                                </div>
                                <div class="divider1">
                                    <el-divider style="margin:0px"></el-divider>
                                </div>

                                <!-- 第六块区域，高度150px -->
                                <div v-show="icon3 === '-'" style="height: 268px; background-color: #F8F8F8;">
                                    <el-row>
                                        <div style="display: flex;width: 443px;height:112px">
                                            <div style="margin-top:30px;margin-left: 28px">
                                                <span
                                                    style="word-wrap: break-word;width:56px;font-size: 14px;font-family: 'Cabin';font-weight:500">
                                                    角度</span>
                                            </div>
                                            <div style="margin-top: 28px;margin-left: 13px;">
                                                <div style="display: flex;width: 349px;height:42px">
                                                    <span style="margin-left:2px;margin-top: 5px;"> X </span>
                                                    <el-slider v-model="value6"
                                                        style="width: 198px;height:5px;margin-left: 20px;">
                                                    </el-slider>
                                                    <el-button
                                                        style="width:90px;height:20px;background-color: #A7A7A7;margin-left: 20px;"></el-button>
                                                </div>

                                                <div style="display: flex;width: 349px;height:42px">
                                                    <span style="margin-left:2px;margin-top: 5px;"> Y </span>
                                                    <el-slider v-model="value7"
                                                        style="width: 198px;height:5px;margin-left: 20px;">
                                                    </el-slider>
                                                    <el-button
                                                        style="width:90px;height:20px;background-color: #A7A7A7;margin-left: 20px;"></el-button>
                                                </div>
                                                <div style="display: flex;width: 349px;height:42px">
                                                    <span style="margin-left:2px;margin-top: 5px;"> Z </span>
                                                    <el-slider v-model="value8"
                                                        style="width: 198px;height:5px;margin-left: 20px;">
                                                    </el-slider>
                                                    <el-button
                                                        style="width:90px;height:20px;background-color: #A7A7A7;margin-left: 20px;"></el-button>
                                                </div>
                                            </div>
                                        </div>
                                    </el-row>

                                    <el-row>
                                        <div style="height:80px;display: flex;">
                                            <el-dropdown size="small" type="info" split-button
                                                style="margin-left: 90px;margin-top: 40px;">
                                                Front off-axis
                                                <el-dropdown-menu slot="dropdown">
                                                </el-dropdown-menu>
                                            </el-dropdown>
                                        </div>
                                    </el-row>
                                    <el-row>
                                        <div style="height:73px">
                                            <div>
                                                <span
                                                    style="word-wrap: break-word;width:56px;font-size: 14px;font-family: 'Cabin';margin-top:20px;margin-left: 28px;font-weight:500">
                                                    视角</span>
                                            </div>
                                            <div>
                                                <span
                                                    style="word-wrap: break-word;width:56px;font-size: 12px;font-family: 'Cabin';margin-top:20px;margin-left: 45px;font-weight:500">
                                                    室内视角</span>
                                                <el-checkbox v-model="checked1"
                                                    @change="handleChange('inside')"></el-checkbox>
                                                <span
                                                    style="word-wrap: break-word;width:56px;font-size: 12px;font-family: 'Cabin';margin-top:20px;margin-left: 45px;font-weight:500">
                                                    室外视角</span>
                                                <el-checkbox v-model="checked2"
                                                    @change="handleChange('outside')"></el-checkbox>
                                            </div>
                                        </div>
                                    </el-row>
                                </div>
                            </el-card>
                        </div>
                    </div>
                    <div class="button-container">
                        <el-popover placement="left-start">
                            <div style="display: flex;">
                                <div style="flex: 1;">
                                    <el-card
                                        style="display:flex; width: 500px; height: 680px; position: fixed; top:8px; margin-left: -370px; margin-top:370px;border-radius:5px">
                                        <div class="scroll-container">
                                            <!-- 嵌套信息位于卡片内
                                            <div>
                                                <el-input class="input1" placeholder="请输入关键字" v-model="searchQuery"
                                                    clearable @clear="clearSearch" suffix-icon="el-icon-search"
                                                    @click="handleSearch" />
                                            </div> -->
                                            <!-- <h3 style="margin-left: 10px; font-style: italic;">In general</h3> -->
                                            <h3 style="margin-left: 10px; font-style: italic;">设置</h3>
                                            <el-divider></el-divider>
                                            <p
                                                style="font-style: italic;font-size: 20px;margin-top:10px;margin-bottom:5px;color:gray;margin-left:10px">
                                                风格</p>
                                            <el-button v-for="button in buttons1" :key="button"
                                                :class="{ 'gray-button': isSelected1(button) }"
                                                style="padding:10px 10px;margin-left: 10px;word-wrap: break-word;white-space: normal;font-size: 20px;"
                                                @click="button1(button)">
                                                {{ button }}
                                            </el-button>
                                            <el-button size="small" icon="el-icon-plus"
                                                style="width:20px;height:35px;padding-left: 5px;"
                                                @click="addCustomButton1"></el-button>
                                            <br>

                                            <p
                                                style="font-style: italic;font-size: 20px;margin-top:10px;margin-bottom:5px;color:gray;margin-left:10px">
                                                地点</p>
                                            <el-button v-for="button in buttons2" :key="button"
                                                :class="{ 'gray-button': isSelected2(button) }"
                                                style="padding:10px 10px;margin-left: 10px;word-wrap: break-word;white-space: normal;font-size: 20px;"
                                                @click="button2(button)">
                                                {{ button }}
                                            </el-button>
                                            <el-button size="small" icon="el-icon-plus"
                                                style="width:20px;height:35px;padding-left: 5px;"
                                                @click="addCustomButton2"></el-button>
                                            <br>
                                            <p
                                                style="font-style: italic;font-size: 20px;margin-top:10px;margin-bottom:5px;color:gray;margin-left:10px">
                                                功能</p>
                                            <el-button v-for="button in buttons3" :key="button"
                                                :class="{ 'gray-button': isSelected3(button) }"
                                                style="padding:10px 10px;margin-left: 10px;word-wrap: break-word;white-space: normal;font-size: 20px;"
                                                @click="button3(button)">
                                                {{ button }}
                                            </el-button>
                                            <el-button size="small" icon="el-icon-plus"
                                                style="width:20px;height:35px;padding-left: 5px;"
                                                @click="addCustomButton3"></el-button>
                                            <br>

                                            <h3 style="margin-left: 10px; font-style: italic;">Facade</h3>
                                            <el-divider></el-divider>
                                            <p
                                                style="font-style: italic;font-size: 20px;margin-top:10px;margin-bottom:5px;color:gray;margin-left:10px">
                                                立面形式</p>
                                            <el-button v-for="button in buttons4" :key="button"
                                                :class="{ 'gray-button': isSelected4(button) }"
                                                style="padding:10px 10px;margin-left: 10px;word-wrap: break-word;white-space: normal;font-size: 20px;"
                                                @click="button4(button)">
                                                {{ button }}
                                            </el-button>
                                            <el-button size="small" icon="el-icon-plus"
                                                style="width:20px;height:35px;padding-left: 5px;"
                                                @click="addCustomButton4"></el-button>
                                            <br>
                                            <p
                                                style="font-style: italic;font-size: 20px;margin-top:10px;margin-bottom:5px;color:gray;margin-left:10px">
                                                空间</p>
                                            <el-button v-for="button in buttons5" :key="button"
                                                :class="{ 'gray-button': isSelected5(button) }"
                                                style="padding:10px 10px;margin-left: 10px;word-wrap: break-word;white-space: normal;font-size: 20px;"
                                                @click="button5(button)">
                                                {{ button }}
                                            </el-button>
                                            <el-button size="small" icon="el-icon-plus"
                                                style="width:20px;height:35px;padding-left: 5px;"
                                                @click="addCustomButton5"></el-button>
                                            <br>

                                            <p
                                                style="font-style: italic;font-size: 20px;margin-top:10px;margin-bottom:5px;color:gray;margin-left:10px">
                                                位移</p>
                                            <el-button v-for="button in buttons6" :key="button"
                                                :class="{ 'gray-button': isSelected6(button) }"
                                                style="padding:10px 10px;margin-left: 10px;word-wrap: break-word;white-space: normal;font-size: 20px;"
                                                @click="button6(button)">
                                                {{ button }}
                                            </el-button>
                                            <el-button size="small" icon="el-icon-plus"
                                                style="width:20px;height:35px;padding-left: 5px;"
                                                @click="addCustomButton6"></el-button>
                                            <br>

                                            <!-- <p
                                                style="font-style: italic;font-size: 20px;margin-top:10px;margin-bottom:5px;color:gray;margin-left:10px">
                                                Thermal</p>
                                            <el-button v-for="button in buttons7" :key="button"
                                                :class="{ 'gray-button': isSelected7(button) }"
                                                style="padding:10px 10px;margin-left: 10px;word-wrap: break-word;white-space: normal;font-size: 20px;"
                                                @click="button7(button)">
                                                {{ button }}
                                            </el-button>
                                            <el-button size="small" icon="el-icon-plus"
                                                style="width:20px;height:35px;padding-left: 5px;"
                                                @click="addCustomButton7"></el-button> -->
                                        </div>
                                    </el-card>
                                </div>
                            </div>
                            <el-button class="button1" size="small" slot="reference">关键词</el-button>

                        </el-popover>



                        <el-popover placement="left-start">
                            <div style="display: flex;">
                                <div style="flex: 1;">
                                    <el-card
                                        style="display:flex;  width: 500px; height: 670px; position: fixed; top:8px; margin-left: -521px;margin-top:410px; border-radius:5px; font-size:16px;">
                                        <p style="font-size:30px;font-weight:500;;">上传图片</p>
                                        <div class="rectangle-container">
                                            <div class="rectangle">
                                                <i class="el-icon-plus"
                                                    style="font-size: 400px; cursor: pointer;color:#D3D3D3"
                                                    @click="handleImageUpload" v-if="!imageUrl"></i>
                                                <input ref="fileInput" type="file" accept="image/*"
                                                    style="display: none" @change="handleFileChange" />
                                                <img :src="imageUrl" alt="Uploaded Image" v-if="imageUrl" />
                                            </div>
                                            <div class="button-container1">
                                                <el-button type="primary" @click="handleImageUpload" v-if="!imageUrl"
                                                    style="margin-top: 20px;width:150px;height:50px;font-size:20px">选择</el-button>
                                                <el-button type="success" @click="uploadToDALLE" v-if="imageUrl"
                                                    style="margin:20px;width:150px;height:50px;font-size:20px">上传</el-button>
                                                <el-button type="danger" @click="deleteImage" v-if="imageUrl"
                                                    style="margin-right:20px;width:150px;height:50px;font-size:20px">删除</el-button>
                                            </div>
                                        </div>

                                    </el-card>
                                </div>
                            </div>
                            <el-button class="buttonimg" size="small" slot="reference">上传图片</el-button>
                        </el-popover>

                        <div>
                            <el-button
                                style="margin-top:20px; margin-left: 18px;border-radius: 3px;background-color: #d9d9d9; width: 200px; height:39px;font-size:18px ;"
                                size="small" @click="regenerateImages">重新生成
                            </el-button>
                            <el-button
                                style="margin-left: 29px; border-radius: 3px;background-color: #d9d9d9; width: 200px;height:39px;font-size:18px"
                                size="small" @click="">局部编辑
                            </el-button>
                        </div>


                        <!-- <el-button class="buttongo" size="small" @click="generateImages">生成</el-button> -->
                    </div>
                </el-row>
            </el-col>
            <el-col style="width:799px;height: 1080px;background-color: #FFFFFF;border-right: 1px solid #cccccc;">
                <el-row style="width:799px;height:94px">
                    <p style="font-family: 'Cabin'; font-size: 24px; margin:49px 0px 0px 24px">Generate Images</p>
                    <el-divider style="margin-top:0px"></el-divider>
                </el-row>

                <el-row>
                    <div class="image-grid"
                        style="width: 743px;height:743px;margin-left: 28px; margin-top: 20px; border-radius: 20px">
                        <div v-for="(image, index) in generatedImages" :key="index" class="image-container">
                            <!-- <div class="image-card"> -->
                            <img :src="image" alt="Generated Image"
                                style="width:363px;height:363px;border-radius: 20px;background-color: #EDEDED;"
                                :class="{ 'selected': selectedIndex === index }" @click="selectImage(index)" />
                            <!-- </div> -->
                        </div>
                    </div>
                </el-row>

                <div v-if="showContextMenu" :style="{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }"
                    class="context-menu">
                    <ul>
                        <li @click="saveImageToLocal">保存图片</li>
                    </ul>
                </div>

                <!-- <div>
                    <el-button
                        style="margin-top:30px; margin-left: 30px;border-radius: 5px;background-color: #d9d9d9; width: 126px; height:43px;font-size:18px ;"
                        size="small" @click="">重新生成
                    </el-button>
                    <el-button
                        style="margin-left: 30px; border-radius: 5px;background-color: #d9d9d9; width: 126px;height:43px;font-size:18px"
                        size="small" @click="">局部编辑
                    </el-button>
                </div> -->
                <!-- <div style="height: 100px; width:750px;overflow-y: auto; border: 1px solid #ccc; margin-top: 20px;">
                    <pre>{{ analysisResults }}</pre>
                </div> -->
                <div
                    style="height: 220px; width: 750px; margin-left: 20px; margin-top: 10px; border-radius: 20px;  overflow-y: auto; overflow-x: auto;border: 1px solid #ccc; margin-top: 0px;">
                    <ul>
                        <li v-for="(result, index) in analysisResults" :key="index">
                            <img :src="result.url" alt="Analyzed Image" style="width: 100px; height: 100px;">
                            <pre>{{ result.content }}</pre>
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
    </div>
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
            lastImagePrompt: '',
            isSecondColVisible: false,
            analysisResults: [], // 存储分析结果的数组
            showContextMenu: false,
            menuPosition: { x: 0, y: 0 },
            currentImageUrl: null,
            selectedIndex: null,
            generalInput: "",  // 通用的输入变量
            currentPlaceholder: "请输入信息...",  // 当前的提示文字
            slider1Enabled: false,
            slider2Enabled: false,
            slider3Enabled: false,
            slider4Enabled: false,
            button44: false,
            checked1: false,
            checked2: false,
            perspectiveText: '',
            shadeType: '',
            textarea: "",
            textarea1: "",
            textarea2: "",
            textarea3: "",
            inputMessage: "",
            apiKey: "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",
            messages: [],
            isLoading: false,
            generatedImages: Array.from({ length: 4 }, () => ({ url: null })),
            icon1: '+', // 初始图标状态为+
            icon2: '+', // 初始图标状态为+、
            icon3: '+', // 初始图标状态为
            value1: 0,
            value2: 1,
            value3: 0,
            value4: 0,
            value5: 0,
            value6: 0,
            value7: 0,
            value8: 0,
            checked1: false,
            checked2: false,
            // buttons1: ["Modernist", "Futuristic", "Gothic"],
            // buttons2: ["Hong Kong", "Shenzhen", "Beijing"],
            // buttons3: ["Office", "Residential building", "School"],
            // buttons4: ["Double-skin", "Panel frame", "Curtain Walling"],
            // buttons5: ["Tight", "Loose", "Regular"],
            // buttons6: ["Horizontal", "Vertical", "Angle"],
            // buttons7: ["Double-skin", "Panel frame", "Curtain Walling"],
            buttons1: ["现代主义", "未来主义", "哥特式"],
            buttons2: ["香港", "深圳", "北京"],
            buttons3: ["办公室", "住宅楼", "学校"],
            buttons4: ["双层", "板框", "幕墙"],
            buttons5: ["紧", "松", "常规"],
            buttons6: ["水平", "垂直", "角度"],
            // buttons7: ["双层","板框","幕墙"],
            searchQuery: '', // 存储搜索关键字
            selectedButtons: [],
            selectedDetails: [],
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            imageUrl: null,
            marks: {
                0: '0%',
                100: '100%',
                40: {
                    style: {
                        color: '#FF0000'
                    },
                    label: this.$createElement('strong', '40%')
                },
            },
            marks2: {
                0: '1',
                1000: '1000 kgCO₂e/m³',
            },
            marks3: {
                0: '0%',
                100: '100%',
            },
            marks4: {
                0: '艺术',
                100: '现实  ',
            }
        }
    },
    watch: {
        slider1Enabled(enabled) {
            if (!enabled) {
                this.value1 = 0;
            }
        },
        slider2Enabled(enabled) {
            if (!enabled) {
                this.value2 = 0;
            }
        },
        slider3Enabled(enabled) {
            if (!enabled) {
                this.value3 = 0;
            }
        },
        slider4Enabled(enabled) {
            if (!enabled) {
                this.value4 = 0;
            }
        },
        button44(enabled) {
            if (!enabled) {
                this.shadeType = '';
            }
        }
    },
    mounted() {
        EventBus.$on('updateShadeType', (type) => {
            this.shadeType = type;
        });
        document.addEventListener('click', this.closeContextMenu);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.closeContextMenu);
    },
    computed: {
        displayTextarea: {
            get() {
                // 组合 generalInput 和 textarea1
                // return this.generalInput + "\n" + this.textarea1 + "\n" + this.textarea3;
                // return `${this.generalInput}\n${this.textarea1}\n${this.textarea3}`;
                return `${this.generalInput}<br>${this.textarea1}<br>${this.textarea3}`;
            },
            set(newValue) {
                if (typeof newValue === 'undefined') {
                    console.log("newValue is undefined");
                    return;
                }
                const parts = newValue.split("\n");
                this.generalInput = parts.slice(0, -1).join("\n");
            }
            // set(newValue) {
            //     // 仅更新 generalInput，保持 textarea1 不变
            //     const parts = newValue.split("\n");
            //     this.generalInput = parts.slice(0, -1).join("\n"); // 保留除了最后一部分的所有内容
            // }
        },
    },

    methods: {
        toggleSecondCol() {
            this.isSecondColVisible = !this.isSecondColVisible; // 切换第二列的显示状态
        },
        // analyzeImage() {
        //     console.log("analyzeImage called");  // 确认方法被调用
        //     if (!this.generatedImages || this.generatedImages.length === 0) {
        //         console.error('No image generated!');
        //         return;
        //     }

        //     let analysisResults = [];
        //     let analyzeCount = 0;

        //     this.generatedImages.forEach(image => {
        //         if (image.url) {
        //             const url = "https://api.openai.com/v1/chat/completions";
        //             const headers = {
        //                 Authorization: "Bearer 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",
        //                 "Content-Type": "application/json",
        //             };
        //             const payload = {
        //                 model: "gpt-4o-mini",
        //                 messages: [{
        //                     "role": "user",
        //                     "content": [{
        //                         "type": "image_url",
        //                         "image_url": image.url  // 使用生成的图片链接
        //                     }, {
        //                         "type": "text",
        //                         "text": "请根据图片中的建筑的建造材料来评估该建筑外立面的建材碳排放量，并使用A、B、C、D进行评级。"
        //                     }]
        //                 }],
        //                 max_tokens: 300
        //             };

        //             fetch(url, {
        //                 method: 'POST',
        //                 headers: headers,
        //                 body: JSON.stringify(payload),
        //             })
        //                 .then(response => response.json())
        //                 .then(data => {
        //                     analysisResults.push(data.choices[0].message.content);
        //                     analyzeCount++;
        //                     if (analyzeCount === this.generatedImages.length) {
        //                         console.log('Complete response for image analysis:', analysisResults); // 打印完整的响应内容
        //                         this.analysisResults = analysisResults;
        //                     }
        //                 }).catch(error => {
        //                     console.error('Error making API request:', error);
        //                 });
        //         }
        //     });
        // },
        // analyzeImage1() {
        //     if (!this.generatedImages || this.generatedImages.length === 0) {
        //         console.error('No image generated!');
        //         return;
        //     }

        //     this.generatedImages.forEach((image, index) => {
        //         console.log(`Processing image ${index + 1}: ${image}`);
        //         const url = "https://api.openai.com/v1/chat/completions";
        //         const headers = {
        //             Authorization: "Bearer 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",  // 确保使用正确的 API key
        //             "Content-Type": "application/json",
        //         };
        //         const payload = {
        //             model: "gpt-4o-mini",
        //             messages: [{
        //                 "role": "user",
        //                 "content": [
        //                     {
        //                         "type": "image_url",
        //                         "image": {
        //                             "url": image  // 确保这里是对象形式
        //                         }
        //                     },
        //                     {
        //                         "type": "text",
        //                         "text": "请根据图片中的建筑的建造材料来评估该建筑外立面的建材碳排放量，并使用A、B、C、D进行评级。"
        //                     }
        //                 ]
        //             }],
        //             max_tokens: 300
        //         };
        //         console.log("Sending Payload:", JSON.stringify(payload, null, 2));

        //         fetch(url, {
        //             method: 'POST',
        //             headers: headers,
        //             body: JSON.stringify(payload),
        //         })
        //             .then(response => response.json())
        //             .then(data => {
        //                 console.log(`Received response for image ${index + 1}:`, data);
        //             })
        //             .catch(error => {
        //                 console.error(`Error processing image ${index + 1}:`, error);
        //             });
        //     });
        // },





        //     this.selectedImageBase64.forEach(base64Image => {
        //         const url = "https://api.openai.com/v1/chat/completions";
        //         const headers = {
        //             Authorization: `Bearer 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`, // 替换为实际的API密钥
        //             "Content-Type": "application/json",
        //         };
        //         const payload = {
        //             model: "gpt-4o-mini",
        //             messages: [{
        //                 "role": "user",
        //                 "content": [
        //                     {
        //                         "type": "text",
        //                         //  "text": "Please analyze the uploaded building image and identify its shape and structural features (such as curves, waves, straight lines), exterior materials (such as glass, metal, concrete), primary colors, any adaptive or dynamic features (such as movable shading devices, responsive glazing), classify its architectural style based on the shape, materials, and colors, and identify functional elements (such as windows, balconies), and provide a summary."
        //                         "text": " 请根据图片中的建筑的建造材料来评估该建筑外立面的建材碳排放量，并使用A、B、C、D进行评级。",
        //                     },
        //                     {
        //                         "type": "image_url",
        //                         "image_url": {
        //                             "url": `data:image/jpeg;base64,${base64Image}`  // 使用base64图像数据
        //                         }
        //                     }
        //                 ]
        //             }],
        //             max_tokens: 300
        //         };

        //         fetch(url, {
        //             method: 'POST',
        //             headers: headers,
        //             body: JSON.stringify(payload),
        //         })
        //             .then(response => response.json())
        //             .then(data => {

        //                 analysisResults.push(data.choices[0].message.content);
        //                 analyzeCount++;
        //                 if (analyzeCount === this.selectedImageBase64.length) {
        //                     console.log('Complete response for image analysis:', analysisResults); // 打印完整的响应内容
        //                     this.analysisResults = analysisResults;

        //                 }
        //             });
        //     });
        // },
        selectImage(index) {
            this.selectedIndex = index;
        },
        handleRightClick(event, imageUrl) {
            this.currentImageUrl = imageUrl;
            this.menuPosition = { x: event.clientX, y: event.clientY };
            this.showContextMenu = true;
        },
        saveImageToLocal() {
            const link = document.createElement('a');
            link.href = this.currentImageUrl;
            link.download = 'downloaded_image.jpg'; // 这里可以设置动态文件名
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            this.showContextMenu = false;
        },
        closeContextMenu() {
            this.showContextMenu = false;
        },

        handleChange(perspective) {
            // Reset the other checkbox and update the input box text
            if (perspective === 'inside') {
                this.checked2 = false;
                this.perspectiveText = '室内';
            } else if (perspective === 'outside') {
                this.checked1 = false;
                this.perspectiveText = '室外';
            }
            if (!this.checked1 && !this.checked2) {
                this.perspectiveText = '';
            }
        },
        async sendMessage(inputMessage) {
            if (!this.generalInput) return;
            this.messages.push({ text: this.generalInput, isUser: true });

            this.isLoading = true;

            try {
                const response = await this.sendToChatGPT(this.generalInput);
                const botResponse = response.data.choices[0].message.content; // Adjust this according to your API response structure
                this.messages.push({ text: botResponse, isUser: false });
            } catch (error) {
                console.error("Error sending message:", error);
            } finally {
                this.isLoading = false;
                this.generalInput = "";
            }
        },
        async sendToChatGPT(userMessage) {
            const url = "https://api.openai.com/v1/chat/completions"; // Replace with your actual API URL
            const headers = {
                Authorization: `Bearer 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`,
            };
            return await this.$axios.post(url, {

                model: "gpt-4o-mini",
                messages: [
                    {
                        "role": "user", "content": this.generalInput
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
        handleSendMessage() {
            // 将 generalInput 的内容作为 inputMessage 处理
            this.sendMessage(this.generalInput);
            this.generalInput = "";  // 清空输入框
        },
        // prepareAndGenerateImages() {
        //     // 更新 textarea1 之前，确保 generalInput 是最新的
        //     this.textarea1 = this.constructTextarea1();
        //     this.generateImages(this.displayTextarea); // 现在 displayTextarea 包含了最新的组合数据
        //     this.generalInput = "";  // 清空输入框
        // },
        async prepareAndGenerateImages() {
            this.textarea1 = this.constructTextarea1();
            this.messages.push({ text: `请生成图片，使用的提示为：${this.displayTextarea}`, isUser: true });
            this.lastImagePrompt = this.displayTextarea;  // 保存这次使用的提示
            this.isLoading = true;
            await this.generateImages(this.displayTextarea);
            this.isLoading = false;
            this.messages.push({ text: '图片已按要求生成。', isUser: false });
            this.generalInput = "";
        },

        async regenerateImages() {
            if (!this.lastImagePrompt) {
                alert('没有可用的提示来重新生成图片。');
                return;
            }
            this.messages.push({ text: `请重新生成图片，使用的提示为：${this.lastImagePrompt}`, isUser: true });
            this.isLoading = true;
            await this.generateImages(this.lastImagePrompt);
            this.isLoading = false;
            this.messages.push({ text: '图片已重新生成。', isUser: false });
        },
        constructTextarea1() {
            // 构建 textarea1 内容的逻辑
            let message = '';

            if (this.slider1Enabled) {
                message += `窗墙比：${this.value1}`;
            }

            if (this.slider2Enabled) {
                if (message !== '') {
                    message += ', ';
                }
                message += `建材碳排放量：${this.value2}`;
            }

            if (this.slider3Enabled) {
                if (message !== '') {
                    message += ', ';
                }
                message += `光反射率：${this.value3}`;
            }
            if (this.slider4Enabled) {
                if (message !== '') {
                    message += ', ';
                }
                message += `艺术风格：${100 - this.value4} & 现实主义风格：${this.value4}`;
            }
            if (this.shadeType) {
                if (message !== '') {
                    message += ', ';
                }
                message += `建筑室外的遮阳类型：${this.shadeType}`;
            }
            if (this.perspectiveText) {
                if (message !== '') {
                    message += ', ';
                }
                message += `视角为：${this.perspectiveText}`;
            }
            return message;
        },



        // // 在前端代码中发送消息到后端
        // async sendMessage() {
        //     if (!this.generalInput) return;
        //     this.messages.push({ text: this.generalInput, isUser: true });

        //     this.isLoading = true;

        //     try {
        //         // 发送用户消息到后端的问答端点
        //         const response = await this.sendToBackend(this.generalInput);
        //         const botResponse = response.data.answer; // 根据后端API响应结构调整此处
        //         this.messages.push({ text: botResponse, isUser: false });
        //     } catch (error) {
        //         console.error("Error sending message:", error);
        //     } finally {
        //         this.isLoading = false;
        //         this.generalInput = "";
        //     }
        // },

        // // 新的函数，用于发送用户消息到后端
        // async sendToBackend(userMessage) {
        //     const backendUrl = "http://localhost:8000/ask"; // 根据后端API端点的URL进行修改

        //     try {
        //         const response = await this.$axios.post(backendUrl, {
        //             question: userMessage
        //         });

        //         return response;
        //     } catch (error) {
        //         console.error("Error sending message to backend:", error);
        //         throw error;
        //     }
        // },


        // async sendToChatGPT(userMessage) {
        //     const url = "https://api.openai.com/v1/engines/text-davinci-003/completions"; // Replace with your actual API URL
        //     const headers = {
        //         Authorization: `Bearer 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`,
        //     };

        //     const payload = {
        //         prompt: this.inputMessage,  // Assuming userMessage is the input message.
        //         temperature: 0,
        //         max_tokens: 200,
        //         top_p: 1,
        //         frequency_penalty: 0,
        //         presence_penalty: 0,
        //     };

        //     return await this.$axios.post(url, payload, { headers });
        // },

        toggleIcon1() {
            // 切换第一块区域图标状态
            this.icon1 = this.icon1 === '+' ? '-' : '+';
        },
        toggleIcon2() {
            // 切换第三块区域图标状态，并根据状态控制第四块区域的显示和隐藏
            this.icon2 = this.icon2 === '+' ? '-' : '+';
        },
        toggleIcon3() {
            // 切换第三块区域图标状态，并根据状态控制第四块区域的显示和隐藏
            this.icon3 = this.icon3 === '+' ? '-' : '+';
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
            // this.textarea1 = this.constructTextarea1();
        },
        isSelected1(buttonName) {
            return this.selectedButtons.includes(buttonName);
        },
        addTotextarea1(buttonName) {
            // 添加按钮名称到输入框中
            this.textarea3 += '采用' + buttonName + '风格，';
        },
        removeFromtextarea1(buttonName) {
            // 从输入框中移除按钮名称
            this.textarea3 = this.textarea3.replace(new RegExp('采用' + buttonName + '风格，', 'g'), '');
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
            // this.textarea1 = this.constructTextarea1();
        },
        isSelected2(buttonName) {
            return this.selectedButtons.includes(buttonName);
        },
        addTotextarea2(buttonName) {
            // 添加按钮名称到输入框中
            this.textarea3 += '在' + buttonName + '，';
        },
        removeFromtextarea2(buttonName) {
            // 从输入框中移除按钮名称
            this.textarea3 = this.textarea3.replace(new RegExp('在' + buttonName + '，', 'g'), '');
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
            // this.textarea1 = this.constructTextarea1();
        },
        isSelected3(buttonName) {
            return this.selectedButtons.includes(buttonName);
        },
        addTotextarea3(buttonName) {
            // 添加按钮名称到输入框中
            this.textarea3 += '用于' + buttonName + '，';
        },
        removeFromtextarea3(buttonName) {
            // 从输入框中移除按钮名称
            this.textarea3 = this.textarea3.replace(new RegExp('用于' + buttonName + '，', 'g'), '');
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
            // this.textarea1 = this.constructTextarea1();
        },
        isSelected4(buttonName) {
            return this.selectedButtons.includes(buttonName);
        },
        addTotextarea4(buttonName) {
            // 添加按钮名称到输入框中
            this.textarea3 += '采用' + buttonName + '立面形式，';
        },
        removeFromtextarea4(buttonName) {
            // 从输入框中移除按钮名称
            this.textarea3 = this.textarea3.replace(new RegExp('采用' + buttonName + '立面形式，', 'g'), '');
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
            // this.textarea1 = this.constructTextarea1();
        },
        isSelected5(buttonName) {
            return this.selectedButtons.includes(buttonName);
        },
        addTotextarea5(buttonName) {
            // 添加按钮名称到输入框中
            this.textarea3 += '空间排布是' + buttonName + '，';
        },
        removeFromtextarea5(buttonName) {
            // 从输入框中移除按钮名称
            this.textarea3 = this.textarea3.replace(new RegExp('空间排布是' + buttonName + '，', 'g'), '');
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
            // this.textarea1 = this.constructTextarea1();
        },
        isSelected6(buttonName) {
            return this.selectedButtons.includes(buttonName);
        },
        addTotextarea6(buttonName) {
            // 添加按钮名称到输入框中
            this.textarea3 += '是' + buttonName + '运动，';
        },
        removeFromtextarea6(buttonName) {
            // 从输入框中移除按钮名称
            this.textarea3 = this.textarea3.replace(new RegExp('是' + buttonName + '运动，', 'g'), '');
        },

        // button7(buttonName) {
        //     if (this.isSelected7(buttonName)) {
        //         // 如果按钮已选中，取消选中
        //         this.selectedButtons = this.selectedButtons.filter(item => item !== buttonName);
        //         this.removeFromtextarea7(buttonName);
        //     } else {
        //         // 否则，选中按钮
        //         this.selectedButtons.push(buttonName);
        //         this.addTotextarea7(buttonName);
        //     }
        //     this.textarea1 = this.constructTextarea1();
        // },
        // isSelected7(buttonName) {
        //     return this.selectedButtons.includes(buttonName);
        // },
        // addTotextarea7(buttonName) {
        //     // 添加按钮名称到输入框中
        //     this.textarea1 += ' with ' + buttonName + ' thermal ';
        // },
        // removeFromtextarea7(buttonName) {
        //     // 从输入框中移除按钮名称
        //     this.textarea1 = this.textarea1.replace(new RegExp(' with ' + buttonName + ' thermal ', 'g'), '');
        // },
        async generateImages(displayTextarea) {
            console.log("正在生成图片，使用的描述为: ", displayTextarea);

            try {
                const userid = this.$store.state.userid;

                // 将卡片状态设置为加载中
                this.generatedImages = Array.from({ length: 4 }, () => ({ url: null }));

                const response = await axios.post(
                    "https://api.openai.com/v1/images/generations",
                    {
                        prompt: displayTextarea,
                        model: "dall-e-2",
                        n: 4,  // 设置生成的输出数量
                    },
                    {
                        headers: {
                            Authorization: "Bearer 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",
                        },
                    }
                );

                const generatedImages = [
                    response.data.data[0].url,
                    response.data.data[1].url,
                    response.data.data[2].url,
                    response.data.data[3].url,
                ];
                this.generatedImages = generatedImages;
                console.log("Generated Images before analyzeImage:", this.generatedImages);
                this.saveImagesLocally();
                this.analysisResults = []; // 清空分析结果
                await this.analyzeImage();
                // 发送用户输入和生成的图片到后端
                await this.sendDataToBackend({ userid, textarea: this.textarea2, generatedImages: this.generatedImages });
                // // 调用 analyzeImage 分析生成的图片
            } catch (error) {
                // 处理错误
                console.error('Error communicating with OpenAI:', error);
                // 将卡片状态设置为加载失败
                this.generatedImages = Array.from({ length: 4 }, () => ({ url: 'Error loading image.' }));
            }
        },


        // async analyzeImage() {
        //     console.log("开始分析图片...");
        //     try {
        //         for (const imageUrl of this.generatedImages) {
        //             const analysisResponse = await axios.post(
        //                 "https://api.openai.com/v1/chat/completions",
        //                 {
        //                     model: "gpt-4o-mini",
        //                     messages: [
        //                         {
        //                             "role": "user",
        //                             "content": [
        //                                 {
        //                                     "type": "text",
        //                                     "text": "What’s in this image?"
        //                                 },
        //                                 { "type": "image_url", "image_url": { "url": imageUrl } }
        //                             ]
        //                         }
        //                     ],
        //                     max_tokens: 300
        //                 },

        //                 {
        //                     headers: {
        //                         Authorization: "Bearer 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",
        //                     },
        //                 }
        //             );
        //             console.log(`Image analysis result for ${imageUrl}:`, analysisResponse.data.choices[0].message.content);
        //         }
        //     } catch (error) {
        //         console.error('Error analyzing images:', error);
        //     }
        // },
        async analyzeImage() {
            console.log("开始分析图片...");
            try {
                for (const imageUrl of this.generatedImages) {
                    const analysisResponse = await axios.post(
                        "https://api.openai.com/v1/chat/completions",
                        {
                            model: "gpt-4o-mini",
                            messages: [
                                {
                                    "role": "user",
                                    "content": [
                                        { "type": "text", "text": "请根据图片中的建筑的建造材料来评估该建筑外立面的建材碳排放量，并使用A、B、C、D进行评级。" },
                                        { "type": "image_url", "image_url": { "url": imageUrl } }
                                    ]
                                }
                            ],
                            max_tokens: 300
                        },
                        {
                            headers: {
                                Authorization: "Bearer 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",
                            },
                        }
                    );
                    // 将图像URL和分析结果作为对象添加到数组
                    this.analysisResults.push({
                        url: imageUrl,
                        content: analysisResponse.data.choices[0].message.content
                    });
                    console.log(`Image analysis result for ${imageUrl}:`, analysisResponse.data.choices[0].message.content);
                }
            } catch (error) {
                console.error('Error analyzing images:', error);
            }
        },


        async saveImagesLocally() {
            for (let i = 0; i < this.generatedImages.length; i++) {
                const imageUrl = this.generatedImages[i];

                if (imageUrl) {
                    // 使用axios获取图像数据
                    const response = await axios.get(imageUrl, { responseType: 'blob' });

                    // 创建 Blob 对象
                    const blob = new Blob([response.data], { type: 'image/jpeg' });

                    // 创建临时下载链接
                    const downloadLink = document.createElement('a');
                    downloadLink.href = URL.createObjectURL(blob);
                    downloadLink.download = `generated_image_${i + 1}.jpg`;

                    // 模拟点击下载链接
                    document.body.appendChild(downloadLink);
                    downloadLink.click();

                    // 移除下载链接
                    document.body.removeChild(downloadLink);
                }
            }
        },
        setShadeType(type) {
            // 设置遮阳类型
            this.shadeType = type;
            EventBus.$emit('updateShadeType', type);
        },
        async sendDataToBackend(data) {
            // 使用axios发送数据到后端的API
            try {
                await axios.post('http://127.0.0.1/sendMessage', data);
                console.log('Data saved successfully!');
            } catch (error) {
                console.error('Error saving data to the backend:', error);
            }
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
        // addCustomButton7() {
        //     this.$prompt('请输入按钮名称', '自定义按钮', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //     }).then(({ value }) => {
        //         // 在按钮数组中添加新的按钮名称
        //         this.buttons7.unshift(value);
        //     });
        // },

        //从本地上传图片
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
        handleChange1() { },
        handleChange2() { },
        handleChange3() { },
    }
}
</script>

<style scoped>
.gray-button {
    background-color: #f9e8e8;
    /* 深灰色背景 */

}

.el-divider--horizontal {
    margin-bottom: 0px;
    margin-top: 13px;
    background-color: #cccccc;
}

.chat-container {
    display: flex;
    flex-direction: column;
    height: 986px;
    width: 500px;
    padding: 0px;
    border-radius: 10px;
}

.chat-messages {
    /* flex: 1; */
    overflow: hidden;
    /* padding: 10px; */
    height: 721px;
    width: 443px;
    background-color: #ffffff;
    border-radius: 15px;
    margin: 30px 28px 0px 29px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: auto #888;
    /* auto for track color, #888 for thumb color */
}

.message {

    display: flex;
    word-wrap: break-word;
    padding: 5px;
    border-radius: 5px;
    align-items: center;
}

.gpt1 {
    background-color: #ededed;
    padding: 2px;
    border-radius: 10px;
    max-width: 70%;
    word-wrap: break-word;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    margin: 10px 0px 0px 10px;
    font-family: 'Cabin';
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
    font-size: 20px;
    display: flex;
    flex-direction: column;
    font-family: 'Cabin';
}

/* .message-text {
  display: inline-block;
} */
.input_container {
    width: 443px;
    height: 180px;
    margin: 20px 28px 20px 29px;
    background-color: #ffffff;
    border-radius: 10px;
}

.el-textarea__inner {
    border: 1px solid #ffffff;
    padding-top: 0px;
    vertical-align: top;
    font-style: italic;
    background-color: rgb(202, 83, 83);
    width: 440px;
    height: 180px;
}


.el-textarea__inner :focus {
    border: 1px solid #ffffff;
}

.button4 {
    background-color: #ffffff;
    margin-left: 410px;
    padding: 0px;
    border: 1px solid #ffffff;

}

.el-textarea__inner:hover {
    border-color: #ffffff;
}

.el-icon-s-promotion {
    font-size: 20px;
}

.el-textarea__inner::-webkit-input-placeholder {
    font-family: 'Cabin', sans-serif;
    font-size: 20px;
}

.el-textarea__inner::-moz-placeholder {
    font-family: 'Cabin', sans-serif;
    font-size: 20px;
}

.el-textarea__inner:-ms-input-placeholder {
    font-family: 'Cabin', sans-serif;
    font-size: 20px;
}

.chat-messages::-webkit-scrollbar {
    width: 10px;
}

.chat-messages::-webkit-scrollbar-thumb {
    background-color: #888;
}

.chat-messages::-webkit-scrollbar-track {
    background-color: transparent;
}

.a ::-webkit-scrollbar {
    width: 10px;
}

.a ::-webkit-scrollbar-thumb {
    background-color: #888;
}

.a ::-webkit-scrollbar-track {
    background-color: transparent;
}

.b ::-webkit-scrollbar {
    width: 10px;
}

.b ::-webkit-scrollbar-thumb {
    background-color: #888;
}

.b ::-webkit-scrollbar-track {
    background-color: transparent;
}

.c ::-webkit-scrollbar {
    width: 10px;
}

.c ::-webkit-scrollbar-thumb {
    background-color: #888;
}

.c ::-webkit-scrollbar-track {
    background-color: transparent;
}

.image-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 17px;
}

.image-container {
    text-align: center;
    display: flex;
    background-color: #EDEDED;
    /* 背景颜色 */
    width: 363px;
    height: 363px;
    border-radius: 20px;
}

.icon1 {
    width: 30px;
    height: 20px
}

.cardh::-webkit-scrollbar {
    width: 8px;
}

.cardh::-webkit-scrollbar-thumb {
    background-color: #888;
}

.cardh::-webkit-scrollbar-track {
    background-color: transparent;
}

.scroll-container::-webkit-scrollbar {
    width: 8px;
}

.scroll-container::-webkit-scrollbar-thumb {
    background-color: #888;
}

.scroll-container::-webkit-scrollbar-track {
    background-color: transparent;
}

.scroll-container {
    height: 1080px;
    overflow-y: auto;
}

.rectangle-container {
    text-align: center;
}

.rectangle {
    width: 450px;
    height: 450px;
    margin: 20px;
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
</style>

<style>
.el-popover {
    padding: 0px;
    background-color: #00000000;
    border: 1px;
    position: relative;
    left: -200px;
}

.a .el-textarea__inner {
    background-color: white;
    border: 1px solid #ffffff;
    padding-top: 0px;
    vertical-align: top;
    font-style: italic;
    width: 440px;
    height: 180px;
    font-family: 'Cabin';
    font-size: 20px;
    font-weight: 500;
    border-radius: 15px;
}

.b .el-textarea__inner {
    background-color: white;
    padding-top: 0px;
    vertical-align: top;
    font-style: italic;
    width: 443px;
    height: 180px;
    margin: 49px 28px 0px 28px;
    border-radius: 10px 10px 0px 0px;
    font-size: 20px;
}

.c .el-textarea__inner {
    background-color: #ededed;
    border: 0px solid #ededed;
    padding-top: 0px;
    vertical-align: top;
    font-style: italic;
    width: 443px;
    height: 74px;
    margin: 0px 28px 0px 28px;
    border-radius: 0px 0px 10px 10px;
    font-size: 20px;
}

.card {
    margin: 26px 14px 0px 14px
}

.divider1 .el-divider--horizontal {
    margin: 0px
}

.el-select .el-input__inner {
    height: 24px;
    width: 157px
}

.el-slider__bar {
    background-color: #A7A7A7;
}

.el-slider__button {
    border: 2px solid #A7A7A7;
}



.button1 {
    margin-top: 20px;
    margin-left: 18px;
    padding: 0px;
    width: 200px;
    height: 39px;
    background-color: #d9d9d9;
    font-size: 18px;
    font-weight: 500;
}

.buttonimg {
    margin-top: 20px;
    margin-left: 30px;
    padding: 0px;
    width: 200px;
    height: 39px;
    background-color: #d9d9d9;
    font-size: 18px;
    font-weight: 500;
}

.buttongo {
    margin-top: 32px;
    margin-left: 30px;
    width: 140px;
    height: 43px;
    padding: 5px 15px 5px 15px;
    background-color: #779D38;
    font-size: 18px;
    font-weight: 500;
}

.input1 {
    width: 270px;
    margin: 10px 10px 0px 10px;
    background-color: white;
}

h3 {
    margin: 20px 0px 5px 10px
}

.el-slider__marks-text {
    overflow-wrap: break-word;
    /* 允许在单词内断行 */
    word-wrap: break-word;
    /* 允许在单词内断行（兼容旧版浏览器） */
    white-space: normal;
    /* 设置空白处理为正常，以允许自动换行 */
}

.el-icon-caret-left {
    font-size: 20px;
    /* 调整字体大小来增大图标 */

}

.el-icon-caret-right {
    font-size: 20px;
    /* 调整字体大小来增大图标 */

}
</style>