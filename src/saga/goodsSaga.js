import { put,takeLatest,call,select } from 'redux-saga/effects'
import { push,replace } from 'react-router-redux'
import {findAllGoods,insertGoods,findById,updateGoods,deleteGoods,findAllLevel} from '../services/goods'
import { reloadAuthorized } from '../utils/Authorized';
import { message } from 'antd';
import { pageSize,apiAdmin } from '../utils/config';
import { history } from '../store';

 function* findAll({payload}){
  yield put({
    type:'goods/loading'
  });
  const response = yield call(findAllGoods,payload);

  if(response.data.data.code==1){
    yield put({
      type:'findAllGoodsSuccess',
      payload:{...response}
    })
  }else{
    message.error('获取商品列表失败');
  }

}

function* insert({payload}){
  const response = yield call(insertGoods,payload);
  if(response.data.data.code==1){
    message.success('新增成功',1,function(){
      history.push({
        pathname: '/product/productList/list',
      });
    });
  }else{
    message.error('新增失败');
  }
}

function* find({payload}){
  const response = yield call(findById,payload);
  if(response.data.data.code==1){
    yield put({
      type:'findGoodsSuccess',
      payload:{...response}
    })
  }

}

function* update({payload}){
  const response = yield call(updateGoods,payload);
  if(response.data.data.code==1){
    message.success('修改成功',1,function(){
      history.push({
        pathname: '/product/productList/list',
      });
    });
  }else{
    message.error('修改失败');
  }

}

function* del({payload}){
  const response = yield call(deleteGoods,payload);
  if(response.data.data.code==1){
    message.success('删除成功',1);
    yield put({
      type:'findAllGoods',
      payload:{pageSize:pageSize,pageIndex:1}
    })    
  }else{
    message.error('删除失败');
  }
}

function* findLevel({payload}){
  const response = yield call(findAllLevel,payload);
  if(response.data.data.code==1){
    yield put({
      type:'findAllMemberLevelSuccess',
      payload:{...response}
    })
  }

}




 function* goodsSaga() {
   //获取商品列表
    yield takeLatest('findAllGoods', findAll)
    //新增商品
    yield takeLatest('insertGoods', insert)
     //查看商品
     yield takeLatest('findGoods', find)
     //修改商品
     yield takeLatest('updateGoods', update)
    //删除商品
    yield takeLatest('deleteGoods',del)
    //查看会员等级
    yield takeLatest('findAllMemberLevel', findLevel)

  }

  export default goodsSaga;