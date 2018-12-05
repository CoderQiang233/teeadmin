
import request from '../utils/request';
import config from '../utils/config';

const { apiAdmin } = config;

export async function getListByCon(param) {
    param.service = 'Meeting.GetListByCond';
    // param.XDEBUG_SESSION_START=10655;
    return request(apiAdmin, param);
}

export async function getTree(param) {
    param.service = 'Staff.GetStaffTree';
    // param.XDEBUG_SESSION_START=10655;
    return request(apiAdmin, param);
}

export async function add(param) {
    param.service = 'Meeting.AddMeeting';
    // param.XDEBUG_SESSION_START=10655;
    return request(apiAdmin, param);
}

export async function edit(param) {
    param.service = 'Meeting.EditMeeting';
    // param.XDEBUG_SESSION_START=10352;
    return request(apiAdmin, param);
}

export async function del(param) {
    param.service = 'Meeting.DelMeeting';
    // param.XDEBUG_SESSION_START=10655;
    return request(apiAdmin, param);
}

export async function startMeeting(param) {
    param.service = 'Meeting.StartMeeting';
    // param.XDEBUG_SESSION_START=10655;
    return request(apiAdmin, param);
}

export async function endMeeting(param) {
    param.service = 'Meeting.EndMeeting';
    // param.XDEBUG_SESSION_START=10655;
    return request(apiAdmin, param);
}

export async function getSinInStaff(param) {
    param.service = 'Meeting.GetSignInStaff';
    // param.XDEBUG_SESSION_START=10655;
    return request(apiAdmin, param);
}