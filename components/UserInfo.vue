<template>
  <div class="mb-4">
    <!-- 我的账号 -->
    <el-row v-if="activeNavName === 'user-account'" :gutter="16">
      <el-col :span="24">
        <el-card style="height: 198px" shadow="hover" class="vip-bg">
          <div class="flex-center justify-between mt-6">
            <div class="flex-center">
              <img src="/assets/images/users/vip-logo@2x.png" alt="" class="w-90px" />

              <div class="ml-6">
                <div class="font-size-5 mb-3">
                  <div v-if="!isEdit" class="flex items-center">
                    <span>{{ userInfo.user_name }}</span>
                    <el-icon class="ml-4 cursor-pointer" @click="handleUpdateName"><Edit /></el-icon>
                  </div>
                  <div v-else class="flex-center">
                    <el-input v-model="newUserName"></el-input>
                    <el-icon class="mx-4 cursor-pointer" color="red" @click="updateNameCancel"><Close /></el-icon>
                    <el-icon class="cursor-pointer" color="green" @click="updateNameConfirm"><Check /></el-icon>
                  </div>
                </div>
                <p class="color-#8F6E36">您的VIP会员将在 <strong>1725</strong> 天后到期（2029-06-04）</p>
              </div>
            </div>
            <el-button>修改头像</el-button>
          </div>
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
import { updateUserName, type IUserInfo } from '~/service/user';
import { useStore } from '@/store/index';
const store = useStore();
const userInfo = ref<IUserInfo>({
  id: null,
  email: '',
  user_name: '',
  money: '',
});
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
