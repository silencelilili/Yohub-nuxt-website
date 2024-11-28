<template>
  <!--  客户端下载 -->
  <div class="page-wrap-full">
    <div class="banner w-full h-65vh flex items-center">
      <div class="download-btn">
        <img src="/assets/images/apple.png" style="width: 24px" alt="" srcset="" /> <span>立即安装Mac版</span>
      </div>
    </div>

    <div class="page-center">
      <div class="client-type grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="windows-bg">
          <span></span>
          <span>Windows版</span>
        </div>
        <div class="macos-bg"><span></span> <span>Mac OS版</span></div>
        <div class="android-bg"><span></span> <span>Android版</span></div>
        <div class="ios-bg"><span></span> <span>IOS版</span></div>
      </div>

      <div class="download-desc grid md:grid-cols-3 gap-4">
        <div class="flex items-start">
          <img src="/assets/images/download/desc-1@2x.png" class="w-14" alt="" srcset="" />
          <div class="ml-6">
            <p class="mb-4 font-size-5">下载安装</p>
            <p class="color-#888888">在您的设备下载并安装<br />Yohub客户端</p>
          </div>
        </div>
        <div class="flex items-start">
          <img src="/assets/images/download/desc-2@2x.png" class="w-14" alt="" srcset="" />
          <div class="ml-6">
            <p class="mb-4 font-size-5">免费注册</p>
            <p class="color-#888888">使用邮箱注册或直接使用<br />第三方身份登录Yohub客户端</p>
          </div>
        </div>
        <div class="flex items-start">
          <img src="/assets/images/download/desc-3@2x.png" class="w-14" alt="" srcset="" />
          <div class="ml-6">
            <p class="mb-4 font-size-5">一键启动加速</p>
            <p class="color-#888888">点击加速按钮，一键启用加速</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.banner {
  background: url('/assets/images/download/download-banner@2x.png') no-repeat center center;
  background-size: cover;
}
.download-btn {
  background: #55fa79;
  text-align: center;
  font-size: 20px;
  width: 22.5rem /* 360/16 */;
  height: 3.75rem /* 60/16 */;
  line-height: 3.75rem /* 60/16 */;
  margin: 0 auto;
}
.client-type {
  position: relative;
  top: -3.75rem;
  div {
    width: 240px;
    height: 161px;
    cursor: pointer;
    // border: 1px solid #ccc;
    border-radius: 12px;
    margin: 0 auto;
    background-size: contain;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .windows-bg {
    background-image: url('/assets/images/download/windows@2x.png');
  }
  .ios-bg {
    background-image: url('/assets/images/download/ios@2x.png');
  }
  .android-bg {
    background-image: url('/assets/images/download/android@2x.png');
  }
  .macos-bg {
    background-image: url('/assets/images/download/macos@2x.png');
  }
}
.download-desc {
  margin: 60px 0;
  > div {
    margin: 0 auto;
  }
}
</style>
