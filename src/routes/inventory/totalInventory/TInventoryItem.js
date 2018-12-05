import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../../../common/common.less';
import { Table, Row, Button, Radio, Popconfirm, Icon, Col, Modal, Form, Input, Upload, InputNumber, Breadcrumb, message, Divider } from 'antd';
import { api, pageSize } from '../../../utils/config'
import PageHeader from 'ant-design-pro/lib/PageHeader';
import { getDate } from '../../../utils/common.js';
import {withRouter } from 'react-router-dom';
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
//总库存明细
class TInventoryItem extends Component {

  constructor(props) {

    super(props)
    this.state = {
      query: {},

    }
  }

  componentDidMount() {

    this.props.dispatch({
      type: 'findAllInventory',
      payload: { pageSize: pageSize, pageIndex: this.props.inventory.pageIndex ? this.props.inventory.pageIndex : 1,
        product_id:this.props.location.state.product_id },
    });
  }



  //出库
  outClick = () => {
    this.setState({
      query:{state: '1', pageSize,pageIndex:1,product_id:this.props.location.state.product_id}
    })
    this.props.dispatch({
      type: 'findAllInventory',
      payload: { state: '1', pageSize,pageIndex:1,product_id:this.props.location.state.product_id},
    })
  }
  //入库
  enterClick = () => {

    this.setState({
      query:{ state: '2', pageSize,pageIndex:1,product_id:this.props.location.state.product_id}
    })
    this.props.dispatch({
      type: 'findAllInventory',
      payload: { state: '2', pageSize,pageIndex:1,product_id:this.props.location.state.product_id},
    })
  }

  render() {

    const columns = [{
      title: '商品名称',
      dataIndex: 'product_name',
      key: 'product_name',
    }, {
      title: '操作人',
      dataIndex: 'user_name',
      key: 'user_name',
    }, {
      title: '出入库前库存',
      dataIndex: 'before_inventory',
      key: 'before_inventory',
    }, {
      title: '库存改变量',
      dataIndex: 'change_inventory',
      key: 'change_inventory',
    }, {
      title: '当前库存',
      dataIndex: 'now_inventory',
      key: 'now_inventory',
    }, {
      title: '时间',
      dataIndex: 'date_added',
      key: 'date_added',
    }, {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    }];
    // 定义分页对象
    const pagination = {
      current: this.props.inventory.pageIndex,
      total: this.props.inventory.total,
      pageSize: pageSize,
      onChange: (page, pageSize) => {
        let query = this.state.query;
        query.pageIndex = page;
        query.pageSize = pageSize;
        query.product_id=this.props.location.state.product_id;

        this.props.dispatch({
          type: 'findAllInventory',
          payload: query,
        });

      },
    };

    //页头
    const breadcrumbList = [{
      title: '首页',
      href: '/',
    }, {
      title: '总库存管理',
      href: '/inventory/totalInventory/list',
    }, {
      title: '总库存明细',
      href: '/inventory/totalInventory/record',
    }];

    return (
      <div className={styles.content}>
        <PageHeader breadcrumbList={breadcrumbList} className={styles.page} />
        <div className={styles.tableList}>
          <div className={styles.search}>
            <ButtonGroup>
              <Button type="primary" onClick={this.enterClick} >入库</Button>
              <Button type="primary" onClick={this.outClick} >出库</Button>
            </ButtonGroup>

          </div>
          <div>
            <Table dataSource={this.props.inventory.recordTotal} columns={columns} pagination={pagination} loading={this.props.inventory.loading} />
          </div>
        </div>
      </div>
    )
  }

}
function mapStateToProps({ inventory }) {

  return { inventory };
}
TInventoryItem = Form.create()(TInventoryItem);
export default connect(mapStateToProps)(withRouter(TInventoryItem));