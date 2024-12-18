<template>
  <div v-if="!isAuthenticated">
    <el-button text @click="emits('back', 'password')">
      <el-icon><ArrowLeftBold /></el-icon> 返回
    </el-button>
    <div class="text-center mt-10">
      <iframe :src="qrcodUrl" frameborder="0" width="400px" height="400px"></iframe>
      <!-- <div id="weixinLogin"></div> -->
      <!-- <p>请使用微信扫码登录</p> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { wechatLogin, getWechatQrcode } from '@/service/user';
const emits = defineEmits(['back']);
const isAuthenticated = ref(false);

// 从环境变量或配置文件中获取 AppID 和 Redirect URI
const appId = 'wxf3ba968fc2627758'; // import.meta.env.VUE_APP_WECHAT_APPID;
const appSecret = '095b68ebaf604d8acb88696c191cb2d8';
const redirectUri = 'https://1119.yohub.online/login'; // window.location.origin; // process.env.VUE_APP_WECHAT_REDIRECT_URI;
const qrcodUrl = ref('');
const _getWechatQrcode = () => {
  getWechatQrcode()
    .then((res) => {
      qrcodUrl.value = res.qCodeUrl;
      // generateQRCode(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
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
  _getWechatQrcode();
  // setWxerwma();
  // 监听 URL 中的 code 参数
  if (window.location.hash.includes('code=')) {
    const code = window.location.hash.split('code=')[1].split('&')[0];
    handleLoginCallback(code);
  }
});

// 实例微信js对象
function setWxerwma() {
  const s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = 'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js';
  const wxElement = document.body.appendChild(s);
  wxElement.onload = function () {
    const obj = new WxLogin({
      self_redirect: false,
      id: 'weixinLogin', // 需要显示的容器id
      appid: appId, // 微信开放平台appid wx*******
      scope: 'snsapi_login', // 网页默认即可
      redirect_uri: encodeURIComponent(redirectUri), // 授权成功后回调的url
      state: Math.ceil(Math.random() * 1000), // 可设置为简单的随机数加session用来校验
      style: 'black', // 提供"black"、"white"可选。二维码的样式
      // href: 'data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7bWFyZ2luLXRvcDowO30KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30=', // 外部css文件url，需要https
    });
    console.log(obj);
  };
}
</script>
<style lang="less" scoped></style>
