import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../../common/common.less';
import { Table, Button, Popconfirm, Modal, Form, Input } from 'antd';
import { pageSize } from '../../utils/config'
import PageHeader from 'ant-design-pro/lib/PageHeader';
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
//会员信息管理
class msg extends Component {

  constructor(props) {

    super(props)
    this.state = {
      visible: false,
      query: {},
      list: {}
    }
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.props.dispatch({
        type: 'findAllMemberList',
        payload: { level: this.props.location.state.record, pageSize: pageSize, pageIndex: this.props.memberRedux.pageIndex ? this.props.memberRedux.pageIndex : 1 },
      });
    } else {
      this.props.dispatch({
        type: 'findAllMemberList',
        payload: { pageSize: pageSize, pageIndex: this.props.memberRedux.pageIndex ? this.props.memberRedux.pageIndex : 1 },
      });
    }

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
      type: 'findAllMemberList',
      payload: data,
    });
  }

  render() {

    const { getFieldDecorator } = this.props.form;
    const { taskTypeId, } = this.state.list;


    const columns = [{
      title: '微信昵称',
      dataIndex: 'nick_name',
      key: 'nick_name',
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '会员等级',
      dataIndex: 'level_info',
      key: 'level_info',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '推荐人姓名',
      dataIndex: 'referee_name',
      key: 'referee_name',
    },
    {
      title: '地址信息',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
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
      title: '会员管理',
    }, {
      title: '会员管理',
    }];

    // 定义分页对象
    const pagination = {
      current: this.props.memberRedux.pageIndex,
      total: this.props.memberRedux.total,
      pageSize: pageSize,
      onChange: (page, pageSize) => {
        let query = this.state.query;
        query.pageIndex = page;
        query.pageSize = pageSize;
        if (this.props.location.state) {
          query.level = this.props.location.state.record;
        }
        this.props.dispatch({
          type: 'findAllMemberList',
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
            <Table columns={columns} dataSource={this.props.memberRedux.list} loading={this.props.memberRedux.loading} pagination={pagination} rowKey={record => record.id} />
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
            {getFieldDecorator('name')(
              <Input placeholder="请输入姓名" style={{ width: '150px' }} />

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
function mapStateToProps({ memberRedux }) {

  return { memberRedux };
}
msg = Form.create()(msg);
export default connect(mapStateToProps)(msg);