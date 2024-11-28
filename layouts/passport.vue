<template>
    <div class="password-bg flex justify-between items-center">
      <div></div>
      <div class="login-container">
        <NuxtPage />
      </div>
    </div>
</template>
<script lang="ts" setup>

</script>
<style lang="scss" scoped>
.password-bg {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/images/login-bg.jpg') no-repeat center;
  background-size: cover;
}
.login-container{
  width: 31vw;
  height: 74vh;
  background: #ffffff;
  border-radius: 8px;
  margin-right: 8.9375rem;
}
</style>
