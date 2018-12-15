import { put,takeLatest,call,select } from 'redux-saga/effects'
import { push,replace } from 'react-router-redux'
import {findAllGoodsType,uploadGoodsType,insertGoodsType,findById,updateGoodsType,deleteGoodsType,findTypeSelect} from '../services/goodsType'
import { reloadAuthorized } from '../utils/Authorized';
import { message } from 'antd';
import { pageSize } from '../utils/config'
 function* findAll({payload}){
  const response = yield call(findAllGoodsType,payload);
  yield put({
    type:'goodsType/loading'
  });
  if(response.data.data.code == 1){
    yield put({
      type:'findAllGoodsTypeSuccess',
      payload:{...response}
    })
  }

}

function* insert({payload}){
  const response = yield call(insertGoodsType,payload);
  if(response.data.data.code == 1){
    message.success('新增成功',1,function(){
      window.location.reload();
    });
    // yield put({
    //   type:'findAllGoodsType',
    //   payload:{pageSize:pageSize,pageIndex:1}
    // })

  }else{
    message.error('新增失败');
  }
}

function* find({payload}){
  const response = yield call(findById,payload);
  if(response.data.info=='success'){
    yield put({
      type:'findGoodsTypeSuccess',
      payload:{...response}
    })
  }

}

function* update({payload}){
  const response = yield call(updateGoodsType,payload);
  if(response.data.data.code== 1){
    message.success('修改成功',1,function(){
      window.location.reload();
    });
  }else{
    message.error('修改失败');
  }

}

function* del({payload}){
  console.log(payload);
  const response = yield call(deleteGoodsType,payload);
  if(response.data.data.code== 1){
    message.success('删除成功',1,function(){
      window.location.reload();
    });
  
  }else{
    message.error('删除失败');
  }
}


function* findType({payload}){
  const response = yield call(findTypeSelect,payload);
  if(response.data.data.code == 1){
    yield put({
      type:'findTypeSelectSuccess',
      payload:{...response}
    })
  }

}

 function* goodsTypeSaga() {
   //获取商品类别列表
    yield takeLatest('findAllGoodsType', findAll)
    //新增商品类别
    yield takeLatest('insertGoodsType', insert)
     //查看商品类别
     yield takeLatest('findGoodsType', find)
     //修改商品类别
     yield takeLatest('updateGoodsType', update)
    //删除商品类别
    yield takeLatest('deleteGoodsType',del)
    //获取select数据
    yield takeLatest('findTypeSelect',findType)
  }

  export default goodsTypeSaga;