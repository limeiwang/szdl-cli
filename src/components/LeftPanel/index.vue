<template>
  <div class="left-panel">
    <map-panel title="社区概况" :width="200" :height="200" :zIndex="100" class="map-panel-top">
      <a-row class="trend-box">
        <a-col :span="8">
          <div class="card-body-icon"></div>
          <div class="card-body-main">
            <span>楼栋总数(栋)</span>
            <div>
              <span class="number">12</span>
            </div>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="card-body-icon"></div>
          <div class="card-body-main">
            <span>房屋总数(套)</span>
            <div>
              <span class="number">896</span>
            </div>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="card-body-icon"></div>
          <div class="card-body-main">
            <span>住房房屋(套)</span>
            <div>
              <span class="number">696</span>
            </div>
          </div>
        </a-col>
      </a-row>
      <a-row class="trend-box">
        <a-col :span="8">
          <div class="card-body-icon"></div>
          <div class="card-body-main">
            <span>商用房屋(套)</span>
            <div>
              <span class="number">200</span>
            </div>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="card-body-icon"></div>
          <div class="card-body-main">
            <span>人口总数(人)</span>
            <div>
              <span class="number">2156</span>
            </div>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="card-body-icon"></div>
          <div class="card-body-main">
            <span>智能设备(个)</span>
            <div>
              <span class="number">32</span>
            </div>
          </div>
        </a-col>
      </a-row>
      <a-row class="trend-box">
        <a-col :span="8">
          <div class="card-body-icon"></div>
          <div class="card-body-main">
            <span>停车场(个)</span>
            <div>
              <span class="number">2</span>
            </div>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="card-body-icon"></div>
          <div class="card-body-main">
            <span>车位总数(个)</span>
            <div>
              <span class="number">400</span>
            </div>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="card-body-icon"></div>
          <div class="card-body-main">
            <span>今日告警(个)</span>
            <div>
              <span class="number">1</span>
            </div>
          </div>
        </a-col>
      </a-row>
    </map-panel>
    <map-panel title="出入记录" :width="200" :height="200" :zIndex="100" class="map-panel-center">
      <a-row class="history-box">
        <a-col :span="24" v-for="(item, index) in historyList" :key="index">
          <div class="history-box-img">
            <img :src="item.src" alt="">
          </div>
          <div class="history-box-bg">
            <span class="name">{{ item.name }}</span>
            <span class="time">{{ item.time }}</span>
          </div>
        </a-col>
      </a-row>
    </map-panel>
    <map-panel title="人员预警" :width="200" :height="200" :zIndex="100" class="map-panel-bottom">
      <div class="table_body">
        <div class="table_th">
          <div class="tr1 th_style">序号</div>
          <div class="tr2 th_style">地点</div>
          <div class="tr3 th_style">预警</div>
          <div class="tr4 th_style">时间</div>
        </div>
        <div class="virtual-list">
          <div v-for="(item, index) in personnelList" :key="index" class="list-item" style="display: flex;">
            <div class="tr1 tr">{{ index + 1 }}</div>
            <div class="tr2 tr" :title="item.location">{{ item.location }}</div>
            <div class="tr3 tr">{{ item.warning }}</div>
            <div class="tr4 tr">{{ item.time }}</div>
          </div>
        </div>
      </div>
    </map-panel>
  </div>
</template>

<script setup>
import MapPanel from '@/components/MapPanel.vue';
import historyImg from '../../assets/image/facepic.jpg'

const historyList = reactive([{
  src: historyImg,
  time: '2024-05-10 07:21:36',
  name: '李四-幸福小区南入口',
}, {
  src: historyImg,
  time: '2024-05-10 07:32:15',
  name: '张三-幸福小区北入口',
}, {
  src: historyImg,
  time: '2024-05-10 08:16:37',
  name: '王二力-幸福小区北入口',
}, {
  src: historyImg,
  time: '2024-05-10 09:41:47',
  name: '韩一芳-幸福小区南入口',
}, {
  src: historyImg,
  time: '2024-05-10 09:56:28',
  name: '许丽生-幸福小区北入口',
}, {
  src: historyImg,
  time: '2024-05-10 10:05:55',
  name: '王五-幸福小区北入口',
}])

