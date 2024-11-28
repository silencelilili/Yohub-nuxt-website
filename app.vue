<template>
  <el-config-provider namespace="yh" size="large">
    <NuxtLayout></NuxtLayout>
  </el-config-provider>
</template>
<script lang="ts" setup>
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
const nuxtApp = useNuxtApp();
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  nuxtApp.vueApp.component(key, component);
}
</script>
