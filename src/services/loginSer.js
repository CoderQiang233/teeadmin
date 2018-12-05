
import request from '../utils/request';
import config from '../utils/config';

const { apiAdmin } = config;

export async function login(param) {
    param.service = 'Login.Login';
    return request(apiAdmin, param);
}
export async function editPwd(param) {
    param.service='UserManager.EditPwd';
    param.XDEBUG_SESSION_START=15291;
    return request(apiAdmin,param);
  }