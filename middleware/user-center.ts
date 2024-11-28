// export default function (context: any) {
//   console.log('middleware auth:', context);
//   if (!context.store.getters.isAuthenticated) {
//     context.redirect('/login');
//   }
// }
import { useStore } from '~/store/index';
export default defineNuxtRouteMiddleware((to, from) => {
  const _toName = to.name as string;
  useStore().setUserActiveNavName(_toName);
  return;
});
