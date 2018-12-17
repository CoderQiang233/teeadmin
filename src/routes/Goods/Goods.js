import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../../common/common.less';
import { Table, Row, Button, Radio, Popconfirm, Icon, Col, Modal, Form, Input, Upload, InputNumber, Breadcrumb, message, Select, Switch } from 'antd';
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
      state: { record: record }
    })
  }
  //删除
  delete = (id, values) => {
    this.props.dispatch({
      type: 'deleteGoods',
      payload: { id: id },
    });
  }

  //状态
  handleChange = (id, e) => {
    let status = '';
    if (e) {
      status = '1'//上下架(1:上架,2:下架)
    } else {
      status = '2'
    }
    this.props.dispatch({
      type: 'productUpDown',
      payload: { id, status },
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
        values.name = values.name.trim();
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
        <ImgPreview src={imgPath + record.first_picture} />
      )
    }, {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '价格',
      dataIndex: 'market_price',
      key: 'market_price',
      render: (text, record) => {
        return (
          <div>
            {parseFloat(record.market_price)}
          </div>
        )
      }
    }, {
      title: '佣金比率',
      dataIndex: 'brokerage',
      key: 'brokerage',
    },
    // {
    //   title: '商品品牌',
    //   dataIndex: 'brand',
    //   key: 'brand',
    // },
    {
      title: '商品类别',
      dataIndex: 'type_name',
      key: 'type_name',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        return (
          <div style={{ width: 60 }}>
            <Switch checkedChildren="启用" unCheckedChildren="禁用"
              checked={record.status == 1 ? true : false} onChange={this.handleChange.bind(null, record.product_id)} />
          </div>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <ButtonGroup style={{ width: 180 }}>
          <Button type="primary" onClick={this.edit.bind(null, record)}>修改</Button>
          <Popconfirm title="确认删除?" onConfirm={this.delete.bind(null, record.product_id)}>
            <Button type="danger">删除</Button>
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