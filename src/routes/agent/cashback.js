import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../../common/common.less';
import { Table, Button, Popconfirm, Modal, Form, Input } from 'antd';
import { pageSize } from '../../utils/config'
import PageHeader from 'ant-design-pro/lib/PageHeader';
import { history } from '../../store';
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
//代理返现管理
class cashback extends Component {

  constructor(props) {

    super(props)
    this.state = {
      visible: false,
      query: {},
      list: {}
    }
  }

  componentDidMount() {

    this.props.dispatch({
      type: 'findAllCashbackList',
      payload: { pageSize: pageSize, pageIndex: this.props.cashbackRedux.pageIndex ? this.props.cashbackRedux.pageIndex : 1 },
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
      type: 'findAllCashbackList',
      payload: data,
    });
  }
  //修改
  edit = (record, values) => {
    //跳页前将当前页设为默认1
    this.props.cashbackRedux.pageIndex = 1;
    history.push({
      pathname: '/agent/cashbackmsg',
      state: { record: record }
    });
  }
  //月返现
  editmonth = (record, values) => {
    //跳页前将当前页设为默认1
    this.props.cashbackRedux.pageIndex = 1;
    history.push({
      pathname: '/agent/cashbackmonth',
      state: { record: record }
    });
  }
  render() {

    const { getFieldDecorator } = this.props.form;

    const columns = [{
      title: '微信昵称',
      dataIndex: 'nick_name',
      key: 'nick_name',
    },

    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '总金额(元)',
      dataIndex: 'total_balance',
      key: 'total_balance',
      render: (text, record) => {
        return (
          <div>
            {parseFloat(record.total_balance)}
          </div>
        )
      }
    },
    {
      title: '结算金额(元)',
      dataIndex: 'yes_balance',
      key: 'yes_balance',
      render: (text, record) => {
        return (
          <div>
            {parseFloat(record.yes_balance)}
          </div>
        )
      }
    },
    {
      title: '可用金额(元)',
      dataIndex: 'balance',
      key: 'balance',
      render: (text, record) => {
        return (
          <div>
            {parseFloat(record.balance)}
          </div>
        )
      }
    },
    // {
    //   title: '操作',
    //   dataIndex: 'operation',
    //   key: 'operation',
    //   render: (text, record) => (
    //     <div>
    //       <ButtonGroup >
    //         {/* <Button type="primary" onClick={this.edit.bind(null, record)}>返现明细</Button> */}
    //         <Button type="primary" onClick={this.editmonth.bind(null, record)}>月返现</Button>
    //       </ButtonGroup>
    //     </div>
    //   )
    // }
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
      title: '推广返现',
    }];

    // 定义分页对象
    const pagination = {
      current: this.props.cashbackRedux.pageIndex,
      total: this.props.cashbackRedux.total,
      pageSize: pageSize,
      onChange: (page, pageSize) => {
        let query = this.state.query;
        query.pageIndex = page;
        query.pageSize = pageSize;

        this.props.dispatch({
          type: 'findAllCashbackList',
          payload: query,
        });

      },
    };

    return (
      <div className={styles.content}>
        <PageHeader breadcrumbList={breadcrumbList} className={styles.page} />
        <div className={styles.tableList}>
          <div className={styles.search}>
            <SearchMsg onSubmit={this.onSubmit} />
          </div>
          <div>
            <Table columns={columns} dataSource={this.props.cashbackRedux.list} loading={this.props.cashbackRedux.loading} pagination={pagination} />
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
          if (values.name == undefined) {
            values.name = '';
          }
          values.name = values.name.trim();
          if (values.phone == undefined) {
            values.phone = '';
          }
          values.phone = values.phone.trim();
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
            {getFieldDecorator('nick_name')(
              <Input placeholder="请输入微信昵称" style={{ width: '150px' }} />

            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('phone')(
              <Input placeholder="请输入手机号码" style={{ width: '150px' }} />

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
cashback = Form.create()(cashback);
export default connect(mapStateToProps)(cashback);