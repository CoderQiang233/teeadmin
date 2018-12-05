import { put, takeLatest, call, select } from 'redux-saga/effects'
import { findAllNewsList, insertNews, deleteById, updateNews,changeNews } from '../services/news'
import { message } from 'antd';
import { pageSize } from '../utils/config'
function* findAll({ payload }) {
  const response = yield call(findAllNewsList, payload);
  console.log('list:', response)
  yield put({
    type: 'news/loading'
  });
  if (response.data.ret == '200') {
    yield put({
      type: 'findAllNewsListSuccess',
      payload: { ...response }
    })
  }
}
function* insert({ payload }) {

  const response = yield call(insertNews, payload);
  console.log('xinwen：', response)
  if (response.data.data.info == true) {
    message.success('添加成功!')
    yield put({
      type: 'findAllNewsList',
      payload: { pageSize: pageSize, pageIndex: 1 }
    })
  } else {
    message.error('添加失败!')
  }
}
function* deleteNews({ payload }) {

  const response = yield call(deleteById, payload);
  console.log('xinwen：', response)
  if (response.data.data.info == 'success') {
    message.success('删除成功!')
    yield put({
      type: 'findAllNewsList',
      payload: { pageSize: pageSize, pageIndex: 1 }
    })
  } else {
    message.error('删除失败!')
  }
}
function* update({ payload }) {

  const response = yield call(updateNews, payload);
  if (response.data.data.info == true) {
    message.success('修改成功!')
    yield put({
      type: 'findAllNewsList',
      payload: { pageSize: pageSize, pageIndex: 1 }
    })
  } else {
    message.error('修改失败!')
  }
}
function* change({ payload }) {
  console.log('xinwen1：', payload)
    const response = yield call(changeNews, payload);
    console.log('xinwen：', response)
    if (response.data.data.info == true) {
      message.success('状态修改成功!')
      yield put({
        type: 'findAllNewsList',
        payload: { pageSize: pageSize, pageIndex: 1 }
      })
    } else {
      message.error('状态修改失败!')
    }
  }
function* newsSaga() {
  //获取新闻管理信息列表
  yield takeLatest('findAllNewsList', findAll)
  //添加新闻管理相关信息
  yield takeLatest('insertNews', insert)
  //删除新闻管理相关信息
  yield takeLatest('deleteNews', deleteNews)
  //修改新闻管理相关信息
  yield takeLatest('updateNews', update)
  //修改该条新闻状态
  yield takeLatest('changeNews', change)
}

export default newsSaga;