<template>
  <header class="header">
    <!-- <v-mini-weather class="weather">
      <template #default="{weather, icon}">
        <v-mini-weather-icon :icon="icon"></v-mini-weather-icon>
        <span>{{ weather }}</span>
        <span>{{weather.weather}}/{{weather.temp}}</span>
      </template>
    </v-mini-weather> -->
    <h1 class="title">{{ props.title }}</h1>
    <div class="weather-select" @click="() => open = true">
      <!-- <span>天气切换</span> -->
      <span>{{ selectValue }}</span>
      <img src="../assets/image/weather-select-arrow.png" alt="">
    </div>
    <div class="time">
      <div>{{ currentData }}</div>
      <div>{{ currentTime }}</div>
    </div>
  </header>

  <a-modal v-model:open="open" title="天气切换" style="top: 35%" wrapClassName="weather-modal" @ok="handleOk" :footer="null" :mask="false">
    <a-space style="margin: 0 auto;">
      <a-button type="primary" class="weather-modal-btn" @click="handleClick('白天')">白天</a-button>
      <a-button type="primary" class="weather-modal-btn" @click="handleClick('黄昏')">黄昏</a-button>
      <a-button type="primary" class="weather-modal-btn" @click="handleClick('夜晚')">夜晚</a-button>
    </a-space>

    <a-row :gutter="16" class="weather-modal-body mt-5">
      <a-col class="gutter-row" v-for="item in weatherList" :key="item.name" :class="{'active': selectValue === item.name}" :span="6" @click="handleClick(item.name)">
        <img class="img" :src="item.icon" alt="">
        <div class="text">{{ item.name }}</div>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script setup>
import moment from 'moment';
// import { vMiniWeather, vMiniWeatherIcon } from 'vue3-mini-weather'
// import buttonImg1 from '@/assets/image/button-bg-1.png';

import sunnyImg from '@/assets/image/weather-sunny.png';
import cloudyImg from '@/assets/image/weather-cloudy.png';
import rainyImg from '@/assets/image/weather-rain.png';
import snowImg from '@/assets/image/weather-snow.png';

const currentData = ref(null)
const currentTime = ref(null)
const open = ref(false);
const selectValue = ref('晴天')

const weatherList = reactive([
  {
    name: '晴天',
    icon: sunnyImg
  },
  {
    name: '阴天',
    icon: cloudyImg
  },
  {
    name: '暴雨',
    icon: rainyImg
  },
  {
    name: '大雪',
    icon: snowImg
  }
])


// 使用 defineProps 定义 props，并指定类型和默认值
const props = defineProps({
  title: {
    type: String,
    default: '智慧社区综合管理平台'
  },
})

const emits = defineEmits(['update', 'sendMessage'])

const updateTime = () => {
  currentData.value = moment().format('YYYY-MM-DD');
  currentTime.value = moment().format('HH:mm:ss');
}

const handleClick = (value) => {
  selectValue.value = value
  console.log(value, 'v');
  const mapping = [{
    name: '白天',
    message: { "Command":"SetSunlight", "Args":{ "Time":"1000" } }
  }, {
    name: '黄昏',
    message: { "Command":"SetSunlight", "Args":{ "Time":"1730" } }
  }, {
    name: '夜晚',
    message: { "Command":"SetSunlight", "Args":{ "Time":"2150" } }
  }, {
    name: '晴天',
    message: {
    "Command":"SetWeather",
    "Args":{
        "Type":"晴天"
    }
}
  }, {
    name: '阴天',
    message: {
    "Command":"SetWeather",
    "Args":{
        "Type":"阴天"
    }
}
  }, {
    name: '暴雨',
    message: {
    "Command":"SetWeather",
    "Args":{
        "Type":"暴雨"
    }
}
  }, {
    name: '大雪',
    message: {
    "Command":"SetWeather",
    "Args":{
        "Type":"大雪"
    }
}
  }]
  console.log(mapping.map(item => item.name === value));

  const message = JSON.stringify(mapping.find(item => item.name === value).message)
  emits('sendMessage', message)
  handleOk()
}

const handleOk = (e) => {
  open.value = false;
}

onMounted(() => {
  setInterval(updateTime, 1000); // 每秒更新一次时间
})
</script>

<style lang="less">
.header {
  width: 100%;
  height: 84px;
  background: url("@/assets/image/header-bg.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    color: #fff; /* 文字颜色 */
    font-family: YouSheBiaoTiHei;
    font-size: 46px;
    font-weight: 400;
    line-height: 58px;
    letter-spacing: 4px;
    text-align: center;
    margin: 0;
  }

  .time {
    position: absolute;
    right: 20px;
    top: 15px;
    color: #fff;
    height: 34px;
    font-size: 12px;
    font-weight: 600;
    text-align: center;
  }

  .weather {
    position: absolute;
    left: 20px;
    top: 15px;
    .v-mini-weather-icon {
      width: 40px;
      height: 40px;
    }
  }

  .weather-select {
    width: 104px;
    height: 28px;
    border-radius: 4px;
    border: 1px solid #A0D9FA80;
    background: rgba(2, 114, 247, 0.25);
    position: absolute;
    right: 126px;
    top: 21px;
    font-size: 14px;
    color: #26FCFF;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img {
      height: 28px;
      margin: 0;
    }
  }
}
.weather-modal {
  .ant-modal {
    width: 410px !important;
    height: 208px !important;
  }
  .ant-modal-content {
    background: linear-gradient(154.5deg, rgba(14, 54, 106, 0.92) 12.58%, rgba(39, 112, 199, 0.92) 86.14%);
    padding: 0;
    border-radius: 0;
    .ant-modal-close {
      color: #fff;
      top: 10px !important;
    }
    .ant-modal-header {
      height: 38px;
      display: flex;
      align-items: center;
      background: rgba(2, 114, 247, 0.6);
      margin-bottom: 0;
      border-radius: 0;
      .ant-modal-title {
        color: #fff;
        font-size: 18px;
        margin-left: 12px;
        font-weight: 400;
        margin-top: 5px;
      }
    }
    .ant-modal-body {
      padding: 24px 30px 45px;
      display: flex;
      flex-direction: column;
    }
  }
  .weather-modal-body {
    text-align: center;
    .gutter-row {
      padding: 8px 0;
      &.active {
        background-image: url('../assets/image/weather-active.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .img {
      width: 50px;
      height: 50px;
    }
    .text {
      color: #fff;
      margin-top: 15px;
    }
  }
}
</style>