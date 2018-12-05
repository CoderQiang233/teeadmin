
import request from '../utils/request';
import config from '../utils/config';

const { apiAdmin } = config;

export async function getListByCon(param) {
    param.service = 'MeetingRoom.GetList';
    // param.XDEBUG_SESSION_START=10655;
    return request(apiAdmin, param);
}

export async function add(param) {
    param.service = 'MeetingRoom.AddMeetingRoom';
    // param.XDEBUG_SESSION_START=10655;
    return request(apiAdmin, param);
}

export async function edit(param) {
    param.service = 'MeetingRoom.EditMeetingRoom';
    // param.XDEBUG_SESSION_START=10352;
    return request(apiAdmin, param);
}

export async function del(param) {
    param.service = 'MeetingRoom.DelMeetingRoom';
    // param.XDEBUG_SESSION_START=10655;
    return request(apiAdmin, param);
}