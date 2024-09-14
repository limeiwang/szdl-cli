<script setup>
import { getApiTest } from './api/index';
import { useHomeStore } from '@/store/modules/home';
import { storeToRefs } from 'pinia';

const store = useHomeStore();
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
});
const a = ref(1);
const b = ref(2);

const { count } = storeToRefs(store);
const newCount = computed(() => `${count.value}`);

const stateAdd = () => {
  store.increment();
  store.incrementPromise();
};

onMounted(() => {
  getApiTest({
    params: 'test' 
  }).then(res => {
    console.log(res, '---');
  });

  if (a.value === b.value) {
    console.log('a === b');
  } else {
    console.log('a !== b');
  }
});
</script>

<template>
  <header class="app-header">
    <h1>Header</h1>
  </header>
  <main class="app-main">
    <aside class="app-aside">
      menu
      <ul>
        <li>12321</li>
      </ul>
    </aside>
    <router-view></router-view>
  </main>

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
  <svg-icon icon-class="vue" class="h-8 w-8" />
</template>

<style>
</style>
