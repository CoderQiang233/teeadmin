import { put, takeLatest, call, select } from 'redux-saga/effects'
import { push, replace } from 'react-router-redux'
import { findAllCount, findNewest} from '../services/main'
import { reloadAuthorized } from '../utils/Authorized';
import { message } from 'antd';
import { pageSize } from '../utils/config';
import { history } from '../store';

function* findAll({ payload }) {
  yield put({
    type: 'productOrderCount/loading'
  });
  const response = yield call(findAllCount, payload);
  if (response.data.data.code == 1) {
    yield put({
      type: 'findAllProductOrderCountSuccess',
      payload: { ...response }
    })
  }

}

function* find({ payload }) {
  yield put({
    type: 'productOrderCount/loading'
  });
  const response = yield call(findNewest, payload);
  if (response.data.data.code == 1) {
    yield put({
      type: 'findProductOrderNewestSuccess',
      payload: { ...response }
    })
  }

}



function* MainSaga() {
  //获取订单总数,总销售额，总客户数
  yield takeLatest('findAllProductOrderCount', findAll)
  //取最新6条订单
  yield takeLatest('findProductOrderNewest', find)

}

export default MainSaga;