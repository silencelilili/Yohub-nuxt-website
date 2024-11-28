// import { GET, POST, PUT, DELETE, fGET, fPOST, fPUT, fDELETE } from './index';
import $api from './request';
import type { ILoginParams, IRegisterParams, IUserInfo } from './types';
export * from './types';
/**
 * 账号密码 登录
 * @param params
 * @returns
 */
export const login = (params: ILoginParams) => {
  // return POST('/auth/login', params)
  return $api.post('/auth/login', params);
};

/**
 * 账号密码 注册
 * @param params
 * @returns
 */
export const register = (params: IRegisterParams) => {
  return $api.post('/auth/register', params);
};
/**
 * 退出登录
 * @returns
 */
export const logout = () => {
  return $api.post('/user/logout/ajax', {});
};

/**
 * 获取用户信息
 * @returns
 */
export const getUserInfo = (userId?: string | number) => {
  const formData = { user_id: userId }; // new FormData();
  // formData.append('user_id', userId + '');
  // return GET<IUserInfo>('/mod_mu/users')
  return $api.post<IUserInfo>('/user/get_user', formData);
};

/**
 * 修改用户名
 * @param
 * {
 * newusername:string
 * }
 * @returns
 */
export const updateUserName = (data = {}) => {
  return $api.post('/user/username', data);
};
/**
 * 修改密码
 * @returns
 */
interface IUpdatePasswordParams {
  /** 原密码 */
  password: string;
  /** 新密码 */
  new_password: string;
  /** 确认新密码 */
  confirm_new_password: string;
}
export const updatePassword = (data: IUpdatePasswordParams) => {
  return $api.post('/user/password', data);
};
/**
 * 重置密码
 * @param
 * {
 * email:string
 * }
 * @returns
 */
export const resetPassword = (data = {}) => {
  return $api.post('/user/passwd_reset', data);
};

/*******************************************
 * 第三方登录
 *******************************************/
/**
 * 微信扫码登录
 * @param params
 * @returns
 */
export const wechatLogin = (params: any) => {
  return $api.post('/auth/loginWechat', params);
};

/**
 * 拉取用户路由配置
 * @returns
 */
export const getConfigPost = (data: any) => {
  return $api.post('/user/config_post', data);
};
/**
 * 获取订单
 */
export const getOrderList = () => {
  return $api.post('/user/order/ajax', {});
};
