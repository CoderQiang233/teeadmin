import { put,takeLatest,call,select } from 'redux-saga/effects'
import { getStaffList,addStaff ,deletStaff,editStaff,getDepartments,importStaff} from '../services/staff';
import { message } from 'antd';

function* getSList({payload}){
  yield put({
    type: 'staff/showLoading',
    payload: {},
  });
  let {data} = yield call(getStaffList,payload);
   data=data.data;
  if(data&&data.code==1){
    yield put({
      type: 'staff/getListSuccess',
      payload: data,
    });
  }else{
    
    message.error(`${data.msg}.. :(`, 5);
  }
  yield put({
    type: 'staff/closeLoading',
    payload: {},
  });
}



function* getDept({payload}){
    let {data} = yield call(getDepartments,payload);
    data=data.data;
    if(data&&data.code==1){
      yield put({
        type: 'staff/getDepartmentsSuccess',
        payload: data,
      });
    }
  
  
  }

function* addStaffInfo({payload}){
  yield put({
    type: 'staff/showLoading',
    payload: {},
  });
  let {data} = yield call(addStaff,payload);
  data=data.data;
  if(data&&data.code==1){
    message.success(`添加成功.. :)`, 5);
    yield put({
      type: 'staff/addStaffSuccess',
      payload: data,
    });
  }else{
    
    message.error(`${data.msg}.. :(`, 5);
  }
  yield put({
    type: 'staff/closeLoading',
    payload: {},
  });


}

function* editStaffInfo({payload}){
  yield put({
    type: 'staff/showLoading',
    payload: {},
  });
  let {data} = yield call(editStaff,payload);
  data=data.data;
  if(data&&data.code==1){
    message.success(`编辑成功.. :)`, 5);
    yield put({
      type: 'staff/addStaffSuccess',
      payload: data,
    });
    yield put({
      type: 'staff/closeLoading',
      payload: {},
    });
  }else{
    
    message.error(`${data.msg}.. :(`, 5);
  }
  yield put({
    type: 'staff/closeLoading',
    payload: {},
  });


}


function* deletStaffInfo({payload}){
  yield put({
    type: 'staff/showLoading',
    payload: {},
  });
  let {data} = yield call(deletStaff,payload);
  data=data.data;
  if(data&&data.code==1){
    message.success(`删除成功.. :)`, 5);
    yield put({
      type: 'staff/addStaffSuccess',
      payload: data,
    });
  }else{
    
    message.error(`${data.msg}.. :(`, 5);
  }
  yield put({
    type: 'staff/closeLoading',
    payload: {},
  });


}


function* importStaffList({payload}){
  yield put({
    type: 'staff/showLoading',
    payload: {},
  });
  let {data} = yield call(importStaff,payload);
  data=data.data;
  if(data&&data.code==1){
    message.success(`导入成功.. :)`, 5);
    yield put({
      type: 'staff/addStaffSuccess',
      payload: data,
    });
  }else{
    
    message.error(`${data.msg}.. :(`, 5);
  }
  yield put({
    type: 'staff/closeLoading',
    payload: {},
  });


}


function* chart() {

    yield takeLatest('staff/getStaffList', getSList)
    yield takeLatest('staff/addStaff', addStaffInfo)
    yield takeLatest('staff/deletStaff', deletStaffInfo)
    yield takeLatest('staff/editStaff', editStaffInfo)
    
    yield takeLatest('staff/getDepartment', getDept)

    yield takeLatest('staff/importStaff', importStaffList)
    
  }

  export default chart;