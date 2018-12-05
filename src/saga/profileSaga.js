import { put, takeLatest, call, select } from 'redux-saga/effects'
import { findAllCompanyList, insertCompany, deleteById, updateCompany,changeCompany } from '../services/profile'
import { message } from 'antd';
import { pageSize } from '../utils/config'
function* findAll({ payload }) {
  const response = yield call(findAllCompanyList, payload);
  console.log('list:', response)
  yield put({
    type: 'profile/loading'
  });
  if (response.data.ret == '200') {
    yield put({
      type: 'findAllCompanyListSuccess',
      payload: { ...response }
    })
  }
}
function* insert({ payload }) {

  const response = yield call(insertCompany, payload);
  console.log('xinwen：', response)
  if (response.data.data.info == true) {
    message.success('添加成功!')
    yield put({
      type: 'findAllCompanyList',
      payload: { pageSize: pageSize, pageIndex: 1 }
    })
  } else {
    message.error(response.data.data.info+'添加失败!')
  }
}
function* deleteCompany({ payload }) {

  const response = yield call(deleteById, payload);
  console.log('xinwen：', response)
  if (response.data.data.info == 'success') {
    message.success('删除成功!')
    yield put({
      type: 'findAllCompanyList',
      payload: { pageSize: pageSize, pageIndex: 1 }
    })
  } else {
    message.error('删除失败!')
  }
}
function* update({ payload }) {
  console.log('xinwenupdate：', payload)
  const response = yield call(updateCompany, payload);
  console.log('xinwen：', response)
  if (response.data.data.info == true) {
    message.success('修改成功!')
    yield put({
      type: 'findAllCompanyList',
      payload: { pageSize: pageSize, pageIndex: 1 }
    })
  } else {
    message.error('修改失败!')
  }
}
function* change({ payload }) {
  
    const response = yield call(changeCompany, payload);
    console.log('xinwen：', response)
    if (response.data.data.info == true) {
      message.success('状态修改成功!')
      yield put({
        type: 'findAllCompanyList',
        payload: { pageSize: pageSize, pageIndex: 1 }
      })
    } else {
      message.error('状态修改失败!')
    }
  }
function* profileSaga() {
  //获取公司简介信息列表
  yield takeLatest('findAllCompanyList', findAll)
  //添加公司简介管理相关信息
  yield takeLatest('insertCompany', insert)
  //删除公司简介管理相关信息
  yield takeLatest('deleteCompany', deleteCompany)
  //修改公司简介管理相关信息
  yield takeLatest('updateCompany', update)
  //修改该条公司简介信息状态
  yield takeLatest('changeCompany', change)
}

export default profileSaga;