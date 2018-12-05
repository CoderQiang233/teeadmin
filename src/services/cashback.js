import request from '../utils/request';
import config from '../utils/config';

const { apiAdmin } = config;

export async function findAllCashbackList(param) {
  param.service = 'AgentCashback.GetMemberList';
  return request(apiAdmin, param);
}

export async function findAllCashbackListMsg(param) {
  param.service = 'AgentCashback.GetAgentCashbackList';
  param.XDEBUG_SESSION_START=16436;
  console.log(13,param)
  return request(apiAdmin, param);
}
export async function findAllMonthRecord(param) {
  param.service = 'AgentCashback.GetMemberListMsg';
  param.XDEBUG_SESSION_START=16436;
  return request(apiAdmin, param);
}
export async function updateCashStatus(param) {
  param.service = 'AgentCashback.UpdateCashStatus';
  return request(apiAdmin, param);
}
export async function findAllCashbackListMonth(param) {
  param.service = 'AgentCashback.GetAgentCashbackMonthList';
  return request(apiAdmin, param);
}