import { put, takeLatest, call, select } from 'redux-saga/effects'
import { findAllOrderStatisticsList} from '../services/orderStatistics'
import { message } from 'antd';
import { pageSize } from '../utils/config'
function* findAllOrderList({ payload }) {
  console.log('传输',payload)
  const response = yield call(findAllOrderStatisticsList, payload);
   console.log('第一条',response)
  yield put({
    type: 'orderStatistics/loading'
  });
  if (response.data.ret == '200') {
    yield put({
      type: 'findorderStatisticsList',
      payload: {...response }
    })
  }
}

function* orderStatisticsSaga() {
  //获取订单统计列表
  yield takeLatest('findAllOrderStatisticsList', findAllOrderList)

}

export default orderStatisticsSaga;