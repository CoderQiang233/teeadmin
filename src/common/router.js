import { createElement } from 'react'
import { getMenuData } from './menu';
import pathToRegexp from 'path-to-regexp';
import LoginPage from '../routes/login/index'
import BasicLayout from '../layouts/BaseLayout'
import UserLayout from '../layouts/UserLayout'


// 人员管理
import Staff from '../routes/Staff/index'
// 用户管理
import UserManager from '../routes/UserManager/index'
// 签到统计
import Statistics from '../routes/SignInStatistics/index'
import ProductOrder from '../routes/productOrder/ProductOrder'
import ProductOrderManager from '../routes/productOrder/index'
import Product from '../routes/Goods/Goods'
import ProductManager from '../routes/Goods/index'

import AddGoods from '../routes/Goods/AddGoods';
import EditGoods from '../routes/Goods/EditGoods';
import Msg from '../routes/member/msg';
import Expres from '../routes/productOrder/Expres';
import Index from '../routes/Index';
//防伪码管理
import Securitycode from '../routes/security/securitycode'
//新闻管理
import News from '../routes/news/content'
//代理分布
import IndexBanner from '../routes/IndexBanner/IndexBanner'
//首页轮播管理
import ProductBanner from '../routes/ProductBanner/ProductBanner'
//产品系列轮播管理

import Pie from '../routes/agent/distribution'
//代理返现
import Cashback from '../routes/agent/cashback'
import Cashbackmsg from '../routes/agent/cashbackmsg'
import Cashbackmonth from '../routes/agent/cashbackmonth'
import Percentage from '../routes/agent/percentage'
//公司简介
import Profile from '../routes/company/profile'
//商品销售统计
import commodityStatistics from '../routes/commodity/statistics'
//订单统计
import orderStatistics from '../routes/order/list'
//库存管理
import Inventory from '../routes/inventory/totalInventory/index'
import TotalInventory from '../routes/inventory/totalInventory/TotalInventory'
import EditTotalInventory from '../routes/inventory/totalInventory/EditTotalInventory'
import TotalInventoryItem from '../routes/inventory/totalInventory/TInventoryItem'
import Agent from '../routes/inventory/pointInventory/index'
import AgentInventory from '../routes/inventory/pointInventory/PointInventory'
import AgentProductInventory from '../routes/inventory/pointInventory/PInventoryItem'

// 小程序首页布局管理
import IndexLayout from '../routes/indexLayout/index'
import AddModule from '../routes/indexLayout/addModule'


let routerDataCache;

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach((item) => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}



export const getRouterData = () => {
  const routerConfig = {

    "/": {
      component: BasicLayout,
    },
    "/index": {
      component: Index,
    },
    "/product/productOrder": {
      component: ProductOrderManager,
    },
    "/product/productOrder/list": {
      component: ProductOrder,
    },
    "/product/productOrder/express": {
      component: Expres,
    },
    "/product/productList": {
      component: ProductManager,
    },
    "/product/productList/list": {
      component: Product,
    },
    "/product/productList/addProduct": {
      component: AddGoods,
    },
    "/product/productList/editProduct": {
      component: EditGoods,
    },
    "/inventory/totalInventory": {
      component: Inventory,
    },
    "/inventory/totalInventory/list": {
      component: TotalInventory,
    },
    "/inventory/totalInventory/edit": {
      component: EditTotalInventory,
    },
    "/inventory/totalInventory/record": {
      component: TotalInventoryItem,
    },
    "/inventory/agentInventory": {
      component: Agent,
    },
    "/inventory/agentInventory/list": {
      component: AgentInventory,
    },
    "/inventory/agentInventory/productRecord": {
      component: AgentProductInventory,
    },
    "/user": {
      component: UserLayout,
    },
    "/user/login": {
      component: LoginPage,
      authority: 'guest',
    },
    "/member/login": {
      component: LoginPage,
      authority: 'guest',
    },
    "/member/msg": {
      component: Msg,
    },
    "/news/content": {
      component: News,
    },
    "/statistics/distribution": {
      component: Pie,
    },
    "/statistics/commodity": {
      component: commodityStatistics,
    },
    "/statistics/order": {
      component: orderStatistics,
    },
    "/agent/cashback": {
      component: Cashback,
    },
    "/agent/cashbackmsg": {
      component: Cashbackmsg,
    },
    "/agent/cashbackmonth": {
      component: Cashbackmonth,
    },
    "/agent/percentage": {
      component: Percentage,
    },
    "/product/securitycode": {
      component: Securitycode,
    },
    "/system/index": {
      component: UserManager,
    },
    "/system/IndexBanner": {
      component: IndexBanner,
    },
    "/system/ProductBanner": {
      component: ProductBanner,
    },
    "/system/profile": {
      component: Profile,
    },
    "/indexLayout/index": {
      component: IndexLayout,
    },
    "/indexLayout/addModule": {
      component: AddModule,
    },

  }

  const menuData = getFlatMenuData(getMenuData());

  const routerData = {};

  // The route matches the menu
  Object.keys(routerConfig).forEach((path) => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`/${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
    };
    routerData[path] = router;
  });

  Object.values(routerConfig).forEach((v) => {

    let { component } = v;

    component.defaultProps = { routerData }

  })

  return routerData;

}