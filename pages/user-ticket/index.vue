<template>
  <div class="h-100%">
    <!-- 工单列表 -->
    <div v-if="pageType === 'list'" class="ticket-list">
      <div class="flex justify-between items-center mb-5">
        <span>我的工单</span>
        <el-button type="primary" @click="onJump('create')">创建新工单</el-button>
      </div>
      <div class="ticket-item" v-for="item in ticketList" :key="item.id">
        <div class="ticket-item-title">
          <div class="mb-6">{{ item.title }}</div>
          <span class="color-#999999">{{ item.datetime }}</span>
        </div>
        <div class="ticket-item-status">
          <el-tag @click="handleOpenDetail(item)" class="mr-6">{{ item.status }}</el-tag>
          <el-button v-if="item.status === 'closed'" class="mr-6" disabled>已结单</el-button>
          <el-button
            v-if="item.status === 'open_wait_admin'"
            type="primary"
            class="mr-6"
            @click="handleOpenDetail(item)"
            >进行中</el-button
          >
          <el-icon><ArrowRight /></el-icon>
        </div>
      </div>
    </div>

    <!-- 创建工单 -->
    <el-card v-if="pageType === 'create'" shadow="never" class="h-100%">
      <div class="mb-5 cursor-pointer">
        <el-icon @click="onJump('list')"><ArrowLeft /></el-icon> 创建工单
      </div>
      <el-form
        ref="formRef"
        style="max-width: 600px"
        :model="ticketForm"
        status-icon
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="主题" prop="title">
          <el-input v-model="ticketForm.title" autocomplete="off" placeholder="请输入工单主题" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="ticketForm.type" placeholder="请选择">
            <el-option label="使用" value="howto"></el-option>
            <el-option label="财务" value="billing"></el-option>
            <el-option label="账户" value="account"></el-option>
            <el-option label="其他" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="comment">
          <el-input
            v-model.number="ticketForm.comment"
            type="textarea"
            placeholder="请输入您遇到的问题，建议或需求..."
          />
        </el-form-item>
        <el-form-item class="text-center">
          <el-button type="primary" @click="submitForm(formRef)"> 创建工单 </el-button>

          <el-button
            @click="
              resetForm(formRef);
              onJump('list');
            "
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 工单详情 -->
    <div v-if="pageType === 'detail'">
      <div class="mb-5 cursor-pointer">
        <el-icon @click="onJump('list')"><ArrowLeft /></el-icon> 工单详情
        <div>
          <h3>{{ ticketDetailData.title }}</h3>
          <div>{{ ticketDetailData.comment }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getTicketList, createTicket, getTicketDetail } from '@/service/ticket';
definePageMeta({
  layout: 'custom',
  middleware: ['user-center'],
});
const pageType = ref('list');
onMounted(() => {
  _getTicketList();
});
const onJump = (type: string) => {
  pageType.value = type;
};
const handleCreateOrder = () => {
  pageType.value = 'create';
};

// 工单列表---------------
const ticketList = ref([]);
const _getTicketList = async () => {
  try {
    const res = await getTicketList();
    ticketList.value = res.data;
  } catch (error) {}
};

// 创建工单表单----------
const formRef = ref();
const ticketForm = reactive({
  title: '',
  type: '',
  comment: '',
});
const submitForm = (formEl: any) => {
  if (!formEl) return;
  formEl.validate(async (valid: boolean) => {
    if (valid) {
      // onSubmit();
      await createTicket(ticketForm);
      ElMessage.success('创建工单成功');
      onJump('list');
      _getTicketList();
    } else {
      return false;
    }
  });
};
const resetForm = (formEl: any) => {
  if (!formEl) return;
  formEl.resetFields();
};

// 工单详情----------
const ticketDetailData = ref({
  title: '',
  content: '',
  comment: '',
  datetime: '',
});
const handleOpenDetail = async (item: any) => {
  try {
    const res = await getTicketDetail({ id: item.id });
    ticketDetailData.value = res.data;
    const _content = res?.data?.content.map((i) => i.comment).join('<br/>') || '';
    ticketDetailData.value.comment = _content;
    pageType.value = 'detail';
  } catch (error) {
    console.log(error);
  }
};
</script>
<style lang="scss" scoped>
.ticket-list {
  .ticket-item {
    background: #fff;
    padding: 32px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 6px;
    margin-bottom: 12px;
  }
}
</style>
