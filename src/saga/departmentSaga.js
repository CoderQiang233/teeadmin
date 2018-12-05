import { put,takeLatest,call,select } from 'redux-saga/effects'
import { getDepartmentList,addDepartment ,deletDepartment,editDepartment} from '../services/department';
import { message } from 'antd';

function* getDeList({payload}){
  yield put({
    type: 'department/showLoading',
    payload: {},
  });
  let {data} = yield call(getDepartmentList,payload);
   data=data.data;
  if(data&&data.code==1){
    yield put({
      type: 'department/getListSuccess',
      payload: data,
    });
    yield put({
      type: 'department/closeLoading',
      payload: {},
    });
  }else{
    
    message.error(`${data.msg}.. :(`, 5);
  }
  yield put({
    type: 'department/closeLoading',
    payload: {},
  });


}
function* addDept({payload}){
  yield put({
    type: 'department/showLoading',
    payload: {},
  });
  let {data} = yield call(addDepartment,payload);
  data=data.data;
  if(data&&data.code==1){
    message.success(`添加成功.. :)`, 5);
    yield put({
      type: 'department/addDepartmentSuccess',
      payload: data,
    });
    yield put({
      type: 'department/closeLoading',
      payload: {},
    });
  }else{
    
    message.error(`${data.msg}.. :(`, 5);
  }
  yield put({
    type: 'department/closeLoading',
    payload: {},
  });


}

function* editDept({payload}){
  yield put({
    type: 'department/showLoading',
    payload: {},
  });
  let {data} = yield call(editDepartment,payload);
  data=data.data;
  if(data&&data.code==1){
    message.success(`编辑成功.. :)`, 5);
    yield put({
      type: 'department/addDepartmentSuccess',
      payload: data,
    });
    yield put({
      type: 'department/closeLoading',
      payload: {},
    });
  }else{
    
    message.error(`${data.msg}.. :(`, 5);
  }
  yield put({
    type: 'department/closeLoading',
    payload: {},
  });


}


function* deletDept({payload}){
  yield put({
    type: 'department/showLoading',
    payload: {},
  });
  let {data} = yield call(deletDepartment,payload);
  data=data.data;
  if(data&&data.code==1){
    message.success(`删除成功.. :)`, 5);
    yield put({
      type: 'department/addDepartmentSuccess',
      payload: data,
    });
    yield put({
      type: 'department/closeLoading',
      payload: {},
    });
  }else{
    
    message.error(`${data.msg}.. :(`, 5);
  }
  yield put({
    type: 'department/closeLoading',
    payload: {},
  });


}



function* chart() {

    yield takeLatest('department/getDepartmentList', getDeList)
    yield takeLatest('department/addDepartment', addDept)
    yield takeLatest('department/deletDepartment', deletDept)
    yield takeLatest('department/editDepartment', editDept)
   
   
  }

  export default chart;