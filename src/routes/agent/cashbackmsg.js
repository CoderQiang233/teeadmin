import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../../common/common.less';
import { Table, Button, Form, Input, DatePicker } from 'antd';
import { pageSize } from '../../utils/config'
import PageHeader from 'ant-design-pro/lib/PageHeader';
import moment from 'moment';
const FormItem = Form.Item;
const { MonthPicker } = DatePicker;
const monthFormat = 'YYYY-MM';
let cash = ''
//代理返现明细
class cashbackmsg extends Component {

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
    if (this.props.location.state.month == '1') {
      console.log(1)
      this.props.dispatch({
        type: 'findAllCashbackListMonth',
        payload: { pageSize: pageSize, pageIndex: this.props.cashbackRedux.pageIndex ? this.props.cashbackRedux.pageIndex : 1, id: this.props.location.state.id, month: cash.cash_time },
      });
    } else {
      console.log(2)
      this.props.dispatch({
        type: 'findAllCashbackListMsg',
        payload: { pageSize: pageSize, pageIndex: this.props.cashbackRedux.pageIndex ? this.props.cashbackRedux.pageIndex : 1, id: cash.id },
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
      type: 'findAllCashbackListMsg',
      payload: data,
    });
  }

  render() {



    const columns = [
      {
        title: '代理姓名',
        dataIndex: 'referee_name',
        key: 'referee_name',
      },
      {
        title: '代理等级',
        dataIndex: 'referee_level',
        key: 'referee_level',
        render: (text, record) => {
          switch (record.referee_level) {
            case "1":
              return '会员'
              break;
            case "2":
              return '创客'
              break;
            case "3":
              return '盟主'
              break;
            case "4":
              return '合伙人'
              break;
            default:
              break;
          }
        }

      },
      {
        title: '返现比例(*100%)',
        dataIndex: 'cashback_percentage',
        key: 'cashback_percentage',
      },
      {
        title: '下级代理',
        dataIndex: 'member_name',
        key: 'member_name',
      },
      {
        title: '下级注册费用(元)',
        dataIndex: 'member_price',
        key: 'member_price',
      },
      {
        title: '订单金额(元)',
        dataIndex: 'order_price',
        key: 'order_price',
      },
      {
        title: '应返现金额(元)',
        dataIndex: 'final_cashback_amount',
        key: 'final_cashback_amount',
      },
      {
        title: '当月返现(元)',
        dataIndex: 'same_month',
        key: 'same_month',
      },
      {
        title: '下月结余(元)',
        dataIndex: 'next_month',
        key: 'next_month',
      },
      {
        title: '生成时间',
        dataIndex: 'registration_date',
        key: 'registration_date',
      }
    ];





    //页头
    const breadcrumbList = [{
      title: '首页',
      href: '/',
    }, {
      title: '代理返现',
      href: '/agent/cashback',
    }, {
      title: '代理返现明细',
    }];

    // 定义分页对象
    const pagination = {
      current: this.props.cashbackRedux.cashpageIndex,
      total: this.props.cashbackRedux.cashtotal,
      pageSize: pageSize,
      onChange: (page, pageSize) => {
        let query = this.state.query;
        query.pageIndex = page;
        query.pageSize = pageSize;
        if (this.props.location.state.month == '1') {
          query.id = this.props.location.state.id;
          query.month = cash.cash_time;
          console.log(1, query)
          this.props.dispatch({
            type: 'findAllCashbackListMonth',
            payload: query,
          });
        } else {
          query.id = cash.id;
          console.log(2, query)
          this.props.dispatch({
            type: 'findAllCashbackListMsg',
            payload: query,
          });
        }

      },
    };



    return (
      <div className={styles.content}>
        <PageHeader breadcrumbList={breadcrumbList} className={styles.page} />
        <div className={styles.tableList}>
          <div className={styles.search}>
            {this.props.location.state.month != "1" &&
              <SearchMsg onSubmit={this.onSubmit} month={this.props.location.state.month} id={this.props.location.state.id} />
            }
          </div>
          <div>
            <Table columns={columns} dataSource={this.props.cashbackRedux.cashlist} loading={this.props.cashbackRedux.loading} pagination={pagination} rowKey={record => record.id} />
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
          if (values.member_name == undefined) {
            values.member_name = '';
          }
          values.member_name = values.member_name.trim();
          if (values.record_date == undefined) {
            values.record_date = '';
          }
          if (values.record_date) {
            values.record_date = moment(values.record_date).format("YYYY-MM");
          }

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
            {getFieldDecorator('member_name')(
              <Input placeholder="请输入会员姓名(下级代理)" style={{ width: '200px' }} />

            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('record_date')(

              <MonthPicker format={monthFormat} placeholder="请选择记录时间" />

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
cashbackmsg = Form.create()(cashbackmsg);
export default connect(mapStateToProps)(cashbackmsg);