import React from 'react'
import { combineReducers } from 'redux';
import {
  routerReducer,
} from 'react-router-redux'    

import login from './login'
import global from './global'
import user from './user'
import chart from './chart'
import meeting from './meeting'
import meetingRoom from './meetingRoom'
import department from './department'
import staff from './staff'
import UserManager from './UserManager'
import protocol from './protocol'
import statistics from './statistics'
import exampaper from './exampaper'
import productOrder from './productOrder'
import memberRedux from './memberRedux'
import goods from './goods'
import securitycodeRedux from './securitycodeRedux'
import newsRedux from  './newsRedux'
import profileRedux from './profileRedux'
import cashbackRedux  from './cashbackRedux'
import main from  './main'
import goodStatisticsRedux from './goodStatisticsRedux'
import orderStatisticsRedux from './orderStatisticsRedux'
import percentageRedux from './percentageRedux'
import indexBanner from  './IndexBannerRedux'
import ProductBanner from  './ProductBannerRedux'
import inventory from  './inventory'
const config = {
  routerReducer,
  login,
  global,
  user,
  chart,
  department,
  staff,
  UserManager,
  meeting,
  meetingRoom,
  department,
  protocol,
  statistics,
  exampaper,
  productOrder,
  memberRedux,
  goods,
  securitycodeRedux,
  newsRedux,
  profileRedux,
  cashbackRedux,
  main,
  goodStatisticsRedux,
  orderStatisticsRedux,
  percentageRedux,
  indexBanner,
  ProductBanner,
  inventory,


}


export default combineReducers(config);

