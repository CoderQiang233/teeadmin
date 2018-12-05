import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../../common/common.less';
import { Table, Row, Button, Radio, Popconfirm, Icon, Col, Modal, Form, Input, Upload, InputNumber, Breadcrumb, message, Select } from 'antd';
import { api, pageSize, imgPath } from '../../utils/config'
import PageHeader from 'ant-design-pro/lib/PageHeader';
import { history } from '../../store';
import ImgPreview from 'img-preview';
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const Option = Select.Option;
//商品
class Goods extends Component {

  constructor(props) {

    super(props)
    this.state = {
      query: {},
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'findAllGoods',
      payload: { pageSize: pageSize, pageIndex: this.props.goods.pageIndex ? this.props.goods.pageIndex : 1 },
    });

  }

  //点击新增
  handleClick = () => {

    history.push({
      pathname: '/product/productList/addProduct',
    });

  }
  //修改
  edit = (record) => {
    history.push({
      pathname: '/product/productList/editProduct',
      state: {record:record}
    })
  }
  //删除
  delete = (id, values) => {
    this.props.dispatch({
      type: 'deleteGoods',
      payload: { id: id },
    });
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
        values.name = values.name.trim();
        if(values.goodsActivityId=='-1'){
          values.goodsActivityId='';
        }
        this.setState({
          query: values,
        })
        console.log('Received values of form: ', values);
        this.props.dispatch({
          type: 'findAllGoods',
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
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '市场价格',
      dataIndex: 'market_price',
      key: 'market_price',
    }, {
      title: '代理价格',
      dataIndex: 'agent_price',
      key: 'agent_price',
    }, {
      title: '商品品牌',
      dataIndex: 'brand',
      key: 'brand',
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
     {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <ButtonGroup style={{ width: 180 }}>
          <Button type="primary" onClick={this.edit.bind(null, record)}>修改</Button>
          <Popconfirm title="确认删除?" onConfirm={this.delete.bind(null, record.id)}>
            <Button type="primary">删除</Button>
          </Popconfirm>
        </ButtonGroup>
      )
    }
  ];

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },

    };
    // 定义分页对象
    const pagination = {
      current: this.props.goods.pageIndex,
      total: this.props.goods.total,
      pageSize: pageSize,
      onChange: (page, pageSize) => {
        let query = this.state.query;
        query.pageIndex = page;
        query.pageSize = pageSize;

        this.props.dispatch({
          type: 'findAllGoods',
          payload: query,
        });

      },
    };

    //页头
    const breadcrumbList = [{
      title: '首页',
      href: '/',
    }, {
      title: '商品管理',
      href: '/product/productList/list',
    }];

    return (
      <div className={styles.content}>
        <PageHeader breadcrumbList={breadcrumbList} className={styles.page} />
        <div className={styles.tableList}>
          <div className={styles.search}>
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator('name')(
                  <Input placeholder="请输入商品名称" />
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit">查询</Button>
              </FormItem>
            </Form>
            <Button type="primary" onClick={this.handleClick} >新增</Button>
          </div>
          <div>
            <Table dataSource={this.props.goods.list} columns={columns} pagination={pagination} loading={this.props.goods.loading} />
          </div>
        </div>
      </div>
    )
  }

}
function mapStateToProps({ goods }) {

  return { goods };
}
Goods = Form.create()(Goods);
export default connect(mapStateToProps)(Goods);