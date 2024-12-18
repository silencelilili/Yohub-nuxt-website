<template>
  <div class="password-bg password-position">
    <div></div>
    <div class="login-container login-bg">
      <NuxtPage />
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.password-bg {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/images/login-bg.jpg') no-repeat center;
  background-size: cover;
}

.login-bg {
  background: #ffffff;
  border-radius: 8px;
}
</style>
