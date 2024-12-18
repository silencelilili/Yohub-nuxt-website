<template>
  <!-- 用户中心 -->
  <div>
    <UserInfoVue type="user" />
    <el-row :gutter="16">
      <el-col :span="15">
        <!-- 我的消息 -->
        <div class="mb-4">
          <el-card shadow="hover">
            <p class="font-size-22px mb-6">我的消息</p>
            <div>
              <div class="message-item">
                <div class="flex-center justify-between mb-4">
                  <el-text tag="b">系统消息</el-text>
                  <el-text class="mx-1" type="info">2024-12-01</el-text>
                </div>
                <el-text line-clamp="2">
                  The -webkit-line-clamp CSS
                  propert消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容 allows limiting of the
                  contents of消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容 a block to the
                  specified number of lines.
                </el-text>
                <div></div>
              </div>

              <div class="message-item">
                <div class="flex-center justify-between mb-4">
                  <el-text tag="b">系统消息</el-text>
                  <el-text class="mx-1" type="info">2024-12-01</el-text>
                </div>
                <el-text line-clamp="2">
                  The -webkit-line-clamp CSS
                  propert消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容 allows limiting of the
                  contents of消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容 a block to the
                  specified number of lines.
                </el-text>
                <div></div>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="9">
        <!-- 在线终端 -->
        <div class="mb-4">
          <el-card style="height: 280px" shadow="hover">
            <p class="flex-center justify-between mb-4">
              <span class="font-size-22px">在线终端</span>
              <span>2/5台</span>
            </p>

            <div>
              <div class="device-item">
                <el-text tag="b">1. Iphone</el-text>
                <el-button type="primary">下线</el-button>
              </div>
              <div class="device-item">
                <el-text tag="b">2. Mac OS 5.0.1</el-text>
                <el-button type="primary">下线</el-button>
              </div>
            </div>
          </el-card>
        </div>

        <!-- 流量统计 -->
        <div class="mb-4">
          <el-card style="height: 500px" shadow="hover">
            <p class="flex-center justify-between mb-4">
              <span class="font-size-24px">流量统计</span>
              <el-text class="mx-1" type="primary">近七天</el-text>
            </p>
            <div class="text-center">总流量 <el-text type="primary" tag="b" class="font-size-22px">4.6G</el-text></div>
            <div ref="chartDom" style="width: 400px; height: 380px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import UserInfoVue from '@/components/UserInfo.vue';
import { getCurrentInstance } from 'vue';
import { getTrafficInfo, getNoticeContent } from '@/service/user';
definePageMeta({
  layout: 'custom',
  middleware: ['user-center'],
});

const chartDom = ref(null);
let internalInstance = getCurrentInstance();
onMounted(() => {
  initBar();
  _getNoticeContentApi();
  _getTrafficInfoApi();
});

// 获取公告
const _getNoticeContentApi = () => {
  getNoticeContent().then((res) => {
    console.log('getNoticeContent res::::', res);
  });
};
// 获取流量
const _getTrafficInfoApi = () => {
  getTrafficInfo().then((res) => {
    console.log('getTrafficInfo res::::', res);
  });
};

// 柱状图
const initBar = () => {
  const myEChart = internalInstance?.appContext.config.globalProperties.$echarts.init(chartDom.value);
  const option = {
    grid: {
      left: '0',
      right: '1%',
      bottom: '1%',
      top: '36',
      containLabel: true,
    },
    color: ['#87DD8B', '#3366FF'],
    legend: {
      itemGap: 90,
      itemWidth: 20,
      itemHeight: 10,
      itemStyle: {
        borderCap: 'round',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '上行',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series',
        },
        barWidth: 20,
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: '下行',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series',
        },
        barWidth: 20,
        data: [120, 132, 101, 134, 90, 230, 210],
      },
    ],
  };
  myEChart.setOption(option);
  // 根据页面大小自动响应图表大小
  window.addEventListener('resize', function () {
    myEChart.resize();
  });
};
</script>
<style lang="scss" scoped>
.message-item {
  background: #fdfcfc;
  border-radius: 2px;
  border: 1px solid #e9e9e9;
  padding: 16px;
  margin-bottom: 16px;
}

.device-item {
  background: rgba(164, 178, 222, 0.25);
  border-radius: 2px;
  padding: 8px 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
