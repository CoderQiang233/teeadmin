import request from '../utils/request';
import config from '../utils/config';

const { apiAdmin } = config;

export async function findAllSecurity(param) {
    param.service='SecurityCode.GetSecurityCodeList';
    return request(apiAdmin,param);
  }

  export async function generateSecurityCode(param) {
    param.service='SecurityCode.GenerateSecurityCode';
    return request(apiAdmin,param);
  }