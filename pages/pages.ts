import { User, MessageBox, CollectionTag, Present, DocumentAdd, Reading } from '@element-plus/icons-vue';

export const userNavList = [
  {
    title: '用户中心',
    name: 'user',
    path: '/user',
    icon: User,
    iconName: 'user-nav-mine',
  },
  {
    title: '我的账号',
    name: 'user-account',
    path: '/user-account',
    icon: MessageBox,
    iconName: 'user-nav-account',
  },
  {
    title: '我的订阅',
    name: 'user-subscribe',
    path: '/user-subscribe',
    icon: CollectionTag,
    iconName: 'user-nav-subscribe',
  },
  {
    title: '推广返利',
    name: 'user-extend',
    path: '/user-extend',
    icon: Present,
    iconName: 'user-nav-extend',
  },

  {
    title: '我的工单',
    name: 'user-ticket',
    path: '/user-ticket',
    icon: DocumentAdd,
    iconName: 'user-nav-order',
  },
  {
    title: '快速上手',
    name: 'user-guide',
    path: '/user-guide',
    icon: Reading,
    iconName: 'user-nav-guide',
  },
];
