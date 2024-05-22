<template>
  <div class="middle-panel">
    <a-space direction="vertical" class="space-box">
      <div type="primary" class="img-item" v-for="item in eventList" @click="handleShowCard(item)">
        <img :src="item.img" alt="">
      </div>

      <!-- 效果显隐弹窗 -->
      <div v-if="showCard1" class="little-card">
        <div class="card-item">
          <div v-for="item in cardList1" @click="handleCheckBox(item)" :key="item.id" class="firstMain">
            <img :src="item.isCheck ? selectedImg : unselectedImg" alt="" />
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>

      <!-- 效果显隐弹窗 -->
      <div v-if="showCard2" class="little-card top10">
        <div class="card-item">
          <div v-for="item in cardList2" @click="handleCheckBox(item)" :key="item.id" class="firstMain">
            <img :src="item.isCheck ? selectedImg : unselectedImg" alt="" />
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>

      <!-- 效果显隐弹窗 -->
      <div v-if="showCard3" class="little-card top20">
        <div class="card-item">
          <div v-for="item in cardList3" @click="handleCheckBox(item)" :key="item.id" class="firstMain">
            <img :src="item.isCheck ? selectedImg : unselectedImg" alt="" />
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </a-space>
  </div>
</template>

<script setup>
import buttonImg1 from '@/assets/image/button-bg-1.png';
import buttonImg2 from '@/assets/image/button-bg-2.png';
import buttonImg3 from '@/assets/image/button-bg-3.png';
import selectedImg from '@/assets/image/小图标icon 选中@2x.png';
import unselectedImg from '@/assets/image/小图标icon 未选中@2x.png';
const emit = defineEmits(['sendMessage', 'changePanle']);

const showCard1 = ref(false)
const showCard2 = ref(false)
const showCard3 = ref(false)
const eventList = reactive([{
  type: 'button',
  name: '人口分析',
  size: 'default',
  disabled: false,
  img: buttonImg1
}, {
  type: 'button',
  name: '社区安防',
  size: 'default',
  disabled: false,
  img: buttonImg2
}, {
  type: 'button',
  name: '能效分析',
  size: 'default',
  disabled: false,
  img: buttonImg3
}]);

const cardList1 = reactive([{
  id: 1,
  name: '人口分布',
  isCheck: false,
  messageList: [{
        "Command": "AddHeatMap",
        "Args": {
          "ID": "",
          "CoordType": 1,
          "Location": "-150000.0,-150000.0,1600.0",
          "Size": "300.0,300.0"
        }
      }, {
        "Command":"UpdateHeatMapCoord",
        "Args": {
            "ID": "",
            "CoordType": 1,
            "Data": [{
                "Location": "-10000,10000,0",
                "Value": "30"
            }, {
                "Location": "15000,5000,0",
                "Value": "22"
            },
            {
                "Location": "6000,15000,0",
                "Value": "25"
            },{
                "Location": "-12000,30000,0",
                "Value": "30"
            },{
                "Location": "35000,10000,0",
                "Value": "30"
            },{
                "Location": "35000,30000,0",
                "Value": "28"
            },{
                "Location": "13000,30000,0",
                "Value": "18"
            }
            
            ]
        }
      }],
  closeList: [{
    "Command":"RemoveHeatMap",
    "Args": {
        "ID": ""
    }
  }]
}, {
  id: 2,
  name: '人口迁徙',
  isCheck: false,
  messageList: [{
        "Command":"SwitchMap",
        "Args":{
            "Type":"2D"
        }
      }, {
        "Command":"AddProvincialMigrationMap",
        "Args":{
            "Show":true
        }
      }, {
        "Command":"AddRegionalAdvantageMap",
        "Args":{
            "Show":true
        }
      }],
  closeList: [{
        "Command":"SwitchMap",
        "Args":{
            "Type":"3D"
        }
      }]
}, {
  id: 3,
  name: '住户详情',
  isCheck: false,
  messageList: [ {
        "Command": "ResetApiScene"
      },{
        "Command":"SplitBuildAlone",
        "Args":{
        "ID":"HZZXBuild",
            "Floor":3
        }
      },{
          "Command":"AddPOI",
          "Args":{
              "ID":"POIidZH",
          "Type":"ZHXQ",
          "CoordType":1,
          "Location":"35000,10000,5000"
          }
      }, {
        "Command":"UpdatePOIStyle",
        "Args":{
          "ID":"POIidZH",
        "State":"Default",
          "PicUrl_Def":"https://z1.wzznft.com/i/2024/05/12/pki630.png",
        "PicUrl_Click":"https://z1.wzznft.com/i/2024/05/12/pki630.png"
        }
      }],
  closeList: [{
        "Command":"RemovePOI",
        "Args":{
            "ID":"POIidZH"
        }
      },{
        "Command":"SplitBuildAlone",
        "Args":{
        "ID":"HZZXBuild",
            "Floor":0
        }
      }
    ]
}]);

