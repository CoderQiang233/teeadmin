import { put, takeLatest, call, select } from 'redux-saga/effects'
import { findAllCashbackList,findAllCashbackListMsg,findAllMonthRecord,updateCashStatus,findAllCashbackListMonth} from '../services/cashback'
import { message } from 'antd';
import { pageSize } from '../utils/config'
function* findAll({ payload }) {
  const response = yield call(findAllCashbackList, payload);
  yield put({
    type: 'cashback/loading'
  });
  if (response.data.ret == '200') {
    yield put({
      type: 'findAllCashbackListSuccess',
      payload: {...response }
    })
  }
}
function* findAllList({ payload }) {
  console.log(11,payload)
  const response = yield call(findAllCashbackListMsg, payload);
  console.log(12,response)
  yield put({
    type: 'cashbackMsg/loading'
  });
  if (response.data.ret == '200') {
    yield put({
      type: 'findAllCashbackListMsgSuccess',
      payload: {...response }
    })
  }
}
function* findAllMonth({ payload }) {
  console.log(3,payload)
  const response = yield call(findAllMonthRecord, payload);
  console.log(1,response)
  yield put({
    type: 'monthrecord/loading'
  });
  if (response.data.ret == '200') {
    yield put({
      type: 'findAllMonthRecordSuccess',
      payload: {...response }
    })
  }
}
function* findAllMonthList({ payload }) {
  console.log(3,payload)
  const response = yield call(findAllCashbackListMonth, payload);
  console.log(1,response)
  yield put({
    type: 'cashbackMsg/loading'
  });
  if (response.data.ret == '200') {
    yield put({
      type: 'findAllCashbackListMsgSuccess',
      payload: {...response }
    })
  }
}
function* update({ payload }) {
    const response = yield call(updateCashStatus, payload);
    if (response.data.data.res == true) {
      message.success('修改成功!')
      yield put({
        type: 'findAllMonthRecord',
        payload: { pageSize: pageSize, pageIndex: 1,id:payload.cashid }
      })
    } else {
      message.error('修改失败!')
    }
  }
function* cashbackSaga() {
  //获取会员返现信息列表(代理商)
  yield takeLatest('findAllCashbackList', findAll)
  //获取返现明细
  yield takeLatest('findAllCashbackListMsg',findAllList)
  //获取月返现总记录
  yield takeLatest('findAllMonthRecord',findAllMonth)
  //更改当月返现记录返现状态
  yield takeLatest('updateCashStatus',update)
  //获取月返现返现明细
  yield takeLatest('findAllCashbackListMonth',findAllMonthList)
}

export default cashbackSaga;