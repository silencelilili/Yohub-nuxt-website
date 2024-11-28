<template>
  <div class="login-form-wrap">
    <div class="flex flex-col h-full justify-around m-9">
      <!-- 错误提示 -->
      <!-- <div>{{ apiErrorMsg }}</div> -->
      <div class="login-title">创建YoHub账号</div>
      <el-form ref="ruleFormRef" :model="formState" :rules="rules" label-width="auto" status-icon>
        <el-form-item prop="name">
          <el-input v-model="formState.name" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="formState.email" placeholder="请输入账号/电子邮件地址" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formState.password" type="password" placeholder="请输入登录密码" />
        </el-form-item>
        <el-form-item prop="password_confirmation">
          <el-input v-model="formState.password_confirmation" type="password" placeholder="请确认登录密码" />
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="formState.code" placeholder="请输入注册邀请码（可选）" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w-full h-60px" @click="handleSubmit(ruleFormRef)">注册</el-button>
        </el-form-item>
      </el-form>

      <p>已有账号？<el-link :underline="false" @click="toLogin">登录</el-link></p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { register } from '~/service/user';
import type { ComponentSize, FormInstance, FormRules } from 'element-plus';
definePageMeta({
  layout: 'passport',
});
const router = useRouter();
const ruleFormRef = ref();
const formState = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  code: '', // 邮箱验证码
});
const rules = {
  name: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 3, max: 5, message: '昵称长度3至5个字符', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, max: 16, message: '密码长度8至16个字符', trigger: 'blur' },
  ],
  password_confirmation: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    { min: 8, max: 16, message: '确认密码长度8至16个字符', trigger: 'blur' },
  ],
};
// 提交
const handleSubmit = async (formEl: FormInstance | undefined) => {
  // TODO:
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      register(formState)
        .then((res) => {
          console.log(res);
          ElMessage.success('注册成功');
          toLogin();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log('error submit!', fields);
    }
  });
};

// 登录
const toLogin = () => {
  router.push({ path: '/login' });
};
</script>

<style lang="scss" scoped>
.login-title {
  font-size: 2rem /* 32/16 */;
  text-align: center;
  margin-bottom: 3.75rem; /* 60/16 */
}
</style>
