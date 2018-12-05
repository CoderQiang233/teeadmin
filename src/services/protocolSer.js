
import request from '../utils/request';
import config from '../utils/config';

const { apiAdmin } = config;

export async function getListByCon(param) {
    param.service = 'Protocol.GetListByCond';
    // param.XDEBUG_SESSION_START=10655;
    return request(apiAdmin, param);
}


export async function add(param) {
    param.service = 'Protocol.AddProtocol';
    // param.XDEBUG_SESSION_START=10655;
    return request(apiAdmin, param);
}

export async function edit(param) {
    param.service = 'Protocol.EditProtocol';
    // param.XDEBUG_SESSION_START=10655;
    return request(apiAdmin, param);
}

export async function del(param) {
    param.service = 'Protocol.DelProtocol';
    // param.XDEBUG_SESSION_START=10655;
    return request(apiAdmin, param);
}



