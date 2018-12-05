import { put, takeLatest, call, select } from 'redux-saga/effects'
import { getListByCon,add,edit,del } from '../services/meetingRoomSer'
// eslint-disable-next-line
import { push,replace } from 'react-router-redux';
import { message } from 'antd';

function* getList({ payload }) {
    yield put({
        type:'meetingRoom/loading'
    });

    const { data } = yield call(getListByCon, payload);

    if (data.data) {
        yield put({
            type: 'meetingRoom/getListSuccess',
            payload: data.data,
        });
        
    }


}

function* addMeetingRoom({ payload }) {
    yield put({
        type:'meetingRoom/loading'
    });
    const { data } = yield call(add, payload);

    if (data.data.code===1) {
        message.success('添加数据成功！！！');
        yield put({
            type: 'meetingRoom/getListSuccess',
            payload: data.data.list,
        });
    };
}

function* editMeetingRoom({ payload }) {
    yield put({
        type:'meetingRoom/loading'
    });
    const { data } = yield call(edit, payload);

    if (data.data.code===1) {
        message.success('修改数据成功！！！');
        yield put({
            type: 'meetingRoom/getListSuccess',
            payload: data.data.list,
        });
    }else{
        message.error(data.data.msg);
        yield put({
            type: 'meetingRoom/getListSuccess',
            payload: data.data.list,
        });
    }
}

function* delMeetingRoom({ payload }) {
    yield put({
        type:'meetingRoom/loading'
    });
    const { data } = yield call(del, payload);

    if (data.data.code===1) {
        message.success('删除数据成功！！！');
        yield put({
            type: 'meetingRoom/getListSuccess',
            payload: data.data.list,
        });;
    };
}


function* meetingRoomSaga() {

    yield takeLatest('meetingRoom/getList', getList);
    yield takeLatest('meetingRoom/add', addMeetingRoom);
    yield takeLatest('meetingRoom/edit', editMeetingRoom);
    yield takeLatest('meetingRoom/del', delMeetingRoom);
}

export default meetingRoomSaga;