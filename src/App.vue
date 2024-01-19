<script setup>
import { getApiTest } from './api/index'
import { useHomeStore } from '@/store/modules/home'
import { storeToRefs } from 'pinia'
import EchartsChart from '@/components/EchartsChart.vue'
import SvgIcon from "@/components/SvgIcon.vue";

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
    <EchartsChart :options="chart"/>
  </div>

  <SvgIcon name="vue"/>
  <!-- <router-view></router-view> -->
</template>

<style>
</style>
