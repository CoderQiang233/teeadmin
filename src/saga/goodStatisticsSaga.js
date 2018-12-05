import { put, takeLatest, call, select } from 'redux-saga/effects'
import { findAllGoodStatisticsList} from '../services/goodStatistics'
import { message } from 'antd';
import { pageSize } from '../utils/config'
function* findAllTongjiList({ payload }) {
  console.log('传输',payload)
  const response = yield call(findAllGoodStatisticsList, payload);
   console.log('第一条',response)
  yield put({
    type: 'goodStatistics/loading'
  });
  if (response.data.ret == '200') {
    yield put({
      type: 'findgoodStatisticsList',
      payload: {...response }
    })
  }
}

function* goodStatisticsSaga() {
  //获取商品销售统计列表
  yield takeLatest('findgoodStatisticsLists', findAllTongjiList)

}

export default goodStatisticsSaga;