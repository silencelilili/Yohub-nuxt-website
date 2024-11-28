<template>
  <!-- 我的账号 -->
  <div>
    <el-row :gutter="16">
      <el-col :span="14">
        <div class="mb-4 h-100%">
          <el-card shadow="hover" class="h-100%">
            <p class="font-size-22px">身份信息</p>

            <div class="account-left">
              <div class="item flex-center justify-between">
                <span class="label">邮箱</span>
                <span class="value">未绑定</span>
                <span class="operation">
                  <el-link :underline="false" type="primary" @click="handleUpdateEmail">更改</el-link>
                </span>
              </div>
              <div class="item flex-center justify-between">
                <span class="label">手机号</span>
                <span class="value">未绑定</span>
                <span class="operation">
                  <el-link :underline="false" type="primary" @click="handleUpdatePhone">去绑定</el-link>
                </span>
              </div>
              <div class="item flex-center justify-between">
                <span class="label">密码</span>
                <span class="value">*********</span>
                <span class="operation">
                  <el-link :underline="false" type="primary" @click="handleUpdatePassword">设置密码</el-link>
                </span>
              </div>
              <div class="item flex-center justify-between">
                <span class="label">实名认证</span>
                <span class="value">未认证</span>
                <span class="operation">
                  <el-link :underline="false" type="primary" @click="handleUpdateRealName">去认证</el-link>
                </span>
              </div>
            </div>

            <el-alert :closable="false" style="line-height: 24px; background-color: #e2f4ff; color: #999999">
              实名认证使用条款<br />
              根据《中华人民共和国网络安全法》及相关法律规定，用户加速社交类应用前必须完成实名认证。当前实名认证服务由“支付宝”提供，请用户提前安装并认证相关应用。
              您提交的身份信息仅用作实名认证使用，Yohub承诺不将其应用于任何其他场景，更不会透露给其他第三方。
            </el-alert>
          </el-card>
        </div>
      </el-col>

      <el-col :span="10">
        <div class="mb-4 h-100%">
          <el-card shadow="hover" class="h-100%">
            <p class="font-size-22px mb-10">第三方账号绑定</p>
            <div class="account-right">
              <div class="item flex-center justify-between bg-#E2FFEA">
                <img src="/assets/images/wechat.png" alt="" class="w-10" />
                <span class="value"> 微信 </span>
                <span class="operation">
                  <span>去绑定</span>
                </span>
              </div>
              <div class="item flex-center justify-between bg-#E2F4FF">
                <img src="/assets/images/qq.png" alt="" class="w-10" />
                <span class="value">QQ</span>
                <span class="operation">
                  <span>去绑定</span>
                </span>
              </div>
              <div class="item flex-center justify-between bg-#E4E9FF">
                <img src="/assets/images/facebook.png" alt="" class="h-10 w-10" />
                <span class="value">Facebook</span>
                <span class="operation">
                  <span>去绑定</span>
                </span>
              </div>
              <div class="item flex-center justify-between bg-#FFF7E1">
                <img src="/assets/images/google.png" alt="" class="w-10" />
                <span class="value">Google</span>
                <span class="operation">
                  <span>去绑定</span>
                </span>
              </div>
              <div class="item flex-center justify-between bg-#F4F4F4">
                <img src="/assets/images/apple.png" alt="" class="w-10" />
                <span class="value">Apple ID</span>
                <span class="operation">
                  <span>去绑定</span>
                </span>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <!-- 绑定手机号 dialog -->
    <el-dialog v-model="phoneDialogVisible" title="绑定手机号" width="480" center align-center>
      <el-form :model="phoneForm" class="p-5">
        <el-form-item>
          <el-input
            v-model="phoneForm.phone"
            minlength="11"
            maxlength="11"
            autocomplete="off"
            placeholder="请输入手机号"
          >
            <template #prepend>
              <el-select v-model="phonePrepend" placeholder="Select" style="width: 86px">
                <el-option label="+86" value="+86" />
              </el-select>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-space class="w-100%">
            <el-input v-model="phoneForm.code" class="flex-1" autocomplete="off" placeholder="请输入验证码" />
            <el-button>发送验证码</el-button>
          </el-space>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="phoneDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updatePhoneConfirm"> 绑定 </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 绑定邮箱 dialog -->
    <el-dialog v-model="emailDialogVisible" title="绑定邮箱" width="480" center align-center>
      <el-form :model="emailForm" class="p-5">
        <el-form-item>
          <el-input v-model="emailForm.email" autocomplete="off" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item>
          <el-space class="w-100%">
            <el-input v-model="emailForm.code" class="flex-1" autocomplete="off" placeholder="请输入验证码" />
            <el-button>发送验证码</el-button>
          </el-space>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="emailDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updateEmailConfirm"> 绑定 </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 修改密码 dialog -->
    <el-dialog v-model="passwordDialogVisible" title="设置密码" width="480" center align-center>
      <el-form :model="passwordForm" class="p-5">
        <el-form-item>
          <el-input
            v-model="passwordForm.password"
            type="password"
            minlength="8"
            maxlength="16"
            autocomplete="off"
            placeholder="请输入旧密码"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="passwordForm.new_password"
            type="password"
            minlength="8"
            maxlength="16"
            autocomplete="off"
            placeholder="请输入新密码"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="passwordForm.confirm_new_password"
            type="password"
            minlength="8"
            maxlength="16"
            autocomplete="off"
            placeholder="请再次输入新密码"
          />
        </el-form-item>
        <p>
          *<span class="color-#999999">
            密码必须为8-16位，包含大小写字母、数字或特殊字符至少3种类型字符的组合，请勿使用旧密码。</span
          >
        </p>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="passwordDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updatePasswordConfirm"> 保存 </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 实名认证 dialog -->
    <el-dialog v-model="realNameDialogVisible" title="实名认证" width="480" :footer="false" center align-center>
      <div>实名认证</div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { updatePassword } from '@/service/user';
