<template>
  <div>
    <el-button text @click="emits('back', 'password')">
      <el-icon><ArrowLeftBold /></el-icon> 返回
    </el-button>
  </div>
</template>
<script lang="ts" setup>
// import QC from '@/utils/qc_jssdk';
import { getQqQrcode } from '@/service/user';
const emits = defineEmits(['back']);
onMounted(() => {
  _getQqQrcode();
});
const _getQqQrcode = async () => {
  const res = await getQqQrcode();
  console.log('getQqQrcode------', res.data);
  // QC.Login.showPopup({
  //   appId: '102543202', // 填写在QQ互联上申请的AppId
  //   redirectURI: res.data, //填写回调地址 登录成功后会自动跳往该地址
  // });
};
</script>
<style lang="less" scoped></style>
