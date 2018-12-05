import { put,takeLatest,call,select } from 'redux-saga/effects'
import { getUserList,addUser ,deletUser,editUser,getDepartments,editUserPwd} from '../services/userManager';
import { message } from 'antd';

function* getUList({payload}){
  yield put({
    type: 'user/showLoading',
    payload: {},
  });
  let {data} = yield call(getUserList,payload);
   data=data.data;
  if(data&&data.code==1){
    yield put({
      type: 'user/getListSuccess',
      payload: data,
    });
  }else{
    
    // message.error(`${data.msg}.. :(`, 5);
  }
  yield put({
    type: 'user/closeLoading',
    payload: {},
  });
}



function* getDept({payload}){
    let {data} = yield call(getDepartments,payload);
    data=data.data;
    if(data&&data.code==1){
      yield put({
        type: 'user/getDepartmentsSuccess',
        payload: data,
      });
    }
  
  
  }

function* addUserInfo({payload}){
  yield put({
    type: 'user/showLoading',
    payload: {},
  });
  let {data} = yield call(addUser,payload);
  console.log('用户添加:',data)
  data=data.data;
  if(data&&data.code==1){
    message.success(`添加成功.. :)`, 5);
    yield put({
      type: 'user/addUserSuccess',
      payload: data,
    });
  }else{
    
    message.error(`${data.msg}.. :(`, 5);
  }
  yield put({
    type: 'user/closeLoading',
    payload: {},
  });


}

function* editUserInfo({payload}){
  yield put({
    type: 'user/showLoading',
    payload: {},
  });
  let {data} = yield call(editUser,payload);
  console.log('用户编辑:',data)
  data=data.data;
  if(data&&data.code==1){
    message.success(`编辑成功.. :)`, 5);
    yield put({
      type: 'user/addUserSuccess',
      payload: data,
    });
    yield put({
      type: 'user/closeLoading',
      payload: {},
    });
  }else{
    
    message.error(`${data.msg}.. :(`, 5);
  }
  yield put({
    type: 'user/closeLoading',
    payload: {},
  });


}


function* deletUserInfo({payload}){
  yield put({
    type: 'user/showLoading',
    payload: {},
  });
  let {data} = yield call(deletUser,payload);
  data=data.data;
  if(data&&data.code==1){
    message.success(`删除成功.. :)`, 5);
    yield put({
      type: 'user/addUserSuccess',
      payload: data,
    });
  }else{
    
    message.error(`${data.msg}.. :(`, 5);
  }
  yield put({
    type: 'user/closeLoading',
    payload: {},
  });

}
/**
 * 修改密码
 * @param {} param0 
 */
function* editPwd({payload}){
  yield put({
    type: 'user/showLoading',
    payload: {},
  });
  let {data} = yield call(editUserPwd,payload);
  console.log('密码修改:',data.data.code)
  data=data.data;
  if(data&&data.code==1){
    message.success(`密码修改成功.. :)`, 5);
  }else{
    console.log('error:',data)
    message.error(`${data.msg}.. :(`, 5);
  }
  yield put({
    type: 'user/closeLoading',
    payload: {},
  });
}

function* chart() {

    yield takeLatest('user/getUserList', getUList)
    yield takeLatest('user/addUser', addUserInfo)
    yield takeLatest('user/deletUser', deletUserInfo)
    yield takeLatest('user/editUser', editUserInfo)
    yield takeLatest('user/changePwd', editPwd)


    
  }

  export default chart;