<template>
  <div class="home-page">
    home page
  </div>
</template>

<script setup>
onMounted(() => {
  console.log('home page');
})
</script>

<style lang="less">
.home-page {
  color: @theme-color;
}
</style>