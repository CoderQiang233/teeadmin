import request from '../utils/request';
import config from '../utils/config';

const { apiAdmin } = config;

export async function findAllMember(param) {
    param.service='Member.GetMemberList';
    return request(apiAdmin,param);
  }
  export async function findCountByMemberLecel(param) {
    param.service='Member.GetMemberLevelCount';
    return request(apiAdmin,param);
  }
