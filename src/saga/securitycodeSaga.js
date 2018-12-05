import { put, takeLatest, call, select } from 'redux-saga/effects'
import { findAllSecurity,generateSecurityCode } from '../services/securitycode'
import { message } from 'antd';
import { pageSize } from '../utils/config'
function* findAll({ payload }) {
  const response = yield call(findAllSecurity, payload);
   console.log('第一条',response)
  yield put({
    type: 'securitycode/loading'
  });
  if (response.data.ret == '200') {
    yield put({
      type: 'findAllSecurityListSuccess',
      payload: {...response }
    })
  }
}
function* generate({payload}){
    const response = yield call(generateSecurityCode, payload);
    console.log('生成',response)
  if(response.data.data.msg=='success'){
      message.success('防伪码生成成功!')
      yield put({
        type: 'findAllSecurityList',
        payload: {}
      })
  }else{
    message.error('防伪码生成失败!')
  }
}
function* securitycodeSaga() {
  //获取当日防伪码信息列表
  yield takeLatest('findAllSecurityList', findAll)
  //提交防伪码生成表单
  yield takeLatest('generateSecurityCode',generate)
}

export default securitycodeSaga;