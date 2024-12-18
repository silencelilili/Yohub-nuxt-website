import $api from './request';

/**
 * 获取工单列表
 * @param params
 * @returns
 */
export interface ITicketItem {
  id: string | number;
  title: string;
  userid: string | number;
  datetime: string;
  content: string;
  status: string;
  type: string;
}
export const getTicketList = () => {
  return $api.post('/user/ticket/list', {});
};

/**
 * 创建工单
 * @param params
 * {
 *   title: string;
 *   content: string;
 *   type: string;
 * }
 * @returns
 */
export const createTicket = (params: any) => {
  const formData = params; //new FormData();
  // formData.append('title', params.title + '');
  // formData.append('type', params.type + '');
  // formData.append('comment', params.comment + '');

  return $api.post('/user/ticket/create', formData);
};

/**
 * 获取工单详情
 * @param params
 * @returns
 */
export const getTicketDetail = (params: { id: string }) => {
  return $api.post('/user/ticket/view  ', params);
};
/**
 * 修改工单
 * @param params
 */
export const updateTicket = (id: string, params: any) => {
  return $api.put(`/user/ticket/${id}`, params);
};
