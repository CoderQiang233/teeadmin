import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../../../common/common.less';
import { Table, Row, Button, Radio, Popconfirm, Icon, Col, Modal, Form, Input, Upload, InputNumber, Breadcrumb, message ,Divider} from 'antd';
import { api, pageSize, imgPath } from '../../../utils/config'
import PageHeader from 'ant-design-pro/lib/PageHeader';
import { history } from '../../../store';
import ButtonGroup from 'antd/lib/button/button-group';
import ImgPreview from 'img-preview';
import {withRouter } from 'react-router-dom';
const FormItem = Form.Item;
//代理库存管理
class PointInventory extends Component {

  constructor(props) {

    super(props)
    this.state = {
      query: {},
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'findAllAgentInventory',
      payload: { pageSize: pageSize, pageIndex: this.props.inventory.pageIndexAgent ? this.props.inventory.pageIndexAgent : 1,
        product_id:this.props.location.state?this.props.location.state.product_id:'undefined'},
    });
  }

    //查看总库存明细
    findAll = (record) => {
      history.push({
        pathname:'/inventory/agentInventory/productRecord',
        state:{product_id:record.product_id,member_id:record.member_id}
      })
    }
  //检索
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.pageSize = pageSize;
        values.pageIndex = 1;
        if (values.name == undefined) {
          values.name = '';
        }
        if (values.product_name == undefined) {
            values.product_name = '';
          }
        values.name = values.name.trim();
        values.product_name = values.product_name.trim();
        values.product_id=this.props.location.state?this.props.location.state.product_id:'undefined'
        this.setState({
          query: values,
        })
        console.log('Received values of form: ', values);
        this.props.dispatch({
          type: 'findAllAgentInventory',
          payload: values,
        });
      }
    });
  }

  render() {

    const { getFieldDecorator } = this.props.form;

    const columns = [{
      title: '商品图片',
      dataIndex: 'first_picture',
      key: 'first_picture',
      render: (text, record) => (
        <ImgPreview src={imgPath + record.first_picture} style={{width:30,height:30}}/>
      )
    }, {
      title: '商品名称',
      dataIndex: 'product_name',
      key: 'product_name',
    }, {
      title: '代理姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '库存数',
      dataIndex: 'inventory_num',
      key: 'inventory_num',
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <ButtonGroup >
            <Button type="danger" onClick={this.findAll.bind(null,record)} >库存明细</Button>
        </ButtonGroup>
      )
    }];

     // 定义分页对象
    const pagination = {
      current: this.props.inventory.pageIndexAgent,
      total: this.props.inventory.totalAgent,
      pageSize: pageSize,
      onChange: (page, pageSize) => {
        let query = this.state.query;
        query.pageIndex = page;
        query.pageSize = pageSize;

        this.props.dispatch({
          type: 'findAllAgentInventory',
          payload: query,
        });

      },
    };

    //页头
    const breadcrumbList = [{
      title: '首页',
      href: '/',
    }, {
      title: '代理库存管理',
      href: '/inventory/agentInventory/list',
    }];

    return (
      <div className={styles.content}>
        <PageHeader breadcrumbList={breadcrumbList} className={styles.page} />
        <div className={styles.tableList}>
          <div className={styles.search}>
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator('product_name')(
                  <Input placeholder="请输入商品名称" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('name')(
                  <Input placeholder="请输入代理姓名" />
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit">查询</Button>
              </FormItem>
            </Form>
          </div>
          <div>
          <Table dataSource={this.props.inventory.agentInventory} columns={columns} pagination={pagination} loading={this.props.inventory.loading} />
          </div>
        </div>
      </div>
    )
  }

}
function mapStateToProps({ inventory }) {

  return { inventory };
}
PointInventory = Form.create()(PointInventory);
export default connect(mapStateToProps)(withRouter(PointInventory));