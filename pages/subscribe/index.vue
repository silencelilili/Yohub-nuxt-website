<template>
  <div>
    订阅计划
    <div class="subscribe-list">
      <div v-for="(item, index) in subscribeList" :key="index" class="subscribe-list-item">
        <div>{{item.title}}</div>
        <div>{{item.price}}</div>
        <div>{{item.originalPrice}}</div>
        <div>{{item.unitPrice}}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const subscribeList = [
  {
    title: '免费版',
    price: '99', // 现在的价格
    originalPrice: '244', // 原价
    unitPrice: '¥24/月', // 单价
    content: [
      '免费使用',
      '支持自定义域名',
    ]
  }, {
    title: '免费版',
    price: '99', // 现在的价格
    originalPrice: '244', // 原价
    unitPrice: '¥24/月', // 单价
    content: [
      '免费使用',
      '支持自定义域名',
    ]
  },{
    title: '免费版',
    price: '99', // 现在的价格
    originalPrice: '244', // 原价
    unitPrice: '¥24/月', // 单价
    content: [
      '免费使用',
      '支持自定义域名',
    ]
  },{
    title: '免费版',
    price: '99', // 现在的价格
    originalPrice: '244', // 原价
    unitPrice: '¥24/月', // 单价
    content: [
      '免费使用',
      '支持自定义域名',
    ]
  },{
    title: '免费版',
    price: '99', // 现在的价格
    originalPrice: '244', // 原价
    unitPrice: '¥24/月', // 单价
    content: [
      '免费使用',
      '支持自定义域名',
    ]
  }
]
</script>
<style lang="scss" scoped>
.subscribe-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 一行四列 */
  gap: 10px; /* 列之间的间距 */
}

.subscribe-list-item {
  background-color: #f0f0f0; /* 背景颜色 */
  padding: 20px; /* 内边距 */
  text-align: center; /* 文本居中 */
  border: 1px solid #f7d35d;
  border-radius: 12px;
}
</style>