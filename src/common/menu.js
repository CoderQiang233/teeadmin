import { isUrl } from '../utils/utils';

const menuData = [
  {
    name:'会员管理',
      icon:'team',
      path:'member/msg',
    },
    {
      name:'首页布局管理',
      icon:'team',
      path:'indexLayout/index',
    },
    {
      name:'商品管理',
      icon:'shop',
      path:'product',
      children: [{
        name: '商品管理',
        path: 'productList',
      },{
        name: '商品类别管理',
        path: 'productType'
      },{
        name: '商品订单管理',
        path: 'productOrder'
      },
      {
        name: '防伪管理',
        path: 'securitycode',
      },]
    },
 


  {
    name: '库存管理',
    icon: 'database',
    path: 'inventory',
    children: [{
      name: '总库存管理',
      path: 'totalInventory',
    }, {
      name: '代理库存管理',
      path: 'agentInventory',
    }]
  },
  {
    name: '返现管理',
    icon: 'pay-circle',
    path: 'agent',
    children: [{
      name: '代理返现',
      path: 'cashback',
    },
    // {
    //   name: '返现比例',
    //   path: 'percentage',
    // },
    ]
  },
  {
    name: '数据统计',
    icon: 'pie-chart',
    path: 'statistics',
    children: [{
      name: '代理分布',
      path: 'distribution',
    },
    {
      name: '商品销售统计',
      path: 'commodity',
    },
    {
      name: '订单统计',
      path: 'order',
    },
    ]
  },
    {
        name: '新闻中心',
        icon: 'layout',
        path: 'news/content',
    },
  {
    name: '系统设置',
    icon: 'setting',
    path: 'system',
    children: [
      {
        name: '公司简介',
        path: 'profile',
      },
      {
        name: '用户管理',
        path: 'index',
      },
      {
        name: '轮播管理',
        path: 'ProductBanner',
      },
    ]
  },

];

function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
