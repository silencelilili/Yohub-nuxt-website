<template>
  <div :class="[' bg-white py-8 px-12 mb-6 pos-relative mt-4', props.type ? '' : 'page-wrap']">
    <h3 v-if="!props.type" class="mb-6">可选订阅</h3>
    <div v-if="productList.length" class="subscribe-list grid md:grid-cols-3 xl:grid-cols-4 gap-10">
      <div
        v-for="(item, index) in productList"
        :key="index"
        :class="['subscribe-list-item', activeSubscribeIndex === index ? 'subscribe-list-item-active' : '']"
        @click="handleChooseSubscribe(item, index)"
      >
        <div class="item-tag">限时5折</div>
        <div class="flex-1 line-height-9 mt-8">
          <div class="color-#666666">{{ item?.name }}</div>
          <div class="item-price">
            <span class="font-size-3">¥</span><span class="font-size-7">{{ item?.price }}</span>
          </div>
          <div class="color-#C3B097">
            <s
              ><span class="font-size-3">¥</span><span class="font-size-4">{{ item?.price }}</span></s
            >
          </div>
        </div>
        <div class="unit-price">{{ item?.price }}</div>
      </div>
    </div>
    <el-skeleton v-else />

    <!-- 权益说明 -->
    <div class="flex justify-between color-#99999D my-4">
      <span>包含VIP会员所有权益（时间卡不限流量，流量卡不限时间）</span>
      <span>最长支持30天退款（特价无退款），详见<a class="color-#3366FF">退款规则</a> </span>
    </div>

    <!-- 支付账号 -->
    <div v-if="store.isLogin" class="bg-#D6E0FE py-3 px-6 my-8">
      <strong>请确认当前支付账号</strong>：{{ userInfo.user_name }}（{{ userInfo.email }}）
    </div>

    <!-- 优惠码 -->
    <div class="my-8">
      <el-space>
        <span>优惠码</span>
        <el-input v-model="couponCode" style="width: 240px" placeholder="请输入优惠码" />
        <el-button type="primary" plain @click="handleCheckCouponCode">应用</el-button>
      </el-space>
    </div>

    <!-- 支付方式 -->
    <div class="mb-12">
      <div class="mb-4">支付方式</div>
      <div class="payment-list grid md:grid-cols-4 gap-4">
        <div
          v-for="(item, index) in paymentOptions"
          :key="index"
          :class="['payment-list-item', activePayment === item.value ? 'payment-list-item-active' : '']"
          @click="handleChangePayment(item)"
        >
          <el-icon v-if="activePayment === item.value" class="active-icon"><Select /></el-icon>
          <div class="payment-list-item-icon">
            <img v-if="item.value === 'wechat'" src="/assets/images/pay-wechat.png" :alt="item.label" />
            <img v-else-if="item.value === 'alipay'" src="/assets/images/pay-ali.png" :alt="item.label" />
            <img v-else-if="item.value === 'paypal'" src="/assets/images/pay-pal.png" :alt="item.label" />
            <img v-else-if="item.value === 'stripe'" src="/assets/images/pay-stripe.png" :alt="item.label" />
            <img v-else-if="item.value === 'balance'" src="/assets/images/pay-balance.png" :alt="item.label" />
          </div>
          <div class="payment-list-item-title">{{ item.label }}</div>
        </div>
      </div>
    </div>

    <div class="line-height-9 mb-6">
      <div class="flex justify-between">
        <div>
          Yohub VIP： <span class="fw-500">{{ paymentData.subscribe.name }} 限时5折</span>
        </div>
        <div>￥ {{ paymentData.subscribe.originalPrice }}</div>
      </div>
      <div v-if="!!couponCode" class="flex justify-between">
        <div>优惠券抵扣： <span class="fw-500">100元代金券</span></div>
        <div class="color-#FF0000">-100</div>
      </div>
      <div class="flex justify-between mt-6">
        <div class="fw-500">应付总价：</div>
        <div>CNY ￥ {{ paymentData.subscribe.price }}</div>
      </div>
    </div>

    <!-- tips -->
    <div class="color-#999999 bg-#f0f2f5 px-3 py-4 line-height-9">
      <p>
        <NuxtIcon name="security" style="color: #3366ff" />
        您在注册时已经同意了Yohub的服务协议和隐私条款，请遵循协议和条款，合理合规使用。
      </p>
      <p>
        <el-icon><Lock style="color: #3366ff" /></el-icon> 支付过程已加密，使用非CNY支付时可能会有额外的汇率转换费用。
      </p>
    </div>

    <div class="flex justify-center mt-16">
      <el-button v-if="store.isLogin" type="primary" class="w-360px h-61px" @click="handleCreateOrder"
        >立即购买</el-button
      >
      <template v-else>
        <el-button type="primary" class="w-360px h-61px" @click="toLogin">登录后购买</el-button>
        <el-button type="primary" plain class="w-360px h-61px" @click="toRegister">注册即可免费加速</el-button>
      </template>
    </div>

    <div v-if="!props.type" style="position: absolute; right: -216px; top: 0">
      <BannerVue />
    </div>

    <!-- 支付弹窗dialog -->
    <el-dialog
      v-model="payDialogVisible"
      title="完成支付"
      width="480"
      :footer="false"
      center
      align-center
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <!-- <div class="text-center">
        <div class="font-size-24 fw-500 mb-4">
          实付价：<span class="color-#FF0000"> ￥ {{ paymentData.subscribe.price }}</span>
        </div>
        <div id="qrcode-content"></div>
        <p><img src="/assets/images/pay-ali.png" /> 请用支付宝进行扫码支付</p>

        <div v-if="payResult === 'error'" class="m-4">
          <el-button link type="primary" @click="refreshPayCode"> 刷新 </el-button>
        </div>
      </div> -->
      <div v-if="payDialogVisible">
        <PaymentVue ref="paymentRef" :order-info="paymentData.subscribe" :payType="activePayment" />
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { subscribeList, paymentOptions } from '@/utils/subscribe';
import BannerVue from './banner.vue';
import QRCode from 'qrcode';
import { defineProps } from 'vue';
import { getProductList, checkCoupon, createOrder, getAlipayQrcode, getAlipayStatus } from '@/service/order';
import { useStore } from '~/store/index';
import PaymentVue from '../payment/index.vue';

