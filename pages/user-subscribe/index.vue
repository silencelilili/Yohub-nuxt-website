<template>
  <!-- <NuxtLayout name="custom"> -->
  <!-- <div>用户中心-我的订阅</div> -->
  <!-- </NuxtLayout> -->

  <el-card shadow="hover">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="选择订阅计划" name="1">
        <SubscribeVue type="user" />
      </el-tab-pane>
      <el-tab-pane label="我的历史订单" name="2">
        <div class="py-4">
          <el-table
            :data="historyOrderData"
            style="width: 100%"
            :header-cell-style="{ background: '#E8EDFA', color: '#333333' }"
            empty-text="无历史订单"
          >
            <el-table-column prop="id" label="订单编号" />
            <el-table-column prop="product_type" label="购买服务卡" />
            <el-table-column prop="price" label="订单金额" />
            <el-table-column prop="status" label="订单状态" />
            <el-table-column prop="create_time" label="创建时间" />
          </el-table>
          <div>
            <el-pagination
              :current-page="searchParams.currentPage"
              :page-size="searchParams.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="searchParams.total"
              @change="handlePageChange"
            />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script lang="ts" setup>
import SubscribeVue from '@/pages/subscribe/index.vue';
import { getOrderList } from '@/service/user';

definePageMeta({
  layout: 'custom',
  middleware: ['user-center'],
});

const activeName = ref('1');
const handleClick = () => {
  // console.log('click');
};

/**
 * 我的历史订单
 */
const historyOrderData = ref();
const searchParams = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 1000,
});
const getOrderListData = () => {
  getOrderList()
    .then((res) => {
      historyOrderData.value = res.orders as any;
    })
    .catch((err) => {
      console.error(err);
    });
};
getOrderListData();

// 分页
const handlePageChange = (currentPage: number, pageSize: number) => {
  searchParams.currentPage = currentPage;
  searchParams.pageSize = pageSize;
  console.log('searchParams::::', searchParams);
};
</script>
<style lang="scss" scoped></style>
