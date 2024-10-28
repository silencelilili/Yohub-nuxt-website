<template>
   <div class="header px-6 h-14 flex items-center justify-between">
    <div class="text-3xl font-bold underline"> 
      <span>YoHub</span>
    </div>
    <div class="header-right flex gap-6">
      <span>首页</span>
      <span>客户端下载</span>
      <span>订阅计划</span>
      <span>登录/注册</span>
      <button @click="$i18n.locale = 'zh'">中文</button>
      <button @click="$i18n.locale = 'en'">英文</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
</script>
<style lang="scss" scoped>
.header {
  box-shadow: 6px 5px 7px 0px #f3f3f3;
}
.header-right{
  span{
    cursor: pointer;
    &::after{
      content: '';
      display: block;
      width: auto;
      height: 2px;
      background-color: transparent;
      position: relative;
      bottom: -16px;
    }
    &:hover{
      color: #4753f5;
      &::after{
        background-color: #4753f5;
      }
    }
  }
}
</style>