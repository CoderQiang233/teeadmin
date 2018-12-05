import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../../../common/common.less';
import { Table, Row, Button, Radio, Popconfirm, Icon, Col, Modal, Form, Input, Upload, InputNumber, Breadcrumb, message ,Divider} from 'antd';
import { api, pageSize, imgPath,frontPath } from '../../../utils/config'
import PageHeader from 'ant-design-pro/lib/PageHeader';
import { history } from '../../../store';
import ButtonGroup from 'antd/lib/button/button-group';
import ImgPreview from 'img-preview';
const FormItem = Form.Item;
//总库存管理
class TotalInventory extends Component {

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


//跳转到支行的库存管理页面
handleClick = (product_id) => {
  history.push({
    pathname:'/inventory/agentInventory/list',
    state:{product_id:product_id}
  })
}

  //增加总库存
  edit = (record) => {
    history.push({
      pathname:'/inventory/totalInventory/edit',
      state:{record:record}
    })
  }
    //查看总库存明细
    findAll = (product_id) => {
      history.push({
        pathname:'/inventory/totalInventory/record',
        state:{product_id:product_id}
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
      title: '商品品牌',
      dataIndex: 'brand',
      key: 'brand',
    }, {
      title: '实际库存',
      dataIndex: 'num',
      key: 'num',
    },  {
      title: '代理库存',
      dataIndex: 'agentInventory',
      key: 'agentInventory',
      render:(text, record)=>(
        <a type="primary" onClick={this.handleClick.bind(null, record.id)}>{record.agentInventory}</a>
      )
    },{
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <ButtonGroup style={{width:180}}>
            <Button type="primary" onClick={this.edit.bind(null, record)} >编辑</Button>
            <Button type="danger" onClick={this.findAll.bind(null,record.id)} >库存明细</Button>
        </ButtonGroup>
      )
    }];

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
      title: '总库存管理',
      href: '/inventory/totalInventory/list',
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
TotalInventory = Form.create()(TotalInventory);
export default connect(mapStateToProps)(TotalInventory);