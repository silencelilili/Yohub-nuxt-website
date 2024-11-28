<template>
  <div class="login-form-wrap">
    <div class="flex flex-col h-full justify-around">
      <!-- 错误提示 -->
      <!-- <div>{{ apiErrorMsg }}</div> -->
      <div v-if="loginType === loginTypeEnum.PASSWORD">
        <div class="login-title">YoHub</div>
        <el-form ref="ruleFormRef" style="max-width: 600px" :model="formState" label-width="auto" status-icon>
          <el-form-item prop="email">
            <el-input v-model="formState.email" placeholder="请输入账号/电子邮件地址" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="formState.password" show-password placeholder="请输入密码" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="w-full h-60px" @click="handleLogin">登录</el-button>
          </el-form-item>
        </el-form>
        <div class="flex justify-between">
          <el-link :underline="false" class="desc-color" @click="toForgot">忘记密码?</el-link>
          <el-link type="primary" :underline="false" @click="toRegister">立即注册</el-link>
        </div>
      </div>
      <!-- 微信登录 -->
      <div v-if="loginType === loginTypeEnum.WECHAT">
        <WechatPage @back="handleChangeLoginType" />
      </div>
      <!-- 第三方登录方式 -->
      <div>
        <div class="flex justify-between">
          <div class="flex-1">
            <el-divider class="desc-color">第三方登录</el-divider>
          </div>
        </div>
        <el-row :gutter="20" class="third-row">
          <el-col :span="6"
            ><div class="third-item" @click="handleChangeLoginType(loginTypeEnum.GOOGLE)">
              <img src="/assets/images/google.png" alt="" />
            </div>
          </el-col>
          <el-col :span="6"
            ><div class="third-item" @click="handleChangeLoginType(loginTypeEnum.APPLE)">
              <img src="/assets/images/apple.png" alt="" /></div
          ></el-col>
          <el-col :span="6"
            ><div class="third-item" @click="handleChangeLoginType(loginTypeEnum.WECHAT)">
              <img src="/assets/images/wechat.png" alt="" /></div
          ></el-col>
          <el-col :span="6"
            ><div class="third-item" @click="handleChangeLoginType(loginTypeEnum.QQ)">
              <img src="/assets/images/qq.png" alt="" /></div
          ></el-col>
        </el-row>
        <div class="desc-color ft-14 color-#666666">成功登录即表示您同意我们的《隐私政策》和《服务协议》</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { login, getUserInfo, type ILoginParams } from '@/service/user';
import { useStore } from '@/store/index';
import WechatPage from './wechat.vue';
import { loginTypeEnum } from './config';
definePageMeta({
  layout: 'passport',
});

const loginType = ref(loginTypeEnum.PASSWORD);
const store = useStore();
const router = useRouter();
const formState = reactive<ILoginParams>({
  email: 'chenkunpeng@gmail.com',
  password: 'Yohub!@#321',
  remember_me: false,
  mfa_code: '',
});
const apiErrorMsg = ref('');
const handleLogin = () => {
  login(formState)
    .then((res) => {
      store.setLoginStatus(true);
      router.push({ path: '/' });
    })
    .catch((err) => {
      console.error(err);
      apiErrorMsg.value = err.msg;
    });
};

// TODO:注册
const toRegister = () => {
  router.push('/register');
};

// TODO:忘记密码
const toForgot = () => {
  router.push('/forgot');
};

// TODO: 第三方登录

// 切换登录方式
const handleChangeLoginType = (type: loginTypeEnum) => {
  loginType.value = type;
};
</script>

<style lang="scss" scoped>
.login-form-wrap {
  width: 25.5rem; // 408px
  // padding: 3rem /* 48/16 */;
  height: 100%;
  margin: 0 auto;
  .login-title {
    font-size: 2rem /* 32/16 */;
    text-align: center;
    margin-bottom: 3.75rem; /* 60/16 */
  }
}
.third-row {
  margin: 30px 0;
  .third-item {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid #666;
    text-align: center;
    margin: 0 auto;
    line-height: 48px;
    cursor: pointer;
  }
}
</style>
