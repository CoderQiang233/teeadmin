import request from '../utils/request';
import config from '../utils/config';

const { apiAdmin } = config;

export async function findAllOrderStatisticsList(param) {
    param.service='OrderStatistics.Getlist';
    return request(apiAdmin,param);
  }
