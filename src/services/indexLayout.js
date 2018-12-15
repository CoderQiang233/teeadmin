import request from '../utils/request';
import config from '../utils/config';
import axios from 'axios'
const { apiAdmin } = config;

export async function addModuleSer(param) {
  param.service = 'WeixinLayout.addModule';
  param.XDEBUG_SESSION_START = '18909';
  return request(apiAdmin, param);
}
export async function editModuleSer(param) {
    param.service = 'WeixinLayout.editModule';
    param.XDEBUG_SESSION_START = '18909';
    return request(apiAdmin, param);
  }
export async function getModuleList(param) {
    param.service = 'WeixinLayout.getModuleList';
    param.XDEBUG_SESSION_START = '18909';
    return request(apiAdmin, param);
  }
  export async function getProductOption(param) {
    param.service = 'WeixinLayout.getProductOption';
    param.XDEBUG_SESSION_START = '18909';
    return request(apiAdmin, param);
  }

  export async function deleteModule(param) {
    param.service = 'WeixinLayout.deleteModule';
    param.XDEBUG_SESSION_START = '18909';
    return request(apiAdmin, param);
  }