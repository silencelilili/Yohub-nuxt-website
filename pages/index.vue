<template>
  <!-- 首页 -->
  <div class="page-wrap-full">
    <!-- <div @click="changeName">{{ store.name }}</div>
    <NuxtIcon name="header-home" />
    <h1>{{ $t('name') }}</h1> -->
    <div class="banner-top banner-bg">
      <div class="banner-div">
        <h3 class="font-size-6 mb-3">指尖一点，极速畅连</h3>
        <p class="mb-9">全球海外华人一键加速回国</p>
        <div class="download-btn mb-7">全球海外华人一键加速回国</div>
        <div class="download-btn-border">下载Mac版APP</div>
      </div>
      <img
        src="/assets/images/home/line.png"
        class="w-100%"
        style="scale: 0.8; position: absolute; z-index: 2"
        alt=""
      />
      <img
        src="/assets/images/home/img_2.png"
        class="w-100%"
        style="scale: 0.8; position: absolute; z-index: 1"
        alt=""
      />

      <img
        src="/assets/images/home/img_1.png"
        style="position: absolute; top: 38px; right: 48px; scale: 0.9; z-index: 2"
        alt=""
      />
    </div>
    <div style="margin: 0 8vw">
      <div class="home-part">
        <div>
          <p class="home-part-title">畅享全球影音直播</p>
          <p class="home-part-desc">解锁国内影音直播资源，刷剧流畅，高清秒开</p>
        </div>
        <img src="/assets/images/home/pic_01.png" alt="" />
      </div>

      <div class="home-part">
        <img src="/assets/images/home/pic_02.png" alt="" />
        <div class="text-right">
          <p class="home-part-title">在线游戏低延时专 线加速</p>
          <p class="home-part-desc">一键游戏加速，国服游戏任意畅玩</p>
        </div>
      </div>
      <div class="home-part">
        <div>
          <p class="home-part-title">全球100+高速专线</p>
          <p class="home-part-desc">全球加速，不限时不限速，天南海北极速畅联</p>
        </div>
        <img src="/assets/images/home/pic_03.png" alt="" />
      </div>
      <div class="home-part">
        <img src="/assets/images/home/pic_04.png" alt="" />
        <div class="text-right">
          <p class="home-part-title">多设备同时在线</p>
          <p class="home-part-desc">同时在线多达5台设备，全家共享超快速度</p>
        </div>
      </div>
      <div class="home-part">
        <div>
          <p class="home-part-title">一对一在线帮助</p>
          <p class="home-part-desc">专业工程师一对一在线帮助，身处海外也能 轻松访问</p>
        </div>
        <img src="/assets/images/home/pic_05.png" alt="" />
      </div>
    </div>
    <div class="">
      <img src="/assets/images/home/pic_bottom.png" class="w-100%" alt="" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getUserInfo, getConfigPost } from '~/service/user';
import { useStore } from '../store/index';
import PhoneAnimation from '@/plugins/lottie/data.json';

const store = useStore();
// function changeName() {
//   store.changeName('new Name');
// }
// getConfigPost({
//   token: '',
//   userName: 1,
// });
</script>
<style lang="scss" scoped>
.index-banner-bg {
  height: 100vh;
  width: 100vw;
  background-image: url('/assets/images/bg_top.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.banner-top {
  position: relative;
  height: 100vh;
}
.banner-bg {
  background-image: url('@/assets/images/home/bg_top.png');
  // height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.banner-div {
  position: absolute;
  top: 30vh;
  left: 20vw;
  color: #fff;
  z-index: 3;
}
.download-btn {
  background: #55fa79;
  text-align: center;
  font-size: 20px;
  width: 22.5rem /* 360/16 */;
  height: 3.75rem /* 60/16 */;
  line-height: 3.75rem /* 60/16 */;
  color: #000;
  cursor: pointer;
}
.download-btn-border {
  text-align: center;
  font-size: 20px;
  width: 22.5rem /* 360/16 */;
  height: 3.75rem /* 60/16 */;
  line-height: 3.75rem /* 60/16 */;
  border: 1px solid #fff;
  background: #ffffff28;
}
.home-part {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 236px 0;
  img {
    // width: 31.25rem /* 500/16 */;
    height: 28.75rem; /* 460/16 */
    scale: 0.9;
  }
  .home-part-title {
    font-size: 2.5rem /* 40/16 */;
    font-weight: 500;
  }
  .home-part-desc {
    font-size: 1.875rem /* 30/16 */;
    line-height: 3.75rem /* 60/16 */;
  }
}
</style>