const cardList2 = reactive([{
  id: 1,
  name: '安防报警',
  isCheck: false,
  messageList: [
{
    "Command":"AddEffect",
    "Args":{
        "ID":"Effect1",
		"Location":"2000,9000,14000",
		"CoordType":1,
		"Type":"Type1"
    }
},
{
    "Command":"AddEffect",
    "Args":{
        "ID":"Effect2",
		"Location":"14000,2000,14000",
		"CoordType":1,
		"Type":"Type2"
    }
},
{
    "Command":"AddEffect",
    "Args":{
        "ID":"Effect3",
		"Location":"-10000,9000,4000",
		"CoordType":1,
		"Type":"Type3"
    }
},
{
    "Command":"AddEffect",
    "Args":{
        "ID":"Effect4",
		"Location":"-16000,28000,14000",
		"CoordType":1,
		"Type":"Type4"
    }
},
{
    "Command":"AddEffect",
    "Args":{
        "ID":"Effect5",
		"Location":"31000,5000,9000",
		"CoordType":1,
		"Type":"Type5"
    }
},
{
    "Command":"AddEffect",
    "Args":{
        "ID":"Effect6",
		"Location":"38000,4000,17000",
		"CoordType":1,
		"Type":"Type6"
    }
},
{
    "Command":"AddEffect",
    "Args":{
        "ID":"Effect7",
		"Location":"38000,14000,17000",
		"CoordType":1,
		"Type":"Type7"
    }
},
{
    "Command":"AddEffect",
    "Args":{
        "ID":"Effect8",
		"Location":"38000,26000,7000",
		"CoordType":1,
		"Type":"Type1"
    }
},
{
    "Command":"AddEffect",
    "Args":{
        "ID":"Effect9",
		"Location":"35000,32000,7000",
		"CoordType":1,
		"Type":"Type2"
    }
},
{
    "Command":"AddEffect",
    "Args":{
        "ID":"Effect10",
		"Location":"-19000,20000,7000",
		"CoordType":1,
		"Type":"Type3"
    }
}],
  closeList: [{
    "Command":"RemoveAllEffect"
}]
}, {
  id: 2,
  name: '安防监控',
  isCheck: false,
  messageList: [{
    "Command":"AddPOI",
    "Args":{
        "ID":"POIid1",
		"Type":"Video",
		"CoordType":1,
		"Location":"2000,9000,14000"
    }
},
{
    "Command":"AddPOI",
    "Args":{
        "ID":"POIid2",
		"Type":"Video",
		"CoordType":1,
		"Location":"14000,2000,14000"
    }
},
{
    "Command":"AddPOI",
    "Args":{
        "ID":"POIid3",
		"Type":"Video",
		"CoordType":1,
		"Location":"-10000,9000,4000"
    }
},
{
    "Command":"AddPOI",
    "Args":{
        "ID":"POIid4",
		"Type":"Video",
		"CoordType":1,
		"Location":"-16000,28000,14000"
    }
},
{
    "Command":"AddPOI",
    "Args":{
        "ID":"POIid5",
		"Type":"Video",
		"CoordType":1,
		"Location":"31000,5000,9000"
    }
},
{
    "Command":"AddPOI",
    "Args":{
        "ID":"POIid6",
		"Type":"Video",
		"CoordType":1,
		"Location":"38000,4000,17000"
    }
},
{
    "Command":"AddPOI",
    "Args":{
        "ID":"POIid7",
		"Type":"Video",
		"CoordType":1,
		"Location":"38000,14000,17000"
    }
},
{
    "Command":"AddPOI",
    "Args":{
        "ID":"POIid8",
		"Type":"Video",
		"CoordType":1,
		"Location":"38000,26000,7000"
    }
},
{
    "Command":"AddPOI",
    "Args":{
        "ID":"POIid9",
		"Type":"Video",
		"CoordType":1,
		"Location":"35000,32000,7000"
    }
},
{
    "Command":"AddPOI",
    "Args":{
        "ID":"POIid10",
		"Type":"Video",
		"CoordType":1,
		"Location":"-19000,20000,7000"
    }
}],
  closeList: [{
    "Command":"RemovePOI",
    "Args":{
        "ID":"POIid1"
    }
},
{
    "Command":"RemovePOI",
    "Args":{
        "ID":"POIid2"
    }
},
{
    "Command":"RemovePOI",
    "Args":{
        "ID":"POIid3"
    }
},
{
    "Command":"RemovePOI",
    "Args":{
        "ID":"POIid4"
    }
},
{
    "Command":"RemovePOI",
    "Args":{
        "ID":"POIid5"
    }
},
{
    "Command":"RemovePOI",
    "Args":{
        "ID":"POIid6"
    }
},
{
    "Command":"RemovePOI",
    "Args":{
        "ID":"POIid7"
    }
},
{
    "Command":"RemovePOI",
    "Args":{
        "ID":"POIid8"
    }
},
{
    "Command":"RemovePOI",
    "Args":{
        "ID":"POIid9"
    }
},
{
    "Command":"RemovePOI",
    "Args":{
        "ID":"POIid10"
    }
}]
}, {
  id: 3,
  name: '安防巡检',
  isCheck: false,
  messageList: [ {
    "Command":"SetCameraRotate",
    "Args":{
        "State":"Begin"
    }
}],
  closeList: [{
    "Command":"SetCameraRotate",
    "Args":{
        "State":"Stop"
    }
}]
}]);