const personnelList = reactive([{
  location: '1号门（南门）',
  warning: '陌生人员',
  time: '06:06:29',
}, {
  location: '2号门（北门）',
  warning: '陌生人员',
  time: '07:55:36',
}, {
  location: '1号门（南门）',
  warning: '陌生人员',
  time: '08:23:47',
}, {
  location: '2号门（北门）',
  warning: '陌生人员',
  time: '08:42:34',
}, {
  location: '2号门（北门）',
  warning: '陌生人员',
  time: '08:47:13',
}, {
  location: '2号门（北门）',
  warning: '陌生人员',
  time: '09:39:18',
}, {
  location: '2号门（北门）',
  warning: '陌生人员',
  time: '09:44:36',
}, {
  location: '1号门（南门）',
  warning: '陌生人员',
  time: '10:08:12',
}, {
  location: '1号门（南门）',
  warning: '陌生人员',
  time: '10:27:02',
}, {
  location: '2号门（北门）',
  warning: '陌生人员',
  time: '10:52:37',
}, {
  location: '1号门（南门）',
  warning: '陌生人员',
  time: '11:15:26',
}, {
  location: '1号门（南门）',
  warning: '陌生人员',
  time: '11:32:47',
}, {
  location: '2号门（北门）',
  warning: '陌生人员',
  time: '11:55:29',
}])
</script>

<style lang="less">
/* 可以在这里定义左侧面板独有的样式 */
.left-panel {
  background: linear-gradient(90.2deg, rgba(9, 34, 79, 0.88) 0.28%, rgba(9, 34, 79, 0.7) 34.53%, rgba(9, 34, 79, 0.6) 75.53%, rgba(9, 34, 79, 0) 99.92%);
  .map-panel-top .map-panel-content {
    height: 260px;
    overflow: hidden;
  }
  .trend-box {
    margin: 20px 10px;
    .ant-col {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card-body-icon {
      width: 50px;
      height: 52px;
      background: url('@/assets/image/card-body-icon.png') no-repeat;
      background-size: 100% 100%;
      margin-right: 12px;
    }
    .card-body-main {
      display: flex;
      flex-direction: column;
      color: #fff;
      font-family: Noto Sans SC;
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;
      margin-top: 5px;
      .number {
        font-family: DINPro;
        font-size: 24px;
        font-weight: 500;
        line-height: 32px;
        color: #78F2FF;
      }
    }
  }

  .map-panel-center .map-panel-content {
    height: 260px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .history-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 15px;
    .ant-col {
      display: flex;
      margin-bottom: 10px;
      &:last-child {
        margin: 0;
      }
    }
    .history-box-img {
      width: 106px;
      height: 51px;
      margin-right: 15px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .history-box-bg {
      flex: 1;
      box-sizing: border-box;
      background: url('@/assets/image/card-body-history-bg.png') no-repeat;
      background-size: 100% 100%;
      padding: 0 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      span {
        font-family: Alibaba PuHuiTi 2.0;
        font-size: 16px;
        font-weight: 400;
        line-height: 18px;
        text-align: left;
        color: #fff;
        opacity: 0.8;
        &.time {
          font-family: PingFang SC;
          font-size: 14px;
          font-weight: 400;
          line-height: 24px;
          text-align: left;
          opacity: 0.8;
        }
      }
    }
  }

  .map-panel-bottom .map-panel-content {
    height: 260px;
    overflow: hidden;
    display: flex;
    justify-content: center;

    .table_body {
      width: 100%;
      margin-top: 10px;
    }
    .table_th {
      display: flex;
      height: 32px;
      line-height: 32px;
      padding: 0 30px;

    }
    .tr {
      padding: 8px 2px;
      font-size: 12px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      text-align: center;
      color: #fff;
    }
    .tr1 {
      width: 60px;
      text-align: center;
    }
    .tr2 {
      flex: 1;
      text-align: center;
    }
    .tr3 {
      flex: 1;
      text-align: center;
    }
    .tr4 {
      flex: 1;
      text-align: center;
    }

    .th_style {
      font-weight: bold;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      box-sizing: border-box;
      padding: 0 5px;
      color: #01FFFF;
    }
    .table_tr {
      display: flex;
      color: #eee;
      font-size: 14px;
      border-bottom: 1px solid rgba(188, 243, 255, 0.2);
    }

    .virtual-list {
      overflow: auto;
      height: calc(260px - 10px - 32px);
      padding: 0 30px;
    }
  }
}

</style>