<template>
  <div>
    <div @click="changeName">{{ store.name }}</div>
    <NuxtIcon name="header-home" />
    <h1>{{ $t("name") }}</h1>
   
  </div>
</template>
<script lang="ts" setup>
import { useStore } from "../store/index";
const store = useStore();
function changeName() {
  store.changeName("new Name");
}
</script>
<style lang="scss" scoped></style>
