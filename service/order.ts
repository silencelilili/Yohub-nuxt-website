import $api from './request';
/**
 * 可购买商品列表
 */
export const getProductList = () => {
  return $api.post('/user/product', {});
};

/**
 * 校验优惠码(OK)
 * @param params
 * {
 *  coupon: 优惠码
 *  product_id: 商品id
 * }
 */
export const checkCoupon = (params: { coupon: string; product_id: string | number }) => {
  return $api.post('/user/coupon', params);
};

/**
 * 获取订单列表(OK)
 */
export const getOrderList = () => {
  return $api.post('/user/order/ajax', {});
};

/**
 * 创建订单
 * {
 *  coupon?: 优惠码
 *  product_id: 商品id
 * }
 */
export const createOrder = (params: { product_id: string | number; coupon?: string }) => {
  return $api.post('/user/order/create', params);
};

/**
 * 支付宝支付二维码
 * @param data 
 * {
  invoice_id: 订单id
  amount: 订单金额
 },
 @returns {
  qrcode: 支付二维码链接
  pid: 支付网关单号
 }
 */
export interface IAlipayQrcodeParams {
  /** 订单id */
  invoice_id: string | number;
  /** 订单金额 */
  amount: string | number;
}
export interface IAlipayQrcodeResult {
  /** 支付二维码链接 */
  qrcode: string;
  /** 支付网关单号 */
  pid: string;
  /** 接口状态 */
  ret: number;
}
export const getAlipayQrcode = (data: IAlipayQrcodeParams) => {
  return $api.post('/user/payment/purchase/f2f', data);
};

/**
 * 查询支付的状态
 * @param data { pid: 支付id }
 */
export const getAlipayStatus = (pid: string | number) => {
  const formData = new FormData();
  formData.append('pid', String(pid));
  return $api.post('/payment/status/f2f', formData);
};
