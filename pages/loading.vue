<template>
  <div>登录中......</div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
console.log(route.query, '-------');

// 点击相关按钮向后端发起请求
const getAccessToken = () => {
  let params = {
    code: route.query.code,
    state: route.query.state,
  };
  // api.getAccessToken(params).then((res: any) => {
  //   if (res.code == 200) {
  //     state.accessToken = res.data.accessToken;
  //     // 登录成功，并提示,跳转到用户主页面
  //     Message({
  //       type: 'success',
  //       message: '登录成功',
  //     });
  //     router.push({ path: '跳转指定页面' });
  //   }
  // });
};
</script>
<style lang="less" scoped></style>
