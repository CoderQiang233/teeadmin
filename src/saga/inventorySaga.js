import { put,takeLatest,call,select } from 'redux-saga/effects'
import { push,replace } from 'react-router-redux'
import {addTotal,findAllTInventoryItem,findAllAgentInventory,findAgentProductInventory} from '../services/inventory'
import { message } from 'antd';
import { pageSize } from '../utils/config';
import { history } from '../store';
 function* findAll({payload}){
  yield put({
    type:'inventory/loading'
  });
  const response = yield call(findAllTInventoryItem,payload);
  
  if(response.data.data.code==1){
    yield put({
      type:'findAllTInventoryItemSuccess',
      payload:{...response}
    })
  }

}

function* addTotalInventory({payload}){
  const response=yield call(addTotal,payload);
  if(response.data.data.code==1){
    message.success('增加成功',1,function(){
      history.push({
        pathname: '/inventory/totalInventory/list',
      });
    });
   
  }else{
    message.error('增加失败');
  }
}

function* findAllAgent({payload}){
  yield put({
    type:'inventory/loading'
  });
  const response = yield call(findAllAgentInventory,payload);
  
  if(response.data.data.code==1){
    yield put({
      type:'findAllAgentInventorySuccess',
      payload:{...response}
    })
  }

}

function* findAgentProduct({payload}){
  yield put({
    type:'inventory/loading'
  });
  const response = yield call(findAgentProductInventory,payload);
  
  if(response.data.data.code==1){
    yield put({
      type:'findAgentProductInventorySuccess',
      payload:{...response}
    })
  }

}

//总库存
 function* inventorySaga() {
    //获取总库存明细列表
    yield takeLatest('findAllInventory', findAll)
    //增加总库存
    yield takeLatest('addTotalInventory',addTotalInventory)
    //代理库存列表
    yield takeLatest('findAllAgentInventory',findAllAgent)
    //查看代理单个商品库存明细
    yield takeLatest('findAgentProductInventory',findAgentProduct)
  }

  export default inventorySaga;