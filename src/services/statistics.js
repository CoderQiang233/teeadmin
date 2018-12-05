import request from '../utils/request';
import config from '../utils/config';

const { apiAdmin } = config;

export async function getStatisticsList(param) {
    param.service='Statistics.GetStatisticsList';
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
  export async function getSignInStaff(param) {
    param.service='Statistics.GetSignInList';
    return request(apiAdmin,param);
  }

  export async function exportSignList(param) {
    param.service='Statistics.ExportSignInList';
    return request(apiAdmin,param);
  }