import request from '../utils/request';
import config from '../utils/config';

const { apiAdmin } = config;

export async function findAllGoodStatisticsList(param) {
    param.service='GoodStatistics.Getlist';
    return request(apiAdmin,param);
  }
