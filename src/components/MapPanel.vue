<template>
  <div class="map-panel">
    <h3 class="map-panel-title">{{ props.title }}</h3>
    <main class="map-panel-content">
      <slot />
    </main>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup>
// 使用 defineProps 定义 props，并指定类型和默认值
const props = defineProps({
  title: {
    type: String,
    default: 'Hello from props!'
  },
  width: {
    type: [Number, String],
    default: 456
  },
  height: {
    type: [Number, String],
    default: 200
  },
  zIndex: {
    type: Number,
    default: 100
  }
});
</script>

<style lang="less">
.map-panel {
  margin-bottom: 20px;
  .map-panel-title {
    width: 420px;
    height: 48px;
    line-height: 48px;
    margin: 0;
    background: url("@/assets/image/card-title.png") no-repeat;
    background-position: top left;
    background-size: 100% 100%;
    color: #FFFFFF;

    box-sizing: border-box;
    font-family: YouSheBiaoTiHei;
    font-size: 24px;
    font-weight: 400;
    padding-left: 53px;
  }

  .map-panel-content {
    width: 420px;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    background: url('@/assets/image/card-body.png') no-repeat;
    background-size: 100% 100%;
  }
}
</style>
