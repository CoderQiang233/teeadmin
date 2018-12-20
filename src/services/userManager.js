import request from '../utils/request';
import config from '../utils/config';

const { apiAdmin } = config;

export async function getUserList(param) {
    param.service='UserManager.GetUserList';
    return request(apiAdmin,param);
  }

  export async function addUser(param) {
    param.service='UserManager.AddUser';
    console.log(param);
    return request(apiAdmin,param);
  }

  export async function deletUser(param) {
    param.service='UserManager.DeleteUser';
    param.XDEBUG_SESSION_START=16436;
    return request(apiAdmin,param);
  }
  export async function editUser(param) {
    param.service='UserManager.EditUser';
    return request(apiAdmin,param);
  }

  
  export async function getDepartments(param) {
    param.service='Staff.GetDepartments';
    return request(apiAdmin,param);
  }

  // export async function editUserPwd(param) {
  //   param.service='UserManager.EditPwd';
  //   return request(apiAdmin,param);
  // }
   export async function editUserPwd(param) {
    param.service='UserManager.AdminEditPwd';
    return request(apiAdmin,param);
  }