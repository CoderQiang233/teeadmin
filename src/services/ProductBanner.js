import request from '../utils/request';
import config from '../utils/config';
import axios from 'axios'
const { apiAdmin } = config;

export async function findAllProductBannerList(param) {
  param.service = 'ProductBanner.Getlist';
  return request(apiAdmin, param);
}

export async function insertProductBanner(param) {
  param.service = 'ProductBanner.UploadBanner';
  return request(apiAdmin, param);
}
export async function deleteById(param) {
  param.service = 'ProductBanner.DeleteBanner';
  return request(apiAdmin, param);
}
export async function updateProductBanner(param) {
  param.service = 'ProductBanner.ModifyBanner';
  return request(apiAdmin, param);
}
export async function changeProductBanner(param) {
  param.service = 'ProductBanner.Change';
  return request(apiAdmin, param);
}