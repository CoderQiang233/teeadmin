import { put, takeLatest, call, select } from 'redux-saga/effects'
import { findAllGoodStatisticsList} from '../services/goodStatistics'
import { message } from 'antd';
import { pageSize } from '../utils/config'
function* findAllTongjiList({ payload }) {
  const response = yield call(findAllGoodStatisticsList, payload);
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