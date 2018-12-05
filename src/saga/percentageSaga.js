import { put, takeLatest, call, select } from 'redux-saga/effects'
import { findAllpercentageList, insertPercentage,updatePercentage,deleteById } from '../services/percentage'
import { message } from 'antd';
import { pageSize } from '../utils/config'
function* findAll({ payload }) {
    const response = yield call(findAllpercentageList, payload);
    yield put({
        type: 'percentage/loading'
    });
    if (response.data.ret == '200') {
        yield put({
            type: 'findAllpercentageListSuccess',
            payload: { ...response }
        })
    }
}
function* insert({ payload }) {

    const response = yield call(insertPercentage, payload);
    if (response.data.data.info == true) {
        message.success('添加成功!')
        yield put({
            type: 'findAllpercentageList',
            payload: {}
        })
    } else {
        message.error('添加失败!'+response.data.data.info)
    }
}
function* deletePercentage({ payload }) {

    const response = yield call(deleteById, payload);
    if (response.data.data.info == 'success') {
        message.success('删除成功!')
        yield put({
            type: 'findAllpercentageList',
            payload: {}
        })
    } else {
        message.error('删除失败!')
    }
}
function* update({ payload }) {
    const response = yield call(updatePercentage, payload);
    if (response.data.data.info == true) {
        message.success('修改成功!')
        yield put({
            type: 'findAllpercentageList',
            payload: {  }
        })
    } else {
        message.error('修改失败!')
    }
}
function* percentageSaga() {
    //获取会员比例相关列表
    yield takeLatest('findAllpercentageList', findAll)
    yield takeLatest('insertPercentage', insert)
    yield takeLatest('updatePercentage', update)
    yield takeLatest('deletePercentage',deletePercentage)
}

export default percentageSaga;