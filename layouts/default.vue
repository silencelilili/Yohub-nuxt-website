<template>
  <div class="layout-wrap">
    <Header />
    <div class="layout-container">
      <NuxtPage />
    </div>
    <Footer />
  </div>
</template>
<script lang="ts" setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>
<style lang="scss" scoped></style>
