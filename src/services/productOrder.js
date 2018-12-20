import request from '../utils/request';
import config from '../utils/config';
const { apiAdmin } = config;
//获取全部商品订单列表
export async function findAllProductOrder(data) {
  data.service = 'ProductOrder.GetProductOrderList';
  data.XDEBUG_SESSION_START = 15291;
  return request(apiAdmin,data);
}
//获取商品订单详情
export async function findById(data) {
  data.service = 'ProductOrder.GetById';
  data.XDEBUG_SESSION_START = 17953;
  return request(apiAdmin,data);
}

//发货
export async function ship(data) {
  data.service = 'ProductOrder.Shipments';
  data.XDEBUG_SESSION_START = 17051;
  return request(apiAdmin,data);
}





