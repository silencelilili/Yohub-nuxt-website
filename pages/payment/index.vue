<template>
  <div class="flex-center-col">
    <div class="font-size-5 fw-500 mb-4">
      实付价：<span class="color-#FF0000"> ￥ {{ orderInfo.price }}</span>
    </div>
    <div class="qr-wrap">
      <div id="qrcode-content"></div>
      <div v-if="payResult.status === 'error'" class="qr-overlay">{{ payResult.msg }}</div>
    </div>
    <p class="flex-center"><img class="w-5 mr-2" src="/assets/images/pay-ali.png" /> 请用支付宝进行扫码支付</p>
    <div v-if="payResult.status === 'error'" class="m-4">
      <el-button link type="primary" @click="refreshPayCode"
        ><el-icon><RefreshRight /></el-icon> 刷新
      </el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineExpose } from 'vue';
import QRCode from 'qrcode';
import { getAlipayQrcode, getAlipayStatus, type IAlipayQrcodeParams, type IAlipayQrcodeResult } from '@/service/order';

const props = defineProps({
  orderInfo: {
    type: Object,
    default: () => {
      return { price: 0 };
    },
  },
  // 支付方式
  payType: {
    type: String,
    default: 'wechat',
  },
});
const { orderInfo, payType } = toRefs(props);

const currentPayInfo = ref();
const payResult = ref({
  status: 'loading',
  msg: '正在生成二维码',
});
// 刷新
function refreshPayCode() {
  if (currentPayInfo.value) {
    createAlipayQrcodeApi(currentPayInfo.value);
  }
}

function createQrcode(data: any) {
  if (payType.value === 'alipay') {
    createAlipayQrcodeApi(data);
  } else {
    ElMessage.warning('暂不支持该支付方式');
  }
}

// 支付宝-创建支付二维码
function createAlipayQrcodeApi(data: IAlipayQrcodeParams): Promise<any> {
  currentPayInfo.value = data;
  payResult.value = {
    status: 'loading',
    msg: '正在生成二维码',
  };
  let element = document.getElementById('qrcode-content');
  while (element?.firstChild) {
    element.removeChild(element.firstChild);
  }
  return new Promise((resolve, reject) => {
    getAlipayQrcode(data).then((res: any) => {
      QRCode.toCanvas(res.qrcode, {
        width: 300,
        height: 300,
        colorDark: '#000000',
        colorLight: '#ffffff',
      }).then((canvas: Element) => {
        element?.appendChild(canvas);
        pollAlipayStatusApi(res.pid)
          .then((result) => {
            ElMessage.success('支付成功');
            console.log('支付成功-----');
            payResult.value = {
              status: 'success',
              msg: '支付成功',
            };
            currentPayInfo.value = null;
            resolve(result);
          })
          .catch((err) => {
            console.log('支付失败-----', err);
            payResult.value = {
              status: 'error',
              msg: err === 'timeout' ? '支付超时' : '支付失败',
            };
            reject(err);
          });
      });
    });
  });
}
// 轮询支付结果
function pollAlipayStatusApi(pid: string | number): Promise<void> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const maxPollingTime = 0.1 * 60 * 1000; // 5分钟换算成毫秒
    const poll = async () => {
      const currentTime = Date.now();
      if (currentTime - startTime > maxPollingTime) {
        reject('timeout');
        return;
      }

      try {
        const res = await getAlipayStatus(pid); // 替换成实际接口地址
        if (res?.result === 1) {
          resolve();
        } else {
          // 设置轮询间隔时间为1秒，可按需调整
          setTimeout(poll, 1000);
        }
      } catch (error) {
        reject(error);
      }
    };

    poll();
  });
}

defineExpose({
  createQrcode,
});
</script>
<style lang="scss" scoped>
.qr-wrap {
  height: 300px;
  width: 300px;
  position: relative;
}
.qr-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.88); /* 这里使用rgba设置半透明黑色蒙层，透明度为0.5，可按需调整 */
  color: red;
  font-size: 22px;
  /* line-height: 300px; */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
