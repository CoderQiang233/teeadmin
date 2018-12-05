// eslint-disable-next-line
import { put, takeLatest, call, select } from 'redux-saga/effects'
import { getListByCon,add,edit,del } from '../services/exampaper'
// eslint-disable-next-line
import { push,replace } from 'react-router-redux';
import { message } from 'antd';

function* getList({ payload }) {
    yield put({
        type:'exampaper/loading'
    });

    const { data } = yield call(getListByCon, payload);

    if (data.data) {
        yield put({
            type: 'exampaper/getListSuccess',
            payload: data.data,
        });
    };


}


function* addExampaper({ payload }) {
    yield put({
        type:'exampaper/loading'
    });
    const { data } = yield call(add, payload);
    if (data.data.code===1) {
        message.success('添加数据成功！！！');
        yield put({
            type:'exampaper/closeLoading'
        })
    };
}

function* editExampaper({ payload }) {
    yield put({
        type:'exampaper/loading'
    });
    const { data } = yield call(edit, payload);
    const meetingId = payload.meetingId;
    const status = payload.status;
    if (data.data.code===1) {
        message.success('修改数据成功！！！');
        yield put(push({pathname:'/meeting/exampaperList',state:{meetingId,status}}));
    }else{
        message.error(data.data.msg);
        yield put(push("/exampaper"));
    }
}

function* delExampaper({ payload }) {
    yield put({
        type:'exampaper/loading'
    });
    const { data } = yield call(del, payload);
    if (data.data.code===1) {
        message.success('删除数据成功！！！');
        yield put({
            type: 'exampaper/getListSuccess',
            payload: data.data.list,
        });
    };
}


function* exampaperSaga() {

    yield takeLatest('exampaper/getList', getList);
    yield takeLatest('exampaper/add', addExampaper);
    yield takeLatest('exampaper/edit', editExampaper);
    yield takeLatest('exampaper/del', delExampaper);

}

export default exampaperSaga;