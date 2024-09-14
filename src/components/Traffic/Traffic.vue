<template>
  <div class="traffic">
    <traffic-lamp v-if="isEast" ref="eastLight" class="east-light"/>
    <traffic-lamp v-if="isWest" ref="westLight" class="west-light"/>
    <traffic-lamp v-if="isSouth" ref="southLight" class="south-light"/>
    <traffic-lamp v-if="isNorth" ref="northLight" class="north-light"/>
  </div>
</template>

<script setup>
import TrafficLamp from './TrafficLamp.vue';

const eastLight = ref(null);
const westLight = ref(null);
const southLight = ref(null);
const northLight = ref(null);

const isEast = ref(true);
const isWest = ref(true);
const isSouth = ref(true);
const isNorth = ref(true);

nextTick(() => {
  eastLight.value.lightCurrentTime = {
    left: 10,
    forward: 20,
    right: 30,
  };
  eastLight.value.lightCurrentColor = {
    left: 'yellow',
    forward: 'yellow',
    right: 'yellow',
  };
});
</script>

<style scoped lang="less">
.traffic {
  width: 683px;
  height: 540px;
  margin-right: 20px;
  background: url('@/assets/image/traffic/traffic-light-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  
  .east-light {
    position: absolute;
    left: 55%;
    top: 32%;
  }
  
  .west-light {
    position: absolute;
    left: 19%;
    top: 25%;
  }
  
  .south-light {
    position: absolute;
    left: 25%;
    top: 42%;
  }
  
  .north-light {
    position: absolute;
    left: 52%;
    top: 14%;
  }
}
</style>
