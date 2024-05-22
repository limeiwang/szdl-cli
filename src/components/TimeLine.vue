<template>
  <div @click="changeTime($event)" class="timelinebox">
    <div class="videoNow">
      <img class="videoNowImg" :src="videoNowsrc" alt="" />
    </div>
    <div class="start">
      <img class="startImg" :src="startImgsrc" alt="" />
    </div>
    <div class="left">
      <img class="leftImg" src="@/assets/image/箭头-左@2x.png" alt="" />
    </div>
    <TimelineTwo
      :flowStatisticsData="flowStatisticsData"
      :imgstart="imgstart"
      :videoNowImg="videoNowImg"
      :leftImg="leftImg"
      :rightImg="rightImg"
      @changeImgstart="changeImgstart"
    ></TimelineTwo>
    <div class="right">
      <img class="rightImg" src="@/assets/image/箭头-右@2x.png" alt="" />
    </div>
  </div>
</template>

<script>
import store from '@/store'
import TimelineTwo from './TimeLineTwo.vue'

import videoNow from '@/assets/image/实时视频@2x.png'
import startImg from '@/assets/image/开始@2x.png'
import endImg from '@/assets/image/暂停@2x (1).png'

export default {
  props: {
    index: {},
    flowStatisticsData: String
  },
  watch: {

    '$store.state.clickTime': {
      handler () {
        this.videoNowImg = 0
      }
    }
  },
  data () {
    return {
      dateTime: 0,
      videoNowImg: 0,
      num: 0,
      videoNowsrc: videoNow,
      startImgsrc: startImg,
      imgstart: false,
      timer: null,
      currentdate: this.getTime(),
      leftImg: 0,
      rightImg: 0

    }
  },
  async mounted () {
  },
  methods: {
    changeImgstart () {
      this.startImgsrc = startImg
      this.imgstart = false
    },
    getTime () {
      const date = new Date()
      const hh = date.getHours()
      const mf =
        date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      const ss =
        date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      const currentdate = (hh * 60 * 60 + mf * 60 + ss) / 86400
      return currentdate
    },
    changeTime (e) {
      // console.log(e.target.classList)
      if (e.target.classList.contains('startImg')) {
        // 开始结束
        if (!this.imgstart) {
          this.startImgsrc = endImg
          this.imgstart = true
        } else {
          this.startImgsrc = startImg
          this.imgstart = false
        }
      } else if (e.target.classList.contains('leftImg')) {
        if (this.imgstart === false) {
          this.leftImg++
        }
      } else if (e.target.classList.contains('rightImg')) {
        if (this.imgstart === false) {
          this.rightImg++
        }
      } else if (e.target.classList.contains('videoNowImg')) {
        store.commit('changeVideoStatu', 'realTime')
        this.videoNowImg = 1
        this.rightImg = 0
      }
    },
    getNowTime () {
      const date = new Date(new Date() - this.num)
      const hh = date.getHours()
      const mf =
        date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      const ss =
        date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      const currentdate = hh + ':' + mf + ':' + ss
      this.dateTime = Date.parse(date)
      return currentdate
    }
  },
  components: { TimelineTwo }
}
</script>

<style lang="less" scoped>
.timelinebox {
  pointer-events: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  .start {
    pointer-events: auto;
    width: 1.979vw;
    height: 1.979vw;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .videoNow {
    pointer-events: auto;
    cursor: pointer;
    width: 1.979vw;
    height: 1.354vw;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .left {
    pointer-events: auto;
    width: 1.042vw;
    height: 1.823vw;
    // cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    pointer-events: auto;
    width: 1.042vw;
    height: 1.823vw;
    // cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .center {
  }
}
</style>
