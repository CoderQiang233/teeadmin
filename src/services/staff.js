import request from '../utils/request';
import config from '../utils/config';

const { apiAdmin } = config;

export async function getStaffList(param) {
    param.service='Staff.GetStaffList';
    return request(apiAdmin,param);
  }

  export async function addStaff(param) {
    param.service='Staff.AddStaff';
    return request(apiAdmin,param);
  }

  export async function deletStaff(param) {
    param.service='Staff.DeleteStaff';
    return request(apiAdmin,param);
  }
  export async function editStaff(param) {
    param.service='Staff.EditStaff';
    return request(apiAdmin,param);
  }

  
  export async function getDepartments(param) {
    param.service='Staff.GetDepartments';
    return request(apiAdmin,param);
  }

  export async function importStaff(param) {
    param.service='Staff.ImportStaff';
    return request(apiAdmin,param);
  }