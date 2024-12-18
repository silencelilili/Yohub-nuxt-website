// export default function (context: any) {
//   console.log('middleware auth:', context);
//   if (!context.store.getters.isAuthenticated) {
//     context.redirect('/login');
//   }
// }
import { useStore } from '~/store/index';
export default defineNuxtRouteMiddleware((to, from) => {
  // let authURL = ['/user', '/user-account', '/user-subscribe', '/user-extend', '/user-guide', '/user-ticket'];
  // const store = useStore();
  const _toName = to.path as string;
  useStore().setHeaderActiveNavName(_toName);
  return;
});
