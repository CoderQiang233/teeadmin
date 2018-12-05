

import request from '../utils/request';
import config from '../utils/config';
import { getFakeChartData } from '../mock/chart';

const { apiAdmin } = config;



export async function test(param) {
  param.service = 'Login.Test';
  return request(apiAdmin, param);
}

export async function getCurrent(param) {
  param.service ='UserManager.GetCurrentUser';
  return request(apiAdmin,param);
  // return {
  //   $desc: "获取当前用户接口",
  //   $params: {
  //     pageSize: {
  //       desc: '分页',
  //       exp: 2,
  //     },
  //   },
  //   $body: {
  //     name: 'Serati Ma',
  //     avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  //     userid: '00000001',
  //     notifyCount: 12,
  //   },
  // }

}

export async function queryNotices(param) {

  return [




  ];


}

export async function fakeChartData() {

  return getFakeChartData;
}