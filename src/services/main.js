import request from '../utils/request';
import config from '../utils/config';
const { apiAdmin } = config;
//获取订单总数,总销售额，总客户数
export async function findAllCount(data) {
  data.service = 'Index.GetProductOrderCount';
  data.XDEBUG_SESSION_START = 15291;
  return request(apiAdmin,data);
}
//获取最新6条订单
export async function findNewest(data) {
  data.service = 'Index.GetProductOrderNewest';
  data.XDEBUG_SESSION_START = 17953;
  return request(apiAdmin,data);
}







