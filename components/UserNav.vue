<template>
  <div class="w-240px mr-4">
    <div class="bg-#fff h-100% user-nav">
      <div class="p-5">
        <div
          v-for="item in userNavList"
          :key="item.name"
          :class="['user-nav-item', item.name === activeItem ? 'nav-item-active' : '']"
          @click="handleClick(item)"
        >
          <NuxtIcon :name="item.iconName" style="font-size: 20px" />
          <!-- <component v-else :is="item.icon" style="width: 16px"></component> -->

          <span class="ml-4">{{ item.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { userNavList } from '~/pages/pages';
import { defineEmits } from 'vue';
import { useStore } from '@/store';

const emits = defineEmits(['jump']);
const router = useRouter();
const _initName = useStore().activeUserNavName;
const activeItem = ref(_initName);
onMounted(() => {
  activeItem.value = _initName;
  console.log('activeItem::::', activeItem.value);
});
const handleClick = (item: any) => {
  activeItem.value = item.name;
  router.push(item.path);
  emits('jump', item);
};
</script>
<style lang="scss" scoped>
.user-nav {
  .user-nav-item {
    height: 46px;
    line-height: 46px;
    // text-align: center;
    border-radius: 4px;
    margin-bottom: 8px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    &:hover {
      background: #3366ff;
      color: #fff;
      a {
        color: #fff;
      }
    }
  }
  .nav-item-active {
    background: #3366ff;
    color: #fff;
    a {
      color: #fff;
    }
  }
}
</style>
