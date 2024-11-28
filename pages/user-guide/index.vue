<template>
  <!-- <NuxtLayout name="custom"> -->
  <div>用户中心-快速上手</div>
  <!-- </NuxtLayout> -->
</template>
<script lang="ts" setup>
definePageMeta({
  layout: 'custom',
  middleware: ['user-center'],
});
</script>
<style lang="scss" scoped></style>
