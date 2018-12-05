import { put, takeLatest, call, select } from 'redux-saga/effects'
import { findAllMember, findCountByMemberLecel} from '../services/member'
import { message } from 'antd';
import { pageSize } from '../utils/config'
function* findAll({ payload }) {
  console.log('传输',payload)
  const response = yield call(findAllMember, payload);
   console.log('第一条',response)
  yield put({
    type: 'member/loading'
  });
  if (response.data.ret == '200') {
    yield put({
      type: 'findAllMemberSuccess',
      payload: {...response }
    })
  }
}
function* findCount({ payload }) {
  const response = yield call(findCountByMemberLecel, payload);
   console.log('第er条',response)
  if (response.data.ret == '200') {
    yield put({
      type: 'findCountByMemberLecelSuccess',
      payload: {...response }
    })
  }
}
function* memberSaga() {
  //获取会员信息列表
  yield takeLatest('findAllMemberList', findAll)
  //获取会员各等级人数相关信息
  yield takeLatest('findCountByMemberLecel',findCount)
}

export default memberSaga;