import { useStore } from '@/store/index';
definePageMeta({
  layout: 'custom',
  middleware: ['user-center'],
});
const store = useStore();
const router = useRouter();

// TODO:修改手机号
const phoneDialogVisible = ref(false);
const phoneForm = reactive({
  phone: '',
  code: '',
});
const phonePrepend = ref('+86');
const handleUpdatePhone = () => {
  phoneDialogVisible.value = true;
};
const updatePhoneConfirm = async () => {
  phoneDialogVisible.value = false;
};

// TODO:修改邮箱接口
const emailDialogVisible = ref(false);
const emailForm = reactive({
  email: '',
  code: '',
});
const handleUpdateEmail = () => {
  emailDialogVisible.value = true;
};
const updateEmailConfirm = async () => {
  emailDialogVisible.value = false;
};

// TODO:修改密码
const passwordDialogVisible = ref(false);
const passwordForm = reactive({
  password: '',
  new_password: '',
  confirm_new_password: '',
});
const handleUpdatePassword = async () => {
  passwordDialogVisible.value = true;
};
const updatePasswordConfirm = async () => {
  const res = await updatePassword(passwordForm);
  passwordDialogVisible.value = false;
  console.log(res);
  ElMessage.success('修改成功，请重新登录');
  store.asyncLogout();
  // 跳转登录页
  router.push('/login');
};

// TODO:实名认证
const realNameDialogVisible = ref(false);
const realNameForm = reactive({
  real_name: '',
  id_card: '',
  id_card_front: '',
  id_card_back: '',
});
const handleUpdateRealName = () => {
  realNameDialogVisible.value = true;
};
const updateRealNameConfirm = async () => {
  realNameDialogVisible.value = false;
};
</script>
<style lang="scss" scoped>
.account-left {
  margin: 2.375rem 1rem 0 1rem;
  font-size: 1.125rem /* 18/16 */;
  .item {
    margin-bottom: 2.375rem;
    .label {
      width: 6.25rem /* 100/16 */;
    }
    .value {
      flex: 1;
      text-align: left;
    }
  }
}
.account-right {
  .item {
    // height: 6rem /* 96/16 */;
    padding: 22px;
    margin-bottom: 14px;
    border-radius: 8px;
  }
  .value {
    flex: 1;
    text-align: left;
  }
  .operation {
    cursor: pointer;
  }
}
</style>
