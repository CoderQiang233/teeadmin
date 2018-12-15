import request from '../utils/request';
import config from '../utils/config';
const { apiAdmin } = config;

//获取全部商品类别
export async function findAllGoodsType(data) {
  data.service = 'ProductType.GetList';
  data.XDEBUG_SESSION_START = 13201;
  return request(apiAdmin,data);
}

//新增商品类别
export async function insertGoodsType(data) {
  data.service = 'ProductType.Insert';
  data.XDEBUG_SESSION_START = 13201;
  return request(apiAdmin,data);
}

//查看商品类别
export async function findById(data) {
  data.service = 'ProductType.GetList';
  data.XDEBUG_SESSION_START = 13201;
  return request(apiAdmin,data);
}

//修改商品类别
export async function updateGoodsType(data) {
  data.service = 'ProductType.Update';
  data.XDEBUG_SESSION_START = 19904;
  return request(apiAdmin,data);
}

//删除商品类别
export async function deleteGoodsType(data) {
  data.service = 'ProductType.DeleteById';
  data.XDEBUG_SESSION_START = 19904;
  return request(apiAdmin,data);
}

export async function findTypeSelect(data){
  data.service = 'ProductType.GetSelect';
  data.XDEBUG_SESSION_START = 13201;
  return request(apiAdmin,data);
}