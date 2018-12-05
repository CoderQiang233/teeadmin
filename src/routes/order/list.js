import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../../common/common.less';
import { Table, Button, Popconfirm, Modal, Form, Input, DatePicker } from 'antd';
import { pageSize } from '../../utils/config'
import { getCurrentTime, getDate } from '../../utils/common'
import PageHeader from 'ant-design-pro/lib/PageHeader';
import moment from 'moment'
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const dateFormat = 'YYYY-MM-DD';
const { RangePicker } = DatePicker;
//订单统计
class list extends Component {

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
            type: 'findAllOrderStatisticsList',
            payload: {},
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
            type: 'findAllOrderStatisticsList',
            payload: data,
        });
    }

    render() {

        const { getFieldDecorator } = this.props.form;


        const columns = [{
            title: '会员名称',
            dataIndex: 'member_name',
            key: 'member_name',
        },{
            title: '会员手机号',
            dataIndex: 'member_phone',
            key: 'member_phone',
        },
         {
            title: '订单数量',
            dataIndex: 'order_num',
            key: 'order_num',
            render: (text, record) => {
              if(record.order_num){
                  return record.order_num;
              }else{
                  return 0;
              }

            }
        },
        {
            title: '商品数量',
            dataIndex: 'commodity_num',
            key: 'commodity_num',
            render: (text, record) => {
                if(record.commodity_num){
                    return record.commodity_num;
                }else{
                    return 0;
                }
  
              }
        },
        {
            title: '金额总计(元)',
            dataIndex: 'orders_price',
            key: 'orders_price',
            render: (text, record) => {
                if(record.orders_price){
                    return record.orders_price;
                }else{
                    return 0;
                }
  
              }
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
            title: '订单管理',
        }, {
            title: '订单统计',
        }];



        return (
            <div className={styles.content}>
                <PageHeader breadcrumbList={breadcrumbList} className={styles.page} />
                <div className={styles.tableList}>
                    <div className={styles.search}>
                        <SearchMsg onSubmit={this.onSubmit} />
                    </div>
                    <div>
                        <Table columns={columns} dataSource={this.props.orderStatisticsRedux.list} loading={this.props.orderStatisticsRedux.loading} rowKey={record => record.member_phone} />
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
                endOpen: false,
            }

        }
        //查询提交
        handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    if (values.member_name == undefined) {
                        values.member_name = '';
                    }
                    values.member_name = values.member_name.trim();

                    if (values.datestart == undefined) {
                        values.datestart = '';
                    } else if (values.datestart) {
                        values.datestart=moment(values.datestart).format("YYYY-MM-DD");
                    }

                    if (values.dateend == undefined) {
                        values.dateend = '';
                    } else if (values.dateend) {
                        values.dateend=moment(values.dateend).format("YYYY-MM-DD");
                    }
 
                    console.log('Received values of form: ', values);
                    this.props.onSubmit(values);
                }
            });
        }

        handleStartOpenChange = (open) => {
            if (!open) {
                this.setState({ endOpen: true });
            }
        }
    
        handleEndOpenChange = (open) => {
            this.setState({ endOpen: open });
        }
        render() {
            const { getFieldDecorator } = this.props.form;
            const {endOpen } = this.state;
            return (
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('member_name')(
                            <Input placeholder="请输入会员名称" style={{ width: '150px' }} />

                        )}
                    </FormItem>
                    <FormItem
                    >
                        {getFieldDecorator('datestart', {
                        })(
                            <DatePicker 
                                 placeholder="请选择开始时间" 
                                disabledDate={this.disabledStartDate}
                                onChange={this.onStartChange}
                                format={dateFormat}
                                onOpenChange={this.handleStartOpenChange}
                            />
                            )}
                    </FormItem>



                    <FormItem
                    >
                        {getFieldDecorator('dateend', {
                        })(
                            <DatePicker 
                                disabledDate={this.disabledEndDate}
                                placeholder="请选择结束时间"
                                format={dateFormat}
                                onChange={this.onEndChange}
                                open={endOpen}
                                onOpenChange={this.handleEndOpenChange}
                            />

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
function mapStateToProps({ orderStatisticsRedux }) {

    return { orderStatisticsRedux };
}
list = Form.create()(list);
export default connect(mapStateToProps)(list);