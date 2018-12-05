import request from '../utils/request';
import config from '../utils/config';

const { apiAdmin } = config;

export async function findAllpercentageList(param) {
    param.service = 'Percentage.Getlist';
    return request(apiAdmin, param);
}
export async function insertPercentage(param) {
    param.service = 'Percentage.Insert';
    return request(apiAdmin, param);
}
export async function updatePercentage(param) {
    param.service = 'Percentage.Update';
    return request(apiAdmin, param);
}
export async function deleteById(param) {
    param.service = 'Percentage.DeleteById';
    return request(apiAdmin, param);
}
