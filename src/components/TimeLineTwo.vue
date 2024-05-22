<template>
  <div id="TimelineTwo" style="width: 56.458vw; height: 100%"></div>
</template>

<script>
import store from '@/store'
import * as echarts from 'echarts'
import nowSize from '../utils/EchartsFontSize'
export default {
  data () {
    return {
      numCue: 0,
      timeData: [],
      dataArray: [],
      hour: 0,
      minter: '00',
      LabelTime: null
    }
  },
  props: {
    imgstart: {
      type: Boolean
    },
    flowStatisticsData: String,
    videoNowImg: { type: Number },
    leftImg: { type: Number },
    rightImg: { type: Number }
  },
  watch: {
    imgstart: {
      handler () {
        if (this.imgstart) {
          this.mss(this.timeData, this.imgstart, 0, this.dataArray)
        } else {
          this.mss(this.timeData, this.imgstart, 60, this.dataArray)
          store.commit('changeClickTime', this.timeData[this.timeData.length - 1])
        }
      }
    },
    leftImg: {
      handler () {
        console.log(this.leftImg)
      }
    },
    rightImg: {
      handler () {
        console.log(this.rightImg)
      }
    },
    videoNowImg: {
      handler () {
        if (this.videoNowImg === 1) {
          this.$emit('changeImgstart')
          // this.mss(this.timeData, this.imgstart, 60, this.dataArray)
          // clearInterval(this.LabelTime)
        }
      }
    },
    flowStatisticsData: {
      async handler () {
        this.numCue = 0
        this.timeData = []
        this.dataArray = []
        this.hour = 0
        this.minter = '00'
        await this.getTimeList()
        this.mss(this.timeData, this.imgstart, 60, this.dataArray)
      }
    }
  },
  created () {},
  async mounted () {
    await this.getTimeList()
    this.mss(this.timeData, this.imgstart, 60, this.dataArray)
    store.commit('changeClickTime', this.timeData[this.timeData.length - 1])
  },
  methods: {
    // 获取时间轴时间
    getTimeList () {
      this.hh = new Date().getHours()
      this.mf =
      new Date().getMinutes() < 10
        ? '0' + new Date().getMinutes()
        : new Date().getMinutes()
      const nowTime = ((this.hh * 60 * 60 + this.mf * 60) / 600)
      // console.log(Math.floor(nowTime) % 6)
      if (this.mf < 10) {
        for (let i = 0; i < Math.floor(nowTime) / 6 + 1; i++) {
          this.minter = '00'
          if (this.hour < 10) {
            for (let j = 0; j < 6; j++) {
              this.timeData.push(`0${this.hour}:${this.minter}`)
              this.dataArray.push(0)
              this.minter = parseInt(this.minter) + 10
            }
            this.hour = this.hour + 1
          } else if (this.hour >= 10) {
            for (let j = 0; j < 6; j++) {
              this.timeData.push(`${this.hour}:${this.minter}`)
              this.dataArray.push(0)
              this.minter = parseInt(this.minter) + 10
            }
            this.hour++
          }
        }
      } else {
        for (let i = 0; i < Math.floor(nowTime) / 6; i++) {
          this.minter = '00'
          if (this.hour < 10) {
            for (let j = 0; j < 6; j++) {
              this.timeData.push(`0${this.hour}:${this.minter}`)
              this.dataArray.push(0)
              this.minter = parseInt(this.minter) + 10
            }
            this.hour = this.hour + 1
          } else if (this.hour >= 10) {
            for (let j = 0; j < 6; j++) {
              this.timeData.push(`${this.hour}:${this.minter}`)
              this.dataArray.push(0)
              this.minter = parseInt(this.minter) + 10
            }
            this.hour++
          }
        }
      }

      for (let i = 0; i < 6 - Math.floor(nowTime) % 6; i++) {
        this.dataArray.pop()
        this.timeData.pop()
      }

      // console.log(this.timeData)
    },
    mss (timeData, imgstart, QPNumber, dataData) {
      const myChart = echarts.init(document.getElementById('TimelineTwo'))
      const timeArray = timeData // 时间
      const dataArray = dataData// data

      let time = ''
      time = this.timeData[this.timeData.length - 1]
      const option = {
        grid: {
          top: '40%',
          left: '10',
          right: '20'
        },
        dataZoom: {
          type: 'inside',
          start: QPNumber,
          end: 100
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              show: false,
              lineStyle: {
                color: 'rgba(2,194,255,0.2)'
              }
            },
            axisLabel: {
              color: function (value, index) {
                // console.log(value, index)
                return value === time ? '#FFB54C' : '#99CCFF'
              },
              fontSize: nowSize(14),
              clickable: true,
              showMaxLabel: true //
            },
            triggerEvent: {
              // 组件类型，xAxis, yAxis, radiusAxis, angleAxis
              // 对应组件类型都会有一个属性表示组件的 index，例如 xAxis 就是 xAxisIndex
              // componentType: string,
              // 未格式化过的刻度值, 点击刻度标签有效
              value: timeArray,
              // 坐标轴名称, 点击坐标轴名称有效
              name: timeArray
            },
            axisTick: { show: false },
            // eslint-disable-next-line no-dupe-keys
            axisLine: {
              onZero: false
            },
            data: timeArray
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
          }
        ],

        series: [
          {
            type: 'line',
            symbol: 'circle',
            symbolSize: nowSize(6),
            lineStyle: {
              opacity: 0
            },
            itemStyle: {
              color: '#C2F5FF'
              // clickable: true //
            },
            emphasis: {
              itemStyle: {
                color: '#00ffff'
              }
            },
            data: dataArray
          }
        ]
      }
      // myChart.resize()
      // 点击x轴线
      myChart.getZr().on('click', (params) => {
        const pointInPixel = [params.offsetX, params.offsetY]
        if (myChart.containPixel('grid', pointInPixel)) {
          // const xIndex = myChart.convertFromPixel({ seriesIndex: 0 }, [
          //   params.offsetX,
          //   params.offsetY
          // ])[0]
          // time = option.xAxis[0].data[xIndex]
          myChart.resize()
          // console.log(time)
        }
      })
      window.addEventListener('resize', function () {
        myChart.resize()
      })
      myChart.setOption(option)
      const app = {
        currentIndex: -1
      }
      let timestamp = -28800
      if (!imgstart) {
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0
        })
        this.numCue = option.series[0].data.length - 1
        // myChart.dispatchAction({
        //   type: 'highlight',
        //   seriesIndex: 0,
        //   dataIndex: this.numCue
        // })
        clearInterval(this.LabelTime)
      } else {
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: option.series[0].data.length - 1
        })

        time = ''
        myChart.resize()
        this.LabelTime = setInterval(function () {
          const dataLen = option.series[0].data.length - 1
          // 取消之前高亮的图形
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          app.currentIndex = (app.currentIndex + 1) % dataLen
          // console.log(app.currentIndex);
          // 高亮当前图形
          this.numCue = app.currentIndex
          myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          timestamp = timestamp + 600
          store.commit('changeClickTime', formatDate(timestamp))
        }, 1000)
      }
      // 点击x轴坐标
      myChart.on('click', 'xAxis.category', function (params, node) {
        if (imgstart === false) {
          // myChart.dispatchAction({
          //   type: 'downplay',
          //   seriesIndex: 0,
          //   dataIndex: this.numCue
          // })
          // this.numCue = params.dataIndex
          // myChart.dispatchAction({
          //   type: 'highlight',
          //   seriesIndex: 0,
          //   dataIndex: this.numCue
          // })
          time = params.value
          // console.log(params)
          store.commit('changeClickTime', time)
          store.commit('changeVideoStatu', 'history')
          myChart.resize()
        }
      })
      const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000)
        let h = date.getHours()
        h = h < 10 ? '0' + h : h
        let m = date.getMinutes()
        m = m < 10 ? '0' + m : m
        // let s = date.getSeconds()
        // s = s < 10 ? '0' + s : s
        return h + ':' + m // 多种时间格式的拼接
      // return y + '-' + MM + '-' + d
      }
    },
    formatDate (value) {
      const date = new Date(value * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      // const y = date.getFullYear()
      // let MM = date.getMonth() + 1
      // MM = MM < 10 ? ('0' + MM) : MM
      // let d = date.getDate()
      // d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? '0' + h : h
      let m = date.getMinutes()
      m = m < 10 ? '0' + m : m
      let s = date.getSeconds()
      s = s < 10 ? '0' + s : s
      return h + ':' + m + ':' + s // 多种时间格式的拼接
      // return y + '-' + MM + '-' + d
    }
  }
}
</script>

<style lang="less" scoped>
</style>
