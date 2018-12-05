import request from '../utils/request';
import config from '../utils/config';

const { apiAdmin } = config;

export async function findAllCompanyList(param) {
  param.service = 'CompanyProfile.Getlist';
  return request(apiAdmin, param);
}

export async function insertCompany(param) {
  param.service = 'CompanyProfile.Insert';
  return request(apiAdmin, param);
}
export async function deleteById(param) {
  param.service = 'CompanyProfile.DeleteById';
  return request(apiAdmin, param);
}
export async function updateCompany(param) {
  param.service = 'CompanyProfile.Update';
  return request(apiAdmin, param);
}
export async function changeCompany(param) {
  param.service = 'CompanyProfile.Change';
  return request(apiAdmin, param);
}