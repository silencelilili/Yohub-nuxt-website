<template>
  <div v-if="!isAuthenticated">
    <el-button text @click="emits('back', 'password')">
      <el-icon><ArrowLeftBold /></el-icon> 返回
    </el-button>
    <div class="text-center mt-10">
      <canvas id="qrcode" style="width: 320px; height: 320px"></canvas>
      <p>请使用微信扫码登录</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import QRCode from 'qrcode';
import { wechatLogin } from '@/service/user';
const emits = defineEmits(['back']);
const isAuthenticated = ref(false);

// 从环境变量或配置文件中获取 AppID 和 Redirect URI
const appId = 'wxf3ba968fc2627758'; // import.meta.env.VUE_APP_WECHAT_APPID;
const appSecret = '095b68ebaf604d8acb88696c191cb2d8';
const redirectUri = window.location.origin; // process.env.VUE_APP_WECHAT_REDIRECT_URI;

// 生成微信登录的二维码
const generateQRCode = async () => {
  const loginUrl = `https://open.weixin.qq.com/connect/qrconnect?appid=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect`;
  await QRCode.toCanvas(document.getElementById('qrcode'), loginUrl);
};
// 处理微信登录回调
const handleLoginCallback = async (code) => {
  try {
    const response = await wechatLogin({ code, appId, appSecret });
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      isAuthenticated.value = true;
    }
  } catch (error) {
    console.error('Error during WeChat login:', error);
  }
};

// 初始化
onMounted(() => {
  generateQRCode();
  // 监听 URL 中的 code 参数
  if (window.location.hash.includes('code=')) {
    const code = window.location.hash.split('code=')[1].split('&')[0];
    handleLoginCallback(code);
  }
});
</script>
<style lang="less" scoped></style>
