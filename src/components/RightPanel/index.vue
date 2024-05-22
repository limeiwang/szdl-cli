<template>
  <div class="right-panel">
    <map-panel title="人员分析" :width="200" :height="200" :zIndex="100" class="map-panel-top">
      <a-row>
        <a-col :span="12" class="left">
          <div class="number">1362</div>
          <div class="text">常驻人口数量</div>
        </a-col>
        <a-col :span="12" class="right">
          <div class="number">794</div>
          <div class="text">活动人口数量</div>
        </a-col>
      </a-row>
    </map-panel>
    <map-panel title="水电趋势" :width="200" :height="200" :zIndex="100" class="map-panel-center">
      <echarts-chart :options="echartOptions1"/>
    </map-panel>
    <map-panel title="设备耗电占比" :width="200" :height="200" :zIndex="100" class="map-panel-bottom">
      <echarts-chart :options="echartOptions2"/>
    </map-panel>
  </div>
</template>

<script setup>
import MapPanel from '@/components/MapPanel.vue';
import EchartsChart from '@/components/EchartsChart.vue';
import * as echarts from 'echarts'

const echartOptions1 = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: 'cross'
    }
  },
  grid: {
    right: '8%',
    bottom: '8%',
    left: '8%',
    //  图表位置紧贴画布边缘是否显示刻度以及label文字 防止坐标轴标签溢出跟grid 区域有关系
    containLabel: true,
    // 是否显示直角坐标系网格
    show: false
  },
  xAxis: {
    type: 'category',
    data: ['01', '02', '03', '04', '05', '06', '07'],
    axisLabel: {
      color: 'rgba(255, 255, 255, 0.72)'
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false, // 显示 x 轴线
    },
    splitLine: {
      show: true,
      interval: 'auto',
      lineStyle: {
          color: ['rgba(255, 255, 255, 0.25)']
      }
    },
  },
  yAxis: [
    {
        type: 'value',
        name: '水量（m³）',
        min: 0,
        max: 300,
        position: 'left',
        axisLine: {
            lineStyle: {
            }
        },
        axisLabel: {
            formatter: '{value}',
            color: 'rgba(255, 255, 255, 0.72)'
        },
        nameTextStyle: {
          fontSize: 12,
          fontWeight: 400,
          color: 'rgba(255, 255, 255, 0.72)'
        },
        splitLine: {
          show: true,
          lineStyle: {
              color: '#91939d',
              type: 'dashed',
          },
        },
        axisTick: {
          // 不显示刻度
          show: false
        },
    },
    {
        type: 'value',
        name: '电量（Kw）',
        min: 0,
        max: 300,
        position: 'right',
        axisLine: {
            lineStyle: {
            }
        },
        axisLabel: {
            formatter: '{value}',
            color: 'rgba(255, 255, 255, 0.72)'
        },
        nameTextStyle: {
          fontSize: 12,
          fontWeight: 400,
          color: 'rgba(255, 255, 255, 0.72)'
        },
        splitLine: {
          show: true,
          lineStyle: {
              color: '#91939d',
              type: 'dashed',
          },
        },
        axisTick: {
          // 不显示刻度
          show: false
        },
    },
  ],
  legend: {
    data: ['今日用水量', '今日用电量'], // 设置图例的数据，这里假设只有一条折线，名称为"销量"
    textStyle: {
      color: 'rgba(255, 255, 255, 0.72)', // 设置图例文字颜色为蓝色
    },
    
    top: '5%', // 设置图例在底部显示
    itemWidth: 18, // 设置图例标记的宽度
    itemHeight: 8, // 设置图例标记的高度
  },
  series: [
    {
      name: '今日用水量', // 设置折线的名称，与图例的数据对应
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
      symbol: 'circle',
      lineStyle: {
        width: 1, // 设置折线的宽度为2像素
        color: 'rgba(0, 170, 255, 1)' // 设置第一个系列线条颜色为红色
      },
      itemStyle: {
        color: 'rgba(0, 170, 255, 1)', // 设置标记点颜色为绿色
        borderColor: 'rgba(0, 170, 255, 1)'
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(0, 170, 255, 0.3)'
          }, {
              offset: 0.8,
              color: 'rgba(0, 170, 255, 0)'
          }], false),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 2
        }
      }
    }, {
      name: '今日用电量', // 设置折线的名称，与图例的数据对应
      data: [15, 20, 24, 21, 35, 14, 26],
      type: 'line',
      symbol: 'circle',
      lineStyle: {
        width: 1, // 设置折线的宽度为2像素
        color: 'rgba(134, 255, 77, 1)', // 设置第一个系列线条颜色为红色
      },
      itemStyle: {
        color: 'rgba(134, 255, 77, 1)', // 设置标记点颜色为绿色
        borderColor: 'rgba(134, 255, 77, 1)'
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(134, 255, 77, 0.3)'
          }, {
              offset: 0.8,
              color: 'rgba(134, 255, 77, 0)'
          }], false),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 2
        }
      }
    }
  ]
};
const echartOptions2 = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    right: "30",
    bottom: "30",
    orient: "vertical",
    itemWidth: 14,
    itemHeight: 6,
    textStyle: {
      color: "#fff",
    },
  },
  color: ["#27F85D", "#72FFFF", "#19D6FF", "#FFF04D", "#FFB54C"],
  series: [
    {
      name: "人员分析",
      type: "pie",
      center: ["40%", "50%"],
      radius: ["22%", "40%"], //真实数据的radius，这里的30%代表内圆，60%代表外圆，如果阴影中的radius设置为小于等于30%，代表为内阴影，大于60%代表为外阴影。
      avoidLabelOverlap: true, //是否启用防止标签重叠策略
      showEmptyCircle: true, //是否在无数据的时候显示一个占位圆
      label: {
        normal: {
          formatter: '{d}%\n{b}', // 自定义显示格式(b:name, c:value, d:百分比)
          textStyle: {
            fontSize: 12,
            lineHeight: 16,
            color: "#ffffff",
            fontWeight: "normal",
          },
        },
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 12,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: true,
        normal: {
          length: 30, // 指示线长度
        },
      },
      data: [
        { value: 1225, name: '照明' },
        { value: 3678, name: '空调' },
        { value: 2896, name: '热水器' },
        { value: 2252, name: '电梯' },
        { value: 1018, name: '其他' }
      ],
    },
    {
      name: "外边框",
      type: "pie",
      tooltip: {
        show: false,
      },
      clockWise: false, //顺时加载
      hoverAnimation: false, //鼠标移入变大
      center: ["40%", "50%"], //这里跟上面那组一样即可
      radius: ["46%", "46%"], //这里根据自己的需要自行调整，但是两个值要一样大哦，如果小于上方设置的最小内圆30%则为内阴影，大于外圆60%则为外阴影
      label: {
        normal: {
          show: false, //重点：此处主要是为了不展示data中的value和name
        },
      },
      data: [
        {
          value: 1, //此处的值无所谓是多少
          name: "", //因为不展示label，可不填
          itemStyle: {
            //边框样式，此处我们设置的浅蓝色，颜色可自行修改
            normal: {
              borderWidth: 20, //边框宽度
              borderColor: "rgba(94, 183, 249,  0.13)", //边框颜色
            },
          },
        },
      ],
    },
  ],
};

</script>

<style lang="less">
/* 可以在这里定义左侧面板独有的样式 */
.right-panel {
  background: linear-gradient(-90.2deg, rgba(9, 34, 79, 0.88) 0.28%, rgba(9, 34, 79, 0.7) 34.53%, rgba(9, 34, 79, 0.6) 75.53%, rgba(9, 34, 79, 0) 99.92%);
  .map-panel-top .map-panel-content {
    height: 260px;
    .ant-row {
      height: 100%;
    }
    .ant-col {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .text {
      margin-top: 15px;
      font-family: Noto Sans SC;
      font-size: 14px;
      font-weight: 500;
      line-height: 22px;
      text-align: center;
    }
    .number {
      width: 150px;
      height: 115px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Digital Numbers;
      font-size: 20px;
      font-weight: 400;
      line-height: 36px;
    }
    .left {
      color: #01FFFF;
      .number {
        background: url("@/assets/image/card-body-person-left-bg.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .right {
      color: #3DF5B6;
      .number {
        background: url("@/assets/image/card-body-person-right-bg.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .map-panel-center .map-panel-content {
    width: 420px;
    height: 260px;
  }
  .map-panel-bottom .map-panel-content {
    width: 420px;
    height: 260px;
  }
}

</style>