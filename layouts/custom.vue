<template>
  <div class="layout-wrap">
    <Header />
    <div class="layout-container">
      <div class="flex custom-page-wrap">
        <UserNavVue @jump="onJump" />
        <div class="flex-1">
          <!-- <slot /> -->
          <!-- <NuxtPage /> -->
          <RouterView />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script lang="ts" setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import UserInfoVue from '@/components/UserInfo.vue';
import UserNavVue from '@/components/UserNav.vue';
// import { userNavList } from './pages';
// import { NuxtLayout, NuxtPage } from '../.nuxt/components';
// const currentCom = ref(userNavList[0].component);
// const user = useUserStore();

const onJump = (item: any) => {
  // currentCom.value = item.component;
};
</script>
<style lang="scss" scoped></style>
