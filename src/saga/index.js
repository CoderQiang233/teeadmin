
import { put,takeEvery,fork,all } from 'redux-saga/effects'

import loginSaga from './loginSaga'
import userSaga from './userSaga'
import global from './globalSaga'
import chartSaga from './chartSaga'
import meetingSaga from './meetingSaga'
import meetingRoomSaga from './meetingRoomSaga'
import departmentSaga from './departmentSaga'
import staffSaga from './staffSaga'
import UserManagerSaga from './UserManagerSaga'
import protocolSaga from './protocolSaga'
import statisticsSaga from './statisticsSaga'
import exampaperSaga from './exampaperSaga'
import productOrder from './productOrderSaga';
import goods from './goodsSaga';
import securitycodeSaga from './securitycodeSaga';
import memberSaga from './memberSaga'
import newsSaga from './newsSaga'
import profileSaga from './profileSaga'
import cashbackSaga from './cashbackSaga'
import main from './mainSaga';
import goodStatisticsSaga from './goodStatisticsSaga'
import orderStatisticsSaga from './orderStatisticsSaga'
import percentageSaga from './percentageSaga'
import indexBannerSaga from './IndexBannerSaga'
import ProductBannerSaga from './ProductBannerSaga'
import inventroy from './inventorySaga';
import indexLayoutSaga from './indexLayoutSaga';
import goodsType from './goodsTypeSaga'

// 所有saga的入口配置文件
const config = [

    fork(loginSaga),
    fork(userSaga),
    fork(global),
    fork(chartSaga),
    fork(departmentSaga),
    fork(staffSaga),
    fork(UserManagerSaga),
    fork(meetingSaga),
    fork(meetingRoomSaga),
    fork(departmentSaga),
    fork(protocolSaga),
    fork(statisticsSaga),
    fork(exampaperSaga),
    fork(productOrder),
    fork(memberSaga),
    fork(goods),
    fork(securitycodeSaga),
    fork(newsSaga),
    fork(profileSaga),
    fork(cashbackSaga),
    fork(main),
    fork(goodStatisticsSaga),
    fork(orderStatisticsSaga),
    fork(percentageSaga),
    fork(indexBannerSaga),
    fork(ProductBannerSaga),
    fork(inventroy),
    fork(indexLayoutSaga),
    fork(goodsType),


]


export default function* rootSaga(){

    yield all(config)

};