import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../../common/common.less';
import { Table, Button, Popconfirm, Modal, Form, Input, Switch, Select } from 'antd';
import { pageSize } from '../../utils/config'
import PageHeader from 'ant-design-pro/lib/PageHeader';
import { history } from '../../store';
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const Option = Select.Option;
let cash = ''
//代理返现月返现记录
class cashbackmonth extends Component {

  constructor(props) {

    super(props)
    cash = this.props.location.state.record
    this.state = {
      visible: false,
      query: {},
      list: cash
    }
  }

  componentDidMount() {
  
    this.props.dispatch({
      type: 'findAllMonthRecord',
      payload: { pageSize: pageSize, pageIndex: this.props.cashbackRedux.pageIndex ? this.props.cashbackRedux.pageIndex : 1, id: cash.id },
    });


  }




  handleCancel = (e) => {
    this.props.form.resetFields();
    this.setState({
      visible: false,
    });
  }

  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {


        this.setState({
          visible: false,
        })
      }


    });
  }
  // 提交检索表单
  onSubmit = (data) => {
    console.log('检索：', data)
    this.setState({
      query: data,
    })
    this.props.dispatch({
      type: 'findAllMonthRecord',
      payload: data,
    });
  }
  //点击进行手动返现
  delete = (id, values) => {
    this.props.dispatch({
      type: 'updateCashStatus',
      payload: { id: id, cashid: cash.id,operation:sessionStorage.getItem("name") },
    });
  }
  //返现明细
  edit = (record, values) => {

    history.push({
      pathname: '/agent/cashbackmsg',
      state: { record: record, month: '1', id: cash.id }
    });
  }
  render() {

    const { getFieldDecorator } = this.props.form;
    const { name } = this.state.list;


    const columns = [

      {
        title: '返现金额(元)',
        dataIndex: 'cash_price',
        key: 'cash_price',
      },
      {
        title: '返现时间',
        dataIndex: 'cash_time',
        key: 'cash_time',
      },
      {
        title: '返现情况',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          switch (record.status) {
            case "1":
              return '已返现'
              break;
            case "2":
              return '未返现'
              break;
            default:
              break;
          }
        }
      },
      {
        title: '操作人',
        dataIndex: 'operation',
        key: 'operation',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) => (

          <div>


            <ButtonGroup >
              <Button type="primary" onClick={this.edit.bind(null, record)}>返现明细</Button>
              {record.status == '2' &&
                <Popconfirm title="确定将该用户当月返现金额进行手动返现么?" onConfirm={this.delete.bind(null, record.id)}>
                  <Button type="danger"  >手动返现</Button>
                </Popconfirm>
              }
            </ButtonGroup>

          </div>


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




    //页头
    const breadcrumbList = [{
      title: '首页',
      href: '/',
    }, {
      title: '代理返现',
      href: '/agent/cashback',
    }, {
      title: '月返现',
    }];

    // 定义分页对象
    // const pagination = {
    //   current: this.props.cashbackRedux.monthpageIndex,
    //   total: this.props.cashbackRedux.monthtotal,
    //   pageSize: pageSize,
    //   onChange: (page, pageSize) => {
    //     let query = this.state.query;
    //     query.pageIndex = page;
    //     query.pageSize = pageSize;
    //     query.id = cash.id;
    //     this.props.dispatch({
    //       type: 'findAllMonthRecord',
    //       payload: query,
    //     });

    //   },
    // };



    return (
      <div className={styles.content}>
        <PageHeader breadcrumbList={breadcrumbList} className={styles.page} />
        <div className={styles.tableList}>
          <div className={styles.search}>
            <SearchMsg onSubmit={this.onSubmit} />
          </div>
          <div>
            <Table columns={columns} dataSource={this.props.cashbackRedux.monthlist} loading={this.props.cashbackRedux.loading} rowKey={record => record.id}/>
          </div>
        </div>
      </div>
    )
  }

}
//检索组件
const SearchMsg = Form.create()(
  class extends React.Component {
    constructor(props) {

      super(props)

      this.state = {
      }

    }
    //查询提交
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          values.pageSize = pageSize;
          values.pageIndex = 1;
          values.id = cash.id;
          console.log('Received values of form: ', values);
          this.props.onSubmit(values);
        }
      });
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('status')(
              <Select style={{ width: '150px' }}
                placeholder="全部状态">
                <Option value="">全部状态</Option>
                <Option value="1">已返现</Option>
                <Option value="2">未返现</Option>
              </Select>
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
            >
              查询
                  </Button>
          </FormItem>
        </Form>

      );
    }

  }
);
function mapStateToProps({ cashbackRedux }) {

  return { cashbackRedux };
}
cashbackmonth = Form.create()(cashbackmonth);
export default connect(mapStateToProps)(cashbackmonth);