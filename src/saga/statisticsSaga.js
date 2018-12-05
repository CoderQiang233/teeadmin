import { put,takeLatest,call,select } from 'redux-saga/effects'
import { getStatisticsList,getDepartments,getSignInStaff,exportSignList} from '../services/statistics';
import { message } from 'antd';

function* getSList({payload}){
  yield put({
    type: 'statistics/showLoading',
    payload: {},
  });
  let {data} = yield call(getStatisticsList,payload);
   data=data.data;
  if(data&&data.code==1){
    yield put({
      type: 'statistics/getListSuccess',
      payload: data,
    });
  }else{
    
    message.error(`${data.msg}.. :(`, 5);
  }
  yield put({
    type: 'statistics/closeLoading',
    payload: {},
  });
}



function* getDept({payload}){
    let {data} = yield call(getDepartments,payload);
    data=data.data;
    if(data&&data.code==1){
      yield put({
        type: 'statistics/getDepartmentsSuccess',
        payload: data,
      });
    }
  
  
  }

  function* getSignIn({ payload }) {
    let { data } = yield call(getSignInStaff, payload);
    data=data.data;
    if (data&&data.code===1) {
        console.log(data)
        yield put({
            type: 'statistics/getSignInStaffSuccess',
            payload: data,
        });
    };
}

function* exportSignIn({ payload }) {
  console.log(2333)
  let  data  = yield call(exportSignList, payload);
  console.log(data)
}


function* chart() {

    yield takeLatest('statistics/getStatisticsList', getSList)
    
    yield takeLatest('statistics/getDepartment', getDept)

    yield takeLatest('statistics/getSignInStaff', getSignIn)
    
    yield takeLatest('statistics/exportSignList', exportSignIn)
  }

  export default chart;