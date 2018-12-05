import { put, takeLatest, call, select } from 'redux-saga/effects'
import { push, replace } from 'react-router-redux'
import { login, editPwd } from '../services/loginSer'
import { reloadAuthorized } from '../utils/Authorized';
import { message } from 'antd';

function* logincheck({ payload }) {

  const { data } = yield call(login, payload);
  yield put({
    type: 'commonlogin',
    payload: {
      ...data.data.data,
    },
  })

  if (data.data.data.status === 'ok') {
    reloadAuthorized();
    yield put(push("/"))
  }
}

function* logout({ payload }) {

  try {
    // get location pathname
    const urlParams = new URL(window.location.href);
    const pathname = yield select(state => state.routerReducer.location.pathname);
    // add the parameters in the url
    urlParams.searchParams.set('redirect', pathname);
    window.history.replaceState(null, 'login', urlParams.href);
  } finally {
    yield put({
      type: 'tologin',
      payload: {
        status: "",
        currentAuthority: 'guest',
      },
    });
    reloadAuthorized();
    yield put(push('/user/login'));
  }
}

function* changePwd({ payload }) {
  yield put({
    type: 'user/showLoading',
    payload: {},
  });
  let { data } = yield call(editPwd, payload);
  console.log(data);
  if (data.data.code == 1) {
    message.success(`修改成功`, 5);
    sessionStorage.removeItem('antd-pro-authority');
    sessionStorage.removeItem('antd-pro-token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userId');
    yield put({
      type: 'logout',
    });
  } else {

    message.error(`${data.data.msg}`, 5);
  }
  yield put({
    type: 'user/closeLoading',
    payload: {},
  });


}

function* loginSaga() {

  yield takeLatest('getToken', logincheck)

  yield takeLatest('logout', logout)

  yield takeLatest('user/editPwd', changePwd)

}

export default loginSaga;