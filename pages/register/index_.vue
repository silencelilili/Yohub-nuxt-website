<template>
  <div class="login-form-wrap">
    <div class="flex flex-col h-full justify-around">
      <!-- 错误提示 -->
      <!-- <div>{{ apiErrorMsg }}</div> -->

      <!-- step1: 创建账号 -->
      <div v-if="registerStep === 1">
        <div class="login-title">创建YoHub账号</div>
        <el-form ref="ruleFormRef" style="max-width: 600px" :model="formState" label-width="auto" status-icon>
          <el-form-item prop="email">
            <el-input v-model="formState.email" placeholder="请输入账号/电子邮件地址" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="w-full h-60px" @click="handleSubmit">继续</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- step2: 邮箱验证码验证 -->
      <div v-if="registerStep === 2" class="flex flex-col justify-center items-center">
        <p>请检查您收件箱和垃圾邮件箱文件夹，看是否有验证码已发送至邮箱：</p>
        <p class="fw-500">{{ formState.email }}</p>
        <!-- 6位输入框 -->
        <p>未收到验证码？ <el-link @click="reSend">重新发送</el-link></p>
        <p>已有账号？<el-link @click="toLogin">登录</el-link></p>
      </div>

      <!-- step3: 验证结果 -->
      <div v-if="registerStep === 3" class="flex flex-col justify-center items-center">
        <el-result title="恭喜您">
          <template #content>
            <p>已成功创建YoHub账号！</p>
            <p>{{ formState.email }}</p>
          </template>
          <el-button type="primary" class="h-60px" @click="toLogin">使用创建账号登录</el-button>
        </el-result>
        <p>邮箱地址错误？<el-link>返回</el-link></p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: 'passport',
});
const router = useRouter();
const formState = reactive({
  email: '',
  code: '', // 邮箱验证码
});
// 1: 账号输入；2: 邮箱验证码；3: 注册结果
const registerStep = ref(1);
// 提交
const handleSubmit = () => {
  // TODO:
  console.log(formState);
};

// 重新发送
const reSend = () => {};
// 登录
const toLogin = () => {
  router.push({ path: '/login' });
};
</script>

<style lang="scss" scoped></style>
