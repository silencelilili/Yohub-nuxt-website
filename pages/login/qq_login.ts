import { getQqQrcode } from '@/service/user';

const _open = async (url: string) => {
  // 获取宽度
  let width = document.body.clientWidth / 3;
  // 获取高度
  let height = document.body.clientHeight / 2;
  height = height <= 400 ? 400 : height;
  width = width <= 500 ? 500 : width;
  // 顶部偏移量
  let top = document.body.clientHeight / 4;
  // 'https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=申请的appid&response_type=token&scope=all&redirect_uri=申请时填写的回调地址'
  let newPage = window.open(
    url,
    '_blank', // 打开新窗口
    'location=yes, width=' + width + ', height=' + height + ',top=' + top + ',left=' + width, // 新窗口的位置，大小
  );
};
const qqLogin = async () => {
  const res = await getQqQrcode();
  console.log('getQqQrcode------', res.data);
  _open(res.qCodeUrl);
};
export default qqLogin;
