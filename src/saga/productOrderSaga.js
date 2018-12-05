import { put, takeLatest, call, select } from 'redux-saga/effects'
import { push, replace } from 'react-router-redux'
import { findAllProductOrder, findById, ship } from '../services/productOrder'
import { reloadAuthorized } from '../utils/Authorized';
import { message } from 'antd';
import { pageSize } from '../utils/config';
import { history } from '../store';

function* findAll({ payload }) {
  yield put({
    type: 'productOrder/loading'
  });
  const response = yield call(findAllProductOrder, payload);
  if (response.data.data.code == 1) {
    yield put({
      type: 'findAllProductOrderSuccess',
      payload: { ...response }
    })
  }

}

function* find({ payload }) {
  const response = yield call(findById, payload);
  if (response.data.data.code == 1) {
    yield put({
      type: 'findProductOrderByIdSuccess',
      payload: { ...response }
    })
  }

}

function* shipments({ payload }) {
  const response = yield call(ship, payload);
  if (response.data.data.code == 1) {
    message.success(payload.express_id?'修改快递信息成功':'添加快递信息成功', 1, function () {
      // history.push({
      //   pathname: '/productOrder/express',
      //   state: { orderId: payload.order_id}
      // });
      window.location.reload();
    });
  } else {
    message.error(payload.express_id?'修改快递信息失败':'添加快递信息失败');
  }
}

function* ProductOrderSaga() {
  //获取商品订单列表
  yield takeLatest('findAllProductOrder', findAll)
  //获取商品订单详情
  yield takeLatest('findProductOrderById', find)
  //发货
  yield takeLatest('productOrderShipments', shipments)
}

export default ProductOrderSaga;