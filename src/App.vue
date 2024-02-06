<script setup>
import { getApiTest } from './api/index'
import { useHomeStore } from '@/store/modules/home'
import { storeToRefs } from 'pinia'
import EchartsChart from '@/components/EchartsChart.vue'

const store = useHomeStore()
const chart = ref({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
})

const { count } = storeToRefs(store)
const newCount = computed(() => `${count.value}`)

const stateAdd = () => {
  store.increment()
  store.incrementPromise()
}

onMounted(() => {
  getApiTest({
    params: 'test' 
  }).then(res => {
    console.log(res, '---');
  })
})
</script>

<template>
  <span
      class="bg-gray-100 block p-10 rounded-md cursor-pointer"
      @click="stateAdd"
    >
      Click here -> {{ newCount }}
  </span>

  <div class="h-100 w-100">
    <echarts-chart :options="chart"/>
  </div>
  <div class="i-mdi-light:home" />
  <div class="i-carbon-sun dark:i-carbon-moon" />
  <div class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />
  <svg-icon icon-name="home" icon-class="home" class="h-8 w-8" />
  <router-view></router-view>
</template>

<style>
</style>