const cardList3 = reactive([{
  id: 1,
  name: '碳排放分布',
  isCheck: false,
  messageList: [{
    "Command":"AddRaster",
    "Args":{
        "ID":"123",
        "CoordType":1,
        "Location":"0,0,0",
        "Scale":"200,200",
        "Url":"https://img95.699pic.com/xsj/01/kr/m0.jpg%21/fw/700/watermark/url/L3hzai93YXRlcl9kZXRhaWwyLnBuZw/align/southeast"
    }
}],
  closeList: [{
    "Command":"ClearAllRaster"
}]
}, {
  id: 2,
  name: '能效监控',
  isCheck: false,
  messageList: [
{
    "Command":"AddPOI",
    "Args":{
        "ID":"POIidNX1",
		"Type":"NXFX",
		"CoordType":1,
		"Location":"2000,9000,14000"
    }
},
{
    "Command":"UpdatePOIStyle",
    "Args":{
        "ID":"POIidNX1",
	"State":"Default",
        "PicUrl_Def":"https://z1.wzznft.com/i/2024/05/12/pjz4pc.png",
	"PicUrl_Click":"https://z1.wzznft.com/i/2024/05/12/pjz4pc.png"
    }
},
{
    "Command":"AddPOI",
    "Args":{
        "ID":"POIidNX2",
		"Type":"NXFX",
		"CoordType":1,
		"Location":"14000,2000,14000"
    }
},
{
    "Command":"UpdatePOIStyle",
    "Args":{
        "ID":"POIidNX2",
	"State":"Default",
       "PicUrl_Def":"https://z1.wzznft.com/i/2024/05/12/pjz4pc.png",
	"PicUrl_Click":"https://z1.wzznft.com/i/2024/05/12/pjz4pc.png"
    }
},
{
    "Command":"AddPOI",
    "Args":{
        "ID":"POIidNX3",
		"Type":"NXFX",
		"CoordType":1,
		"Location":"-10000,9000,4000"
    }
},
{
    "Command":"UpdatePOIStyle",
    "Args":{
        "ID":"POIidNX3",
	"State":"Default",
       "PicUrl_Def":"https://z1.wzznft.com/i/2024/05/12/pjz4pc.png",
	"PicUrl_Click":"https://z1.wzznft.com/i/2024/05/12/pjz4pc.png"
    }
},
{
    "Command":"AddPOI",
    "Args":{
        "ID":"POIidNX4",
		"Type":"NXFX",
		"CoordType":1,
		"Location":"-16000,28000,14000"
    }
},
{
    "Command":"UpdatePOIStyle",
    "Args":{
        "ID":"POIidNX4",
	"State":"Default",
        "PicUrl_Def":"https://z1.wzznft.com/i/2024/05/12/pjz4pc.png",
	"PicUrl_Click":"https://z1.wzznft.com/i/2024/05/12/pjz4pc.png"
    }
},
{
    "Command":"AddPOI",
    "Args":{
        "ID":"POIidNX5",
		"Type":"NXFX",
		"CoordType":1,
		"Location":"31000,5000,9000"
    }
},
{
    "Command":"UpdatePOIStyle",
    "Args":{
        "ID":"POIidNX5",
	"State":"Default",
        "PicUrl_Def":"https://z1.wzznft.com/i/2024/05/12/pjz4pc.png",
	"PicUrl_Click":"https://z1.wzznft.com/i/2024/05/12/pjz4pc.png"
    }
},
{
    "Command":"AddPOI",
    "Args":{
        "ID":"POIidNX6",
		"Type":"NXFX",
		"CoordType":1,
		"Location":"38000,4000,17000"
    }
},
{
    "Command":"UpdatePOIStyle",
    "Args":{
        "ID":"POIidNX6",
	"State":"Default",
        "PicUrl_Def":"https://z1.wzznft.com/i/2024/05/12/pjz4pc.png",
	"PicUrl_Click":"https://z1.wzznft.com/i/2024/05/12/pjz4pc.png"
    }
},
{
    "Command":"AddPOI",
    "Args":{
        "ID":"POIidNX7",
		"Type":"NXFX",
		"CoordType":1,
		"Location":"38000,14000,17000"
    }
},
{
    "Command":"UpdatePOIStyle",
    "Args":{
        "ID":"POIidNX7",
	"State":"Default",
        "PicUrl_Def":"https://z1.wzznft.com/i/2024/05/12/pjz4pc.png",
	"PicUrl_Click":"https://z1.wzznft.com/i/2024/05/12/pjz4pc.png"
    }
},
{
    "Command":"AddPOI",
    "Args":{
        "ID":"POIidNX8",
		"Type":"NXFX",
		"CoordType":1,
		"Location":"38000,26000,7000"
    }
},
{
    "Command":"UpdatePOIStyle",
    "Args":{
        "ID":"POIidNX8",
	"State":"Default",
        "PicUrl_Def":"https://z1.wzznft.com/i/2024/05/12/pjz4pc.png",
	"PicUrl_Click":"https://z1.wzznft.com/i/2024/05/12/pjz4pc.png"
    }
},
{
    "Command":"AddPOI",
    "Args":{
        "ID":"POIidNX9",
		"Type":"NXFX",
		"CoordType":1,
		"Location":"35000,32000,7000"
    }
},
{
    "Command":"UpdatePOIStyle",
    "Args":{
        "ID":"POIidNX9",
	"State":"Default",
        "PicUrl_Def":"https://z1.wzznft.com/i/2024/05/12/pjz4pc.png",
	"PicUrl_Click":"https://z1.wzznft.com/i/2024/05/12/pjz4pc.png"
    }
},
{
    "Command":"AddPOI",
    "Args":{
        "ID":"POIidNX10",
		"Type":"NXFX",
		"CoordType":1,
		"Location":"-19000,20000,7000"
    }
},
{
    "Command":"UpdatePOIStyle",
    "Args":{
        "ID":"POIidNX10",
	"State":"Default",
        "PicUrl_Def":"https://z1.wzznft.com/i/2024/05/12/pjz4pc.png",
	"PicUrl_Click":"https://z1.wzznft.com/i/2024/05/12/pjz4pc.png"
    }
}],
  closeList: [{
    "Command":"RemovePOI",
    "Args":{
        "ID":"POIidNX1"
    }
},
{
    "Command":"RemovePOI",
    "Args":{
        "ID":"POIidNX2"
    }
},
{
    "Command":"RemovePOI",
    "Args":{
        "ID":"POIidNX3"
    }
},
{
    "Command":"RemovePOI",
    "Args":{
        "ID":"POIidNX4"
    }
},
{
    "Command":"RemovePOI",
    "Args":{
        "ID":"POIidNX5"
    }
},{
    "Command":"RemovePOI",
    "Args":{
        "ID":"POIidNX6"
    }
},
{
    "Command":"RemovePOI",
    "Args":{
        "ID":"POIidNX7"
    }
},
{
    "Command":"RemovePOI",
    "Args":{
        "ID":"POIidNX8"
    }
},
{
    "Command":"RemovePOI",
    "Args":{
        "ID":"POIidNX9"
    }
},
{
    "Command":"RemovePOI",
    "Args":{
        "ID":"POIidNX10"
    }
}]
}]);

