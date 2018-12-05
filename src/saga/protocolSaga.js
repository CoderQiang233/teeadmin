// eslint-disable-next-line
import { put, takeLatest, call, select } from 'redux-saga/effects'
import { getListByCon,add,edit,del } from '../services/protocolSer'
// eslint-disable-next-line
import { push,replace } from 'react-router-redux';
import { message } from 'antd';

function* getList({ payload }) {
    yield put({
        type:'protocol/loading'
    });

    const { data } = yield call(getListByCon, payload);

    if (data.data) {
        yield put({
            type: 'protocol/getListSuccess',
            payload: data.data.list,
        });
    };


}


function* addProtocol({ payload }) {
    yield put({
        type:'protocol/loading'
    });
    const { data } = yield call(add, payload);

    if (data.data.code===1) {
        message.success('添加数据成功！！！');
        yield put(push("/protocol"));
    };
}

function* editProtocol({ payload }) {
    yield put({
        type:'protocol/loading'
    });
    const { data } = yield call(edit, payload);

    if (data.data.code===1) {
        message.success('修改数据成功！！！');
        yield put(push("/protocol"));
    }else{
        message.error(data.data.msg);
        yield put(push("/protocol"));
    }
}

function* delProtocol({ payload }) {
    yield put({
        type:'protocol/loading'
    });
    const { data } = yield call(del, payload);

    if (data.data.code===1) {
        message.success('删除数据成功！！！');
        yield put(push("/protocol"));
    };
}


function* protocolSaga() {

    yield takeLatest('protocol/getList', getList);
    yield takeLatest('protocol/add', addProtocol);
    yield takeLatest('protocol/edit', editProtocol);
    yield takeLatest('protocol/del', delProtocol);

}

export default protocolSaga;