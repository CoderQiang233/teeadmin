import { put, takeLatest, call, select } from 'redux-saga/effects'
import { insertIndexBanner,updateIndexBanner,findAllIndexBannerList,deleteById } from '../services/IndexBanner'
import { message } from 'antd';
import { pageSize } from '../utils/config'

function* findAll({ payload }) {
  const response = yield call(findAllIndexBannerList, payload);
  console.log(response);
  yield put({
    type: 'IndexBanner/loading'
  });

  if (response.data.data) {
    yield put({
      type: 'findAllIndexBannerListSuccess',
      payload: { ...response }
    })
  }
}
function* insert({ payload }) {
  const response = yield call(insertIndexBanner, payload);
 
  if (response.data.data.code == 0) {
    message.success('添加成功');
      const response2 = yield call(findAllIndexBannerList, {});
      yield put({
          type: 'findAllIndexBannerListSuccess',
          payload: { ...response2 }
      })
  }else{
    message.success('插入失败');
  }
}

function* update({ payload }) {
  const response = yield call(updateIndexBanner, payload);
  if (response.data.data.code == 0) {
    message.success('修改成功');
      const response2 = yield call(findAllIndexBannerList, {});
      yield put({
          type: 'findAllIndexBannerListSuccess',
          payload: { ...response2 }
      })

  }else{
    message.success('修改失败');
  }

}

function* del({ payload }) {
  const response = yield call(deleteById, payload);
  console.log(response);
  if (response.data.data.code==0) {
    message.success('删除成功');
      const response2 = yield call(findAllIndexBannerList, {});
    yield put({
      type: 'findAllIndexBannerListSuccess',
      payload: {...response2}
    })
  }else{
    message.success('删除失败');
  }
}
function* indexBanner() {
  //获取轮播图类别列表
  yield takeLatest('findAllIndexBannerList', findAll)
  //新增轮播图类别
  yield takeLatest('insertIndexBanner', insert)
  //修改轮播图类别
  yield takeLatest('updateIndexBanner', update)
  //删除轮播图类别
  yield takeLatest('deleteById', del)
}

export default indexBanner;