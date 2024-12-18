<template>
  <div class="layout-header">
    <el-menu
      :default-active="activeIndex"
      style="height: 72px"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="0">
        <img style="width: 100px" src="/assets/images/logo-blue.png" alt="" />
      </el-menu-item>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/download">客户端下载</el-menu-item>
      <el-menu-item index="/subscribe">订阅计划</el-menu-item>
      <el-menu-item v-if="!!_userInfo.id" index="/user">用户中心</el-menu-item>
      <el-menu-item v-if="!_userInfo.id" index="/login">登录/注册</el-menu-item>

      <el-sub-menu v-if="!!_userInfo.id" index="">
        <template #title>{{ _userInfo?.email }}</template>
        <!-- <el-menu-item @click="$i18n.locale = 'zh'">中文</el-menu-item>
        <el-menu-item @click="$i18n.locale = 'en'">英文</el-menu-item> -->
        <el-menu-item @click="handleLogout">登出</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from '../store/index';

const router = useRouter();
const store = useStore();
const _userInfo = ref({ id: null, email: '' });

// const activeIndex = ref('/');
const activeIndex = ref(useStore().activeHeaderNavName);

const handleLogout = async () => {
  await store.asyncLogout();
  // 跳转登录页
  router.push('/login');
};
const handleSelect = (key: string) => {
  activeIndex.value = key;
  if (key) router.push(key);
};
onMounted(async () => {
  _userInfo.value = (await store.asyncGetUserInfo()) as any;
});
</script>
<style lang="scss" scoped>
.header-right {
  span {
    cursor: pointer;
    &::after {
      content: '';
      display: block;
      width: 30px;
      height: 2px;
      margin: 0 auto;
      background-color: transparent;
      position: relative;
      bottom: 10px;
    }
    &:hover {
      color: #4753f5;
      &::after {
        background-color: #4753f5;
      }
    }
  }
}
.yh-menu--horizontal > .yh-menu-item:nth-child(1) {
  margin-right: auto;
}
.yh-menu--horizontal {
  --el-menu-horizontal-height: 72px;
}
</style>
