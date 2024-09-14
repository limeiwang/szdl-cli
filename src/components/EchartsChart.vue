<template>
  <div class="echarts-chart" ref="chartRef"></div>
</template>

<script setup>
import * as echarts from 'echarts';

const props = defineProps({
  options: {
    type: Object,
    default: () => {},
  },
  theme: {
    type: String,
    default: '',
  },
});
const chartRef = ref(null);
const state = reactive({
  chartInstance: null,
});

const renderChart = () => {
  state.chartInstance = markRaw(echarts.init(chartRef.value, props.theme));
  state.chartInstance.setOption(props.options);
};

const handleResize = () => {
  state.chartInstance?.resize();
};

onMounted(() => {
  nextTick(() => renderChart());
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  if (state.chartInstance) {
    state.chartInstance.dispose();
    state.chartInstance = null;
    window.removeEventListener('resize', handleResize);
  }
});

watch(
  () => props.options,
  () => {
    renderChart();
  },
  { deep: true },
);
</script>

<style scoped>
.echarts-chart {
  width: 100%;
  height: 100%;
}
</style>
