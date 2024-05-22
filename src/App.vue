<template>
  <Header @sendMessage="onMessage"/>

  <div class="mapbg"></div>
  <!-- <iframe ref="iframeRef" class="mapbg" width="100%" height="100%" border="0" src="http://10.3.5.192:81/" frameborder="0"></iframe> -->

  <transition name="fade">
    <LeftPanel  v-if="isShowLeftPanel" class="left panel"/>
  </transition>

  <MiddlePanel class="middle" @sendMessage="onMessage" @changePanle="onIsShowPanle" @clear="handleClear"/>

  <transition name="fade">
    <RightPanel v-if="isShowRightPanel" class="right panel"/>
  </transition>

    <!-- 底部时间轴 -->
  <div class="center-footer">
    <div class="timeline">
      <time-line :flowStatisticsData="flowStatisticsData"></time-line>
    </div>
  </div>

  <!-- 住户详情 -->
  <a-modal v-model:open="open1" title="住户详情" centered @ok="open1 = false" :footer="null" :mask="false" wrapClassName="modal-detail modal-bg" />
  <!-- 能耗分析 -->
  <a-modal v-model:open="open2" title="能耗分析" centered @ok="open2 = false" :footer="null" :mask="false" wrapClassName="modal-data modal-bg" />
  <!-- 视频 -->
  <a-modal v-model:open="open3" title="监控视频" centered @ok="open3 = false" :footer="null" :mask="false" wrapClassName="modal-video modal-bg">
    <video :src="videoSrc" autoplay class="video"></video>
  </a-modal>
</template>

<script setup>
import Header from '@/components/Header.vue';
import LeftPanel from '@/components/LeftPanel/index.vue';
import MiddlePanel from '@/components/MiddlePanel/index.vue';
import RightPanel from '@/components/RightPanel/index.vue';
import videoSrc from '@/assets/video/video.mp4';
import TimeLine from '@/components/TimeLine.vue';

const iframeRef = ref(null);
const open1 = ref(false);
const open2 = ref(false);
const open3 = ref(false);
const isShowLeftPanel = ref(true);
const isShowRightPanel = ref(true);

const flowStatisticsData = ref('')

onMounted(() => {
  console.log('onMounted');
  window.addEventListener('message', e=> {
    if (e.data.Command === "OnClickPOI") {
      handleMarker(e.data)
    }
	});
})

const handleMarker = (data) => {
  const str = data.Args.ID
  // 住户详情
  if (str.includes("ZH")) {
    open1.value = true
  }
  // 能效分析
  else if (str.includes("NX")) {
    open2.value = true
  }
  // 监控视频
  else {
    open3.value = true
  }
}


const handleClear = () => {
  const message = { "Command":"ClearAllRaster" };
  onMessage(message)
}


const onIsShowPanle = (bool) => {
  isShowRightPanel.value = bool
}

const onMessage = (message) => {
  const iframe = iframeRef.value;
  iframe.contentWindow.postMessage(message, '*')
}
</script>

<style lang="less">
html, body {
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: calc(100% - 80px);
  position: relative;
  padding-top: 80px;
  overflow: hidden;
}

.mapbg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("./assets/image/mapbg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}


.panel {
  position: absolute;
  top: 0;
  height: calc(100vh - 100px);
  &.left {
    padding-top: 100px;
    padding-left: 20px;
    overflow: hidden;
    left: 0;
  }
  &.right {
    padding-top: 100px;
    padding-right: 20px;
    overflow: hidden;
    right: 0;
  }
}

.middle {
  position: absolute;
  top: 773px;
  left: 472px;
}

.modal-detail {
  .ant-modal {
    width: 887px !important;
    height: 317px;
  }
  .ant-modal-content {
    width: 887px;
    height: 317px;
    background: url('@/assets/image/dialog-bg-2.png') no-repeat;
    background-size: 100% 100%;
    border-radius: 0;
    .ant-modal-header {
      display: none;
    }
    .ant-modal-close {
      right: 30px;
      top: 8px !important;
      opacity: 0;
    }
  }
}

.modal-data {
  .ant-modal {
    width: 340px !important;
    height: 270px;
  }
  .ant-modal-content {
    width: 340px;
    height: 270px;
    background: url('@/assets/image/dialog-bg-1.png') no-repeat;
    background-size: 100% 100%;
    border-radius: 0;
    .ant-modal-header {
      display: none;
    }
    .ant-modal-close {
      right: 20px;
      top: 10px !important;
      opacity: 0;
    }
  }
}

.modal-video {
  .ant-modal-content {
    background: url('@/assets/image/dialog-bg.png') no-repeat;
    background-size: 100% 100%;
    border-radius: 0;
    .ant-modal-close {
      color: #fff;
    }
    .ant-modal-header {
      background: none;
      .ant-modal-title {
        color: #fff;
      }
    }
  }

  .video {
    width: 100%;
  }
}

.center-footer {
  pointer-events: auto;
  width: 1000px;
  height: 72px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  .timeline {
    width: 100%;
    height: 100%;
    text-align: center;
  }
}


.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
