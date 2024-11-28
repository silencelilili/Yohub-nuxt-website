/**
 * 登录
 */
export interface ILoginParams {
  /** 账号/邮箱 */
  email: string;
  /** 密码 */
  password: string;
  remember_me: boolean;
  /** 用户两步验证码 */
  mfa_code?: string;
  /** cookie内容 */
  redir?: string;
}
export interface ILoginResponse {
  // 账号主键ID
  user_id: string;
}
/**
 * 注册
 */
export interface IRegisterParams {
  /** 账号/邮箱 */
  email: string;
  /** 密码 */
  password: string;
  /** 确认密码 */
  password_confirmation: string;
  /** 用户名 */
  name: string;
  /** 邀请码 */
  code?: string;
  /** 方式 */
  imtype?: string;
  /** 联系方式账号*/
  wechat?: string;
}
enum EImType {
  /** 微信 */
  'WECHAT' = '1',
  /** QQ */
  'QQ' = '2',
  /** Facebook */
  'FACEBOOK' = '3',
  /** Yelegram */
  'TELEGRAM' = '4',
}

/**
 * 用户信息
 */
export interface IUserInfo {
  id: number | null;
  user_name: string;
  email: string;
  money?: string;
  is_admin?: number;
  class_expire?: string;
  last_check_in_time?: string;
  last_login_time?: string;
  [x: string]: any;
}
