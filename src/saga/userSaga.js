import { put, takeLatest, call, select } from 'redux-saga/effects'
import { getCurrent as gCurrent, test } from '../services/api'


function* getCurrent({payload}) {

  const {data} = yield call(gCurrent,payload);

  console.log(data.data)

  yield put({
    type: 'saveCurrentUser',
    payload: data.data,
  });
}

function* userSaga() {

  yield takeLatest('fetchCurrent', getCurrent);

}

export default userSaga;