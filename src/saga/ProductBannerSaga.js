import { put, takeLatest, call, select } from 'redux-saga/effects'
import { insertProductBanner,updateProductBanner,findAllProductBannerList,deleteById } from '../services/ProductBanner'
import { message } from 'antd';
import { pageSize } from '../utils/config'

function* findAll({ payload }) {
  const response = yield call(findAllProductBannerList, payload);
  console.log(response);
  yield put({
    type: 'ProductBanner/loading'
  });

  if (response.data.data) {
    yield put({
      type: 'findAllProductBannerListSuccess',
      payload: { ...response }
    })
  }
}
function* insert({ payload }) {
  const response = yield call(insertProductBanner, payload);
 
  if (response.data.data.code == 0) {
    message.success('添加成功');
      const response2 = yield call(findAllProductBannerList, {});
      yield put({
          type: 'findAllProductBannerListSuccess',
          payload: { ...response2 }
      })
  }else{
    message.success('插入失败');
  }
}

function* update({ payload }) {
  const response = yield call(updateProductBanner, payload);
  if (response.data.data.code == 0) {
    message.success('修改成功');
      const response2 = yield call(findAllProductBannerList, {});
      yield put({
          type: 'findAllProductBannerListSuccess',
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
      const response2 = yield call(findAllProductBannerList, {});
    yield put({
      type: 'findAllProductBannerListSuccess',
      payload: {...response2}
    })
  }else{
    message.success('删除失败');
  }
}
function* ProductBanner() {
  //获取轮播图类别列表
  yield takeLatest('findAllProductBannerList', findAll)
  //新增轮播图类别
  yield takeLatest('insertProductBanner', insert)
  //修改轮播图类别
  yield takeLatest('updateProductBanner', update)
  //删除轮播图类别
  yield takeLatest('deleteProductBanner', del)
}

export default ProductBanner;