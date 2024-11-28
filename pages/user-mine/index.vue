<template>
  <!-- 用户中心 -->
  <!-- <NuxtLayout name="custom"> -->
  <el-row :gutter="16">
    <el-col :span="15">
      <div class="mb-4">
        <el-card style="height: 480px" shadow="hover">我的消息</el-card>
      </div>
    </el-col>
    <el-col :span="9">
      <div class="mb-4">
        <el-card style="height: 280px" shadow="hover">在线终端</el-card>
      </div>
      <div class="mb-4">
        <el-card style="height: 480px" shadow="hover">流量统计</el-card>
      </div>
    </el-col>
  </el-row>
  <!-- </NuxtLayout> -->
</template>
<script lang="ts" setup>
definePageMeta({
  layout: 'custom',
  middleware: ['user-center'],
});
</script>
<style lang="scss" scoped></style>
