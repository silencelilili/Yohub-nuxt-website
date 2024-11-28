// export default function (context: any) {
//   console.log('middleware auth:', context);
//   if (!context.store.getters.isAuthenticated) {
//     context.redirect('/login');
//   }
// }
import { useStore } from '~/store/index';
export default defineNuxtRouteMiddleware((to, from) => {
  let passURL = ['/', '/login', '/register', '/forgot', '/download', '/subscribe'];
  const store = useStore();
  const _toName = to.path as string;
  useStore().setHeaderActiveNavName(_toName);
  if (!passURL.includes(to.path) && !store.isLogin) {
    console.log('auth.global 中间件---未登录, isLogin:', store.isLogin);
    return navigateTo('/login');
  } else {
    console.log('auth.global 中间件---已登录/无需登录', to.path);
    return;
  }
});
