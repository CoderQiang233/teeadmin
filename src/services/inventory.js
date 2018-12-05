
import request from '../utils/request';
import config from '../utils/config';
const { apiAdmin } = config;
//获取全部库存明细
export async function findAllTInventoryItem(data) {
  data.service = 'Inventory.GetInventoryRecordTotal';
  data.XDEBUG_SESSION_START = 14925;
  return request(apiAdmin,data);
}

//增加库存(总库存)
export async function addTotal(data) {
  data.service = 'Inventory.EditTotalInventory';
  data.XDEBUG_SESSION_START = 15855;
  return request(apiAdmin,data);
}

//代理库存列表
export async function findAllAgentInventory(data) {
  data.service = 'Inventory.GetInventoryAgent';
  data.XDEBUG_SESSION_START = 15855;
  return request(apiAdmin,data);
}

//查看代理单个商品库存明细
export async function findAgentProductInventory(data) {
  data.service = 'Inventory.GetAgentProductRecord';
  data.XDEBUG_SESSION_START = 13110;
  return request(apiAdmin,data);
}
