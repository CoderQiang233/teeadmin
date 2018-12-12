import { put, takeLatest, call, select } from 'redux-saga/effects'
import { addModuleSer,getModuleList,getProductOption,editModuleSer } from '../services/indexLayout'
import { message } from 'antd';
import { pageSize } from '../utils/config'


function* getMoList({ payload }) {
    const response = yield call(getModuleList, payload);
    console.log(response);
    yield put({
      type: 'indexLayout/loading'
    });
  
    if (response.data.data) {
      yield put({
        type: 'indexLayout/getModuleListSuccess',
        payload: { ...response }
      })
      yield put({
          type: 'indexLayout/closeLoading'
        });
    }
  }

function* addModule({ payload }) {
  const response = yield call(addModuleSer, payload);
  console.log(response);
  yield put({
    type: 'indexLayout/loading'
  });

  if (response.data.data) {
    yield put({
      type: 'indexLayout/addIndexModuleSuccess',
      payload: { ...response }
    })
    message.success('增加成功',1)
    yield put({
        type: 'indexLayout/closeLoading'
      });
  }
}

function* editModule({ payload }) {
    const response = yield call(editModuleSer, payload);
    console.log(response);
    yield put({
      type: 'indexLayout/loading'
    });
  
    if (response.data.data) {
      yield put({
        type: 'indexLayout/editIndexModuleSuccess',
        payload: { ...response }
      })
      message.success('修改成功',1)

      yield put({
          type: 'indexLayout/closeLoading'
        });
        yield put({
            type:'indexLayout/getIndexModule',
            payload:{}
          })
    }
  }
function* getProductO({ payload }) {
    const response = yield call(getProductOption, payload);
    console.log(response);
    yield put({
      type: 'indexLayout/loading'
    });
  
    if (response.data.data) {
      yield put({
        type: 'indexLayout/getProductOptionSuccess',
        payload: { ...response }
      })
      yield put({
          type: 'indexLayout/closeLoading'
        });
    }
  }
function* indexLayoutSaga() {
  yield takeLatest('indexLayout/addIndexModule', addModule)
  yield takeLatest('indexLayout/getIndexModule', getMoList)
  yield takeLatest('indexLayout/getProductOption', getProductO)
  yield takeLatest('indexLayout/editIndexModule', editModule)

}

export default indexLayoutSaga;