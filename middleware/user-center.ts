// export default function (context: any) {
//   console.log('middleware auth:', context);
//   if (!context.store.getters.isAuthenticated) {
//     context.redirect('/login');
//   }
// }
import { useStore } from '~/store/index';
export default defineNuxtRouteMiddleware((to, from) => {
  const store = useStore();
  if (!store.isLogin && to.path !== '/') {
    console.log('user-center 中间件---未登录, isLogin:', store.isLogin);
    return navigateTo('/');
  } else {
    const _toName = to.name as string;
    useStore().setUserActiveNavName(_toName);
    console.log('user-center 中间件---已登录', to.path, store.isLogin);
    return;
  }
});
