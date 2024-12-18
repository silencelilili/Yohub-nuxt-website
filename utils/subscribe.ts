// 订阅方式
export const subscribeList = [
  {
    id: 1,
    name: '年卡 365天',
    price: '0.01', // 现在的价格
    originalPrice: '576', // 原价
    unitPrice: '¥24/月', // 单价
    content: ['免费使用', '支持自定义域名'],
  },
  {
    id: 2,
    name: '半年卡 92天',
    price: '96', // 现在的价格
    originalPrice: '192', // 原价
    unitPrice: '¥32/月', // 单价
    content: ['免费使用', '支持自定义域名'],
  },
  {
    id: 3,
    name: '季卡 92天',
    price: '96', // 现在的价格
    originalPrice: '192', // 原价
    unitPrice: '¥32/月', // 单价
    content: ['免费使用', '支持自定义域名'],
  },
  {
    id: 4,
    name: '月卡 31天',
    price: '40', // 现在的价格
    originalPrice: '80', // 原价
    unitPrice: '¥40/月', // 单价
    content: ['免费使用', '支持自定义域名'],
  },
  {
    id: 5,
    name: '100GB流量卡 不限时',
    price: '25', // 现在的价格
    originalPrice: '50', // 原价
    unitPrice: '¥0.25/GB', // 单价
    content: ['免费使用', '支持自定义域名'],
  },
  {
    id: 6,
    name: '500GB流量卡 不限时',
    price: '25', // 现在的价格
    originalPrice: '50', // 原价
    unitPrice: '¥0.25/GB', // 单价
    content: ['免费使用', '支持自定义域名'],
  },
  {
    id: 7,
    name: '1TB流量卡 不限时',
    price: '25', // 现在的价格
    originalPrice: '50', // 原价
    unitPrice: '¥0.25/GB', // 单价
    content: ['免费使用', '支持自定义域名'],
  },
];

// 支付方式
export const paymentOptions = [
  {
    label: '使用微信支付',
    value: 'wechat',
    icon: 'pay-wechat.png',
  },
  {
    label: '使用支付宝支付',
    value: 'alipay',
    icon: 'pay-ali.png',
  },
  {
    label: '使用PayPal支付',
    value: 'paypal',
    icon: 'pay-pal.png',
  },
  {
    label: 'Stripe',
    value: 'stripe',
    icon: 'pay-stripe.png',
  },
  {
    label: '使用余额支付',
    value: 'balance',
    icon: 'pay-balance.png',
  },
];
