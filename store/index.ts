import { defineStore, acceptHMRUpdate } from 'pinia';
import { getCookie } from '@/global/cookie';
import { login, logout, getUserInfo, type IUserInfo } from '~/service/user';

export const useStore = defineStore({
  id: 'index',
  state: () => ({
    isLogin: !!getCookie('key'),
    name: 'old name',
    activeHeaderNavName: '',
    activeUserNavName: '',
    userInfo: {
      id: null,
      email: '',
      user_name: '',
      money: '',
    },
  }),
  getters: {
    myName: (state) => {
      return `getters ${state.name}`;
    },
    getUserActiveNavName(state) {
      return state.activeUserNavName;
    },
    getUserInfo(state) {
      return state.userInfo;
    },
    isAuthenticated(state) {
      return state.isLogin || !!getCookie('key');
    },
  },
  actions: {
    changeName(name: string) {
      this.name = name;
    },
    setHeaderActiveNavName(name: string) {
      this.activeHeaderNavName = name;
    },
    setUserActiveNavName(name: string) {
      this.activeUserNavName = name;
    },

    // 登录
    asyncLogin(data: any) {
      return new Promise((resolve, reject) => {
        login(data)
          .then((res) => {
            this.setLoginStatus(true);
            resolve(true);
          })
          .catch((err) => {
            reject(err);
            this.setLoginStatus(false);
          });
      });
    },
    // 登录成功后根据UserId获取用户信息
    asyncGetUserInfo() {
      return new Promise((resolve, reject) => {
        if (this.isLogin && this.userInfo.user_name) {
          resolve(this.userInfo);
          return;
        }
        if (!this.isLogin) {
          return;
        }
        getUserInfo()
          .then((res) => {
            this.setInfo(res.data);
            this.setLoginStatus(true);
            resolve(res.data as IUserInfo);
          })
          .catch((err) => {
            this.setLoginStatus(false);
            console.log('getCurrentUserInfo err:', err);
            reject(err);
          });
      });
    },
    setInfo(data: any) {
      this.userInfo = data;
    },
    setLoginStatus(status: boolean) {
      this.isLogin = status;
    },

    // 退出登录
    asyncLogout() {
      return new Promise((resolve, reject) => {
        logout().then((res) => {
          this.setLoginStatus(false);
          this.setInfo({
            id: null,
            email: '',
            user_name: '',
            money: '',
          });
          resolve(true);
        });
      });
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
}
