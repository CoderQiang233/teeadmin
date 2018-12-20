import request from '../utils/request';
import config from '../utils/config';

const { apiAdmin } = config;

export async function findAllGoodStatisticsList(param) {
    param.service='GoodStatistics.Getlist';
    param.XDEBUG_SESSION_START = 17867;
    return request(apiAdmin,param);
  }