const handleCheckBox = (item) => {
  item.isCheck = !item.isCheck
  if (item.name === '人口迁徙') {
    if (item.isCheck) {
      emit('sendMessage', {
        "Command":"SwitchMap",
        "Args":{
            "Type":"2D"
        }
      })
      setTimeout(() => {
        emit('sendMessage', {
          "Command":"AddProvincialMigrationMap",
          "Args":{
              "Show":true
          }
        })
      }, 200)
      setTimeout(() => {
        emit('sendMessage', {
          "Command":"AddRegionalAdvantageMap",
          "Args":{
              "Show":true
          }
        })
      }, 500)
    } else {
      emit('sendMessage', {
        "Command":"SwitchMap",
        "Args":{
            "Type":"3D"
        }
      })
    }
    emit('changePanle', !item.isCheck)
  } else {
    const messageList = item.isCheck ? item.messageList : item.closeList
    messageList.forEach((message) => emit('sendMessage', JSON.stringify(message)));
  }
}

const handleShowCard = (item) => {
  switch (item.name) {
    case '人口分析':
      showCard1.value = !showCard1.value
      showCard2.value = false
      showCard3.value = false
      break;
    case '社区安防':
      showCard2.value = !showCard2.value
      showCard1.value = false
      showCard3.value = false
      break;
    case '能效分析':
      showCard3.value = !showCard3.value
      showCard1.value = false
      showCard2.value = false
      break;
    default:
      break;
  }
}

</script>

<style scoped lang="less">
.middle-panel {
  padding: 40px;
  .img-item {
    width: 204px;
    height: 50px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .space-box {
    position: relative;
  }

  .little-card {
    position: absolute;
    left: 100%;
    top: 0;
    display: flex;
    .card-item {
      pointer-events: auto;
      background: linear-gradient(154.5deg, rgba(14, 54, 106, 0.92) 12.58%, rgba(39, 112, 199, 0.92) 86.14%);
      border: 1px solid rgba(51, 153, 255, 0.6);
      background-size: 120%;
      padding-top: 20px;
      padding-left: 20px;
      padding: 12px 16px 12px 16px;
      border-radius: 4px;

      .firstMain {
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        cursor: pointer;
        img {
          width: 20px;
          height: 20px;
        }
        span {
          margin-left: 12px;
          width: 84px;
          height: 20px;
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #d8f7ff;
          line-height: 20px;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  .top10 {
      position: absolute;
      top: 58px;
      left: 100%;
  }
  .top20 {
      position: absolute;
      top: 115px;
      left: 100%;
  }
}
</style>