import request from '../utils/request';
import config from '../utils/config';

const { apiAdmin } = config;

export async function getDepartmentList(param) {
    param.service='Department.GetDepartmentList';
    return request(apiAdmin,param);
  }

  export async function addDepartment(param) {
    param.service='Department.AddDepartment';
    return request(apiAdmin,param);
  }

  export async function deletDepartment(param) {
    param.service='Department.DeleteDepartment';
    return request(apiAdmin,param);
  }
  export async function editDepartment(param) {
    param.service='Department.EditDepartment';
    return request(apiAdmin,param);
  }