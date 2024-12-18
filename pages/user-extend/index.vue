<template>
  <!-- 推广返利 -->
  <div>
    <UserInfoVue />
    <el-row :gutter="16">
      <el-col :span="15">
        <div class="mb-4">
          <el-card shadow="hover">
            <div class="mb-6">
              <p class="font-size-22px mb-4">我的消息</p>
              <div class="">
                <img src="/assets/images/users/share-pic@2x.png" class="w-100%" alt="" />
              </div>
            </div>

            <div>
              <p class="font-size-22px mb-4">活动规则</p>
              <el-alert style="background-color: #ffeee2; padding: 19px" :closable="false">
                <p class="color-#333333 fw-500 mb-4">1. 获得好友消费的前三单20%返利</p>
                邀请好友注册，在好友前三次完成VIP权益购买后，您将每次获得其消费金额的20%返利。
              </el-alert>
              <div class="h-5"></div>
              <el-alert style="background-color: #ffeee2; padding: 19px" :closable="false">
                <p class="color-#333333 fw-500 mb-4">2. 返利确认和用途</p>
                返利将在好友的消费订单完成支付，并过了退款期后自动存于您的余额中，您可以用于购买Yohub的所有服务。
              </el-alert>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="mb-4">
          <el-card style="height: 206px" shadow="hover">
            <p class="font-size-22px mb-4">我的返利</p>
            <div class="flex items-center justify-around h-full mt-8">
              <div>
                <p class="font-size-18px color-#666 mb-5">您已邀请</p>
                <p class="">
                  <span class="color-#3366FF font-size-6">200</span> 人
                  <el-icon style="vertical-align: -0.125em">
                    <ArrowRightBold />
                  </el-icon>
                </p>
              </div>
              <div>
                <p class="font-size-18px color-#666 mb-5">总返利金额</p>
                <p class=""><span class="color-#3366FF font-size-6">200</span> 元</p>
              </div>
            </div>
          </el-card>
        </div>
        <div class="mb-4">
          <el-card style="height: 480px" shadow="hover">
            <p class="font-size-22px mb-4">获取推广链接</p>
            <div class="mb-6">
              <p class="mb-3">
                <el-icon color="#3366FF"><Link /></el-icon>注册页链接
              </p>
              <el-space>
                <el-input v-model="inviteLink" style="width: 300px" disabled />
                <el-button type="primary" @click="copy">复制</el-button>
              </el-space>
            </div>

            <div>
              <p class="mb-3">生成推广海报</p>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import UserInfoVue from '@/components/UserInfo.vue';
import { getInviteInfo } from '@/service/user';
import { type IUserInfo } from '@/service/user';
import { useStore } from '@/store/index';

definePageMeta({
  layout: 'custom',
  middleware: ['user-center'],
});
const userInfo = ref<IUserInfo>();
const store = useStore();

// 推广链接
// const copyUrl = ref(location.origin + '/register?code=' + userInfo.value?.code);

const inviteLink = computed(() => {
  const code = (userInfo.value?.code || '') as string;
  return `${location.origin}/register?code=${code}`;
});
onMounted(async () => {
  userInfo.value = (await store.asyncGetUserInfo()) as IUserInfo;
  // copyUrl.value = location.origin + '/register?code=' + userInfo.value?.code;
  _getInviteInfoApi();
});
const copy = () => {
  navigator.clipboard.writeText(inviteLink.value);
  ElMessage.success('复制成功');
};

const _getInviteInfoApi = () => {
  getInviteInfo()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
};
</script>
<style lang="scss" scoped></style>
