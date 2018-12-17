
import axios from 'axios'
import request from '../utils/request';
import config from '../utils/config';
const { apiAdmin } = config;
//获取全部商品
export async function findAllGoods(data) {
  data.service = 'Product.Getlist';
  data.XDEBUG_SESSION_START = 16026;
  return request(apiAdmin,data);
}

//新增商品
export async function insertGoods(data) {
  data.service = 'Product.Insert';
  data.XDEBUG_SESSION_START = 13563;
  return request(apiAdmin,data);
}

//查看商品
export async function findById(data) {
  data.service = 'Product.GetById';
  data.XDEBUG_SESSION_START = 14925;
  return request(apiAdmin,data);
}

//修改商品
export async function updateGoods(data) {
  data.service = 'Product.Update';
  data.XDEBUG_SESSION_START = 13563;
  return request(apiAdmin,data);
}

//删除商品
export async function deleteGoods(data) {
  data.service = 'Product.DeleteById';
  data.XDEBUG_SESSION_START = 14925;
  return request(apiAdmin,data);
}

//查看全部商品类别
export async function findAllType(data) {
  data.service = 'ProductType.GetSelectAll';
  data.XDEBUG_SESSION_START = 14925;
  return request(apiAdmin,data);
}

//商品上下架  上下架(1:上架,2:下架)
export async function productUpDown(data) {
  data.service = 'Product.ProductUpDown';
  data.XDEBUG_SESSION_START = 14925;
  return request(apiAdmin,data);
}


