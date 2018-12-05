
import request from '../utils/request';
import config from '../utils/config';

const { apiAdmin } = config;

export async function getListByCon(param) {
    param.service = 'Exampaper.GetList';
    // param.XDEBUG_SESSION_START=10655;
    return request(apiAdmin, param);
}


export async function add(param) {
    param.service = 'Exampaper.AddExampaper';
    param.XDEBUG_SESSION_START=17914;
    return request(apiAdmin, param);
}

export async function edit(param) {
    param.service = 'Exampaper.EditExampaper';
    // param.XDEBUG_SESSION_START=10352;
    return request(apiAdmin, param);
}

export async function del(param) {
    param.service = 'Exampaper.DelExampaper';
    // param.XDEBUG_SESSION_START=10655;
    return request(apiAdmin, param);
}



