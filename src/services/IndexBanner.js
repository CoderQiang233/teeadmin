import request from '../utils/request';
import config from '../utils/config';
import axios from 'axios'
const { apiAdmin } = config;

export async function findAllIndexBannerList(param) {
  param.service = 'IndexBanner.Getlist';
  return request(apiAdmin, param);
}

export async function insertIndexBanner(param) {
  param.service = 'IndexBanner.UploadBanner';
  return request(apiAdmin, param);
}
export async function deleteById(param) {
  console.log(param);
  param.service = 'IndexBanner.DeleteBanner';
  return request(apiAdmin, param);
}
export async function updateIndexBanner(param) {
  param.service = 'IndexBanner.ModifyBanner';
  return request(apiAdmin, param);
}