const store = useStore();

const router = useRouter();
const props = defineProps({
  type: {
    type: String,
    default: '',
  },
});
const userInfo = ref({ user_name: '', email: '' });
// 初始化用户信息
onMounted(async () => {
  userInfo.value = (await store.asyncGetUserInfo()) as any;
  _getProductList();
});

/**
 * 商品列表
 */
const productList = ref([]);
const _getProductList = async () => {
  const { data } = await getProductList();

  productList.value = Object.values(data) || ([...data.tabp, ...data.bandwidth, ...data.time] as any);
};

/**
 * 选择订阅方式
 */
const activeSubscribeIndex = ref(0);
const handleChooseSubscribe = (item: any, index: number) => {
  activeSubscribeIndex.value = index;
  paymentData.value.subscribe = item;
};

/**
 * 优惠码
 */
const couponCode = ref('');
// 验证优惠码
const handleCheckCouponCode = () => {
  if (!couponCode.value || !paymentData.value.subscribe.id) return;
  checkCoupon({
    coupon: couponCode.value,
    product_id: paymentData.value.subscribe.id,
  }).then((res) => {
    console.log('checkCoupon------', res);
  });
};

/**
 * 选择支付方式
 */
const activePayment = ref('wechat');
const handleChangePayment = (item: any) => {
  activePayment.value = item.value;
};

/**
 * 金额结算
 */
const paymentData = ref({
  total: 288,
  coupon: 100,
  payment: 188,
  currency: 'CNY',
  subscribe: subscribeList[activeSubscribeIndex.value],
});

/**
 * 立即购买
 */
const handleCreateOrder = () => {
  createOrder({
    coupon: couponCode.value,
    product_id: paymentData.value.subscribe.id,
  })
    .then((res) => {
      console.log('createOrder success ------', res);
      ElMessage.success('创建订单成功');
      payDialogVisible.value = true;
      nextTick(() => {
        handlePay({ amount: paymentData.value.subscribe.price, invoice_id: res?.invoice_id });
      });
    })
    .catch((err) => {
      // ElMessage.error('创建订单失败');
    });
  console.log('立即购买, paymentData.value', paymentData.value);
};
const toLogin = () => {
  router.push('/login');
};
const toRegister = () => {
  router.push('/register');
};

/**
 * 支付
 */
const payDialogVisible = ref(false);
const paymentRef = ref();
const handlePay = (data: any) => {
  const _data = {
    invoice_id: data.invoice_id,
    amount: data.amount,
  };
  paymentRef.value.createQrcode(_data).then((res) => {
    console.log('createAlipayQrcodeApi success ------', res);
    payDialogVisible.value = true;
  });
};
</script>
<style lang="scss" scoped>
.subscribe-list {
  // display: grid;
  // grid-template-columns: repeat(4, 1fr); /* 一行四列 */
  // gap: 10px; /* 列之间的间距 */

  .subscribe-list-item {
    position: relative;
    cursor: pointer;
    background-color: #ffffff; /* 背景颜色 */
    // padding: 20px; /* 内边距 */
    text-align: center; /* 文本居中 */
    border: 2px solid #e9e9e9;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.3s ease-in-out;
    height: 200px;
    &:hover {
      background: linear-gradient(0deg, #fff9ef 0%, #fdf4e4 100%);
      border: 2px solid #c2a172;
    }

    .item-price {
      // font-size: 24px;
      font-weight: bold;
      color: #543b19;
    }
    .unit-price {
      height: 36px;
      line-height: 36px;
      background: #f5dfcc;
      color: #543b19;
      border-radius: 0 0 10px 10px;
    }
    .item-tag {
      position: absolute;
      top: -15px;
      left: -2px;
      width: 116px;
      height: 30px;
      background: #373536;
      color: #ffe8c8;
      border-radius: 12px 0 12px 0;
    }
  }
  .subscribe-list-item-active {
    background: linear-gradient(0deg, #fff9ef 0%, #fdf4e4 100%);
    border: 2px solid #c2a172;
  }
}

.payment-list {
  .payment-list-item {
    position: relative;
    cursor: pointer;
    text-align: center; /* 文本居中 */
    border: 2px solid #bbbbbb;
    border-radius: 4px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    &:hover {
      border: 2px solid #3366ff;
    }

    .payment-list-item-icon {
      img {
        width: 36px;
        height: 36px;
        margin-right: 10px;
      }
    }
    .active-icon {
      position: absolute;
      top: -2px;
      right: -2px;
      color: #fff;
      background: #3366ff;
      padding: 2px;
      border-radius: 3px;
    }
  }
  .payment-list-item-active {
    border: 2px solid #3366ff;
  }
}
</style>
