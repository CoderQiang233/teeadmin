// eslint-disable-next-line
import { put, takeLatest, call, select } from 'redux-saga/effects'
import { getListByCon,getTree,add,edit,del,startMeeting ,endMeeting,getSinInStaff} from '../services/meetingManager'
// eslint-disable-next-line
import { push,replace } from 'react-router-redux';
import { message } from 'antd';

function* getList({ payload }) {
    yield put({
        type:'meeting/loading'
    });

    const { data } = yield call(getListByCon, payload);

    if (data.data) {
        yield put({
            type: 'meeting/getListSuccess',
            payload: data.data,
        });
    };


}

function* getStaffTree({ payload }) {
    yield put({
        type:'meeting/loading'
    });
    const { data } = yield call(getTree, payload);

    if (data.data) {
        yield put({
            type: 'meeting/getTreeSuccess',
            payload: data.data,
        });
    };
}

function* addMeeting({ payload }) {
    yield put({
        type:'meeting/loading'
    });
    const { data } = yield call(add, payload);

    if (data.data.code===1) {
        message.success('添加数据成功！！！');
        yield put(push("/meeting"));
    };
}

function* editMeeting({ payload }) {
    yield put({
        type:'meeting/loading'
    });
    const { data } = yield call(edit, payload);

    if (data.data.code===1) {
        message.success('修改数据成功！！！');
        yield put(push("/meeting"));
    }else{
        message.error(data.data.msg);
        yield put(push("/meeting"));
    }
}

function* delMeeting({ payload }) {
    yield put({
        type:'meeting/loading'
    });
    const { data } = yield call(del, payload);
    if (data.data.code===1) {
        message.success('删除数据成功！！！');
        yield put(push("/meeting"));
    };
}

function* startM({ payload }) {
    let { data } = yield call(startMeeting, payload);
    data=data.data;
    if (data&&data.code===1) {
        message.success('开始会议');
        yield put({
            type: 'meeting/getList',
            payload: payload,
        });
    };
}
function* endM({ payload }) {
    let { data } = yield call(endMeeting, payload);
    data=data.data;
    if (data&&data.code===1) {
        message.success('结束会议');
        yield put({
            type: 'meeting/getList',
            payload: payload,
        });
    };
}

function* getSinIn({ payload }) {
    let { data } = yield call(getSinInStaff, payload);
    data=data.data;
    if (data&&data.code===1) {
        console.log(data)
        yield put({
            type: 'meeting/getSinInStaffSuccess',
            payload: data,
        });
    };
}
function* meetingSaga() {

    yield takeLatest('meeting/getList', getList);
    yield takeLatest('meeting/getTree', getStaffTree);
    yield takeLatest('meeting/add', addMeeting);
    yield takeLatest('meeting/edit', editMeeting);
    yield takeLatest('meeting/del', delMeeting);
    yield takeLatest('meeting/startMeeting', startM);
    yield takeLatest('meeting/endMeeting', endM);
    yield takeLatest('meeting/getSinInStaff', getSinIn);
    

}

export default meetingSaga;