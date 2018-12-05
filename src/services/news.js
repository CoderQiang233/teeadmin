import request from '../utils/request';
import config from '../utils/config';

const { apiAdmin } = config;

export async function findAllNewsList(param) {
  param.service = 'News.Getlist';
  return request(apiAdmin, param);
}

export async function insertNews(param) {
  param.service = 'News.Insert';
  return request(apiAdmin, param);
}
export async function deleteById(param) {
  param.service = 'News.DeleteById';
  return request(apiAdmin, param);
}
export async function updateNews(param) {
  param.service = 'News.Update';
  return request(apiAdmin, param);
}
export async function changeNews(param) {
  param.service = 'News.Change';
  return request(apiAdmin, param);
}