<template>
  <div class="mb-4">
    <!-- 我的账号 -->
    <el-row v-if="props.type === 'user-account'" :gutter="16">
      <el-col :span="24">
        <el-card style="height: 198px" shadow="hover" class="vip-bg">
          <div class="flex-center justify-between mt-6">
            <div class="flex-center">
              <img src="/assets/images/users/vip-logo@2x.png" alt="" class="w-90px" />

              <div class="ml-6">
                <div class="font-size-5 mb-3">
                  <div v-if="!isEdit" class="flex items-center">
                    <span>{{ userInfo.user_name }} </span>
                    <el-icon class="ml-4 cursor-pointer" @click="handleUpdateName"><Edit /></el-icon>
                    <!-- <span>{{ userInfo.class === 0 ? '免费' : 'Lv.' + userInfo.class }}</span> -->
                  </div>
                  <div v-else class="flex-center">
                    <el-input v-model="newUserName"></el-input>
                    <el-icon class="mx-4 cursor-pointer" color="red" @click="updateNameCancel"><Close /></el-icon>
                    <el-icon class="cursor-pointer" color="green" @click="updateNameConfirm"><Check /></el-icon>
                  </div>
                </div>
                <p class="color-#8F6E36">
                  您的VIP会员将在 <strong>{{ userInfo.class_expire_days ?? '-' }}</strong> 天后到期（{{
                    userInfo.class_expire
                  }}）
                </p>
              </div>
            </div>
            <el-button>修改头像</el-button>
          </div>

          <!--  -->
          <!-- <div class="flex">
            <div v-for="(item, index) in bannerList" :key="index" class="flex">
              <img :src="item.img" class="mb-4" style="width: 48px" />
              <p>{{ item.label[0] }}</p>
              <p>{{ item.label[1] }}</p>
            </div>
          </div> -->
        </el-card>
      </el-col>
    </el-row>

    <el-row v-else :gutter="16">
      <el-col :span="15">
        <el-card style="height: 198px" shadow="hover" class="vip-bg">
          <div class="flex-center justify-between mt-6">
            <img src="/assets/images/users/vip-logo@2x.png" alt="" class="w-90px" />
            <div class="ml-4">
              <div class="font-size-5 mb-3">{{ userInfo.user_name }}</div>
              <p class="color-#8F6E36">您的VIP会员将在 <strong>1725</strong> 天后到期（2029-06-04）</p>
            </div>
            <el-button>立即续订</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card style="height: 198px" shadow="hover" class="money-bg">
          <div>账户余额</div>
          <div class="text-center line-height-30">
            <span class="font-size-9">{{ userInfo.money }}</span> <span class="font-size-6">CNY</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';
import { updateUserName, type IUserInfo } from '~/service/user';
import { useStore } from '@/store/index';

import BannerPng1 from '@/assets/images/vip-banner-1@2x.png';
import BannerPng2 from '@/assets/images/vip-banner-2@2x.png';
import BannerPng3 from '@/assets/images/vip-banner-3@2x.png';
import BannerPng4 from '@/assets/images/vip-banner-4@2x.png';
import BannerPng5 from '@/assets/images/vip-banner-5@2x.png';
const props = defineProps({
  type: {
    type: String,
    default: '',
  },
});
const store = useStore();
const userInfo = ref<IUserInfo>({
  id: null,
  email: '',
  user_name: '',
  money: '',
});

const bannerList = [
  {
    img: BannerPng1,
    label: ['畅享全球', '影音直播服务'],
  },
  {
    img: BannerPng2,
    label: ['在线游戏', '低延时专线加'],
  },
  {
    img: BannerPng3,
    label: ['全球100+', '高速专线'],
  },
  {
    img: BannerPng4,
    label: ['全时段', '不限流不限速'],
  },
  {
    img: BannerPng5,
    label: ['多设备', '同时在线'],
  },
];

const activeNavName = computed(() => {
  return store.activeUserNavName;
});

onMounted(async () => {
  userInfo.value = (await store.asyncGetUserInfo()) as IUserInfo;
});

const isEdit = ref(false);
const newUserName = ref('');
const handleUpdateName = () => {
  isEdit.value = true;
  console.log('修改名称');
};
const updateNameConfirm = async () => {
  const _param = {
    newusername: newUserName.value,
  };
  await updateUserName(_param);
  isEdit.value = false;
  userInfo.value.user_name = newUserName.value;
  store.setInfo(userInfo.value);
  newUserName.value = '';
};
const updateNameCancel = () => {
  isEdit.value = false;
  newUserName.value = '';
};
</script>
<style lang="scss" scoped>
.vip-bg {
  background-image: url('/assets/images/users/bg_vip.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.money-bg {
  background-image: url('/assets/images/users/bg_money.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
