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
//商品销售统计
class statistics extends Component {

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
            type: 'findgoodStatisticsLists',
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
            type: 'findgoodStatisticsLists',
            payload: data,
        });
    }

    render() {

        const { getFieldDecorator } = this.props.form;
        const { taskTypeId, } = this.state.list;


        const columns = [{
            title: '商品名称',
            dataIndex: 'commodity_name',
            key: 'commodity_name',
        }, {
            title: '订单数量',
            dataIndex: 'order_num',
            key: 'order_num',
        },
        {
            title: '商品数量',
            dataIndex: 'commodity_num',
            key: 'commodity_num',
        },
        {
            title: '金额总计(元)',
            dataIndex: 'orders_price',
            key: 'orders_price',
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
            title: '商品销售管理',
        }, {
            title: '商品销售统计',
        }];



        return (
            <div className={styles.content}>
                <PageHeader breadcrumbList={breadcrumbList} className={styles.page} />
                <div className={styles.tableList}>
                    <div className={styles.search}>
                        <SearchMsg onSubmit={this.onSubmit} />
                    </div>
                    <div>
                        <Table columns={columns} dataSource={this.props.goodStatisticsRedux.list} loading={this.props.goodStatisticsRedux.loading} rowKey={record => record.commodity_name} />
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
                    if (values.commodity_name == undefined) {
                        values.commodity_name = '';
                    }
                    values.commodity_name = values.commodity_name.trim();

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
        // disabledStartDate = (startValue) => {
        //     const endValue = this.state.endValue;
        //     if (!startValue || !endValue) {
        //         return startValue && startValue.valueOf() < Date.now();
        //     }
        //     return startValue.valueOf() > endValue.valueOf() || startValue.valueOf() < Date.now();
        // }
    
        // disabledEndDate = (endValue) => {
        //     const startValue = this.state.startValue;
        //     if (!endValue || !startValue) {
        //         return endValue && endValue.valueOf() < Date.now();
        //     }
        //     return endValue.valueOf() <= startValue.valueOf();
        // }
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
                        {getFieldDecorator('commodity_name')(
                            <Input placeholder="请输入商品名称" style={{ width: '150px' }} />

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
function mapStateToProps({ goodStatisticsRedux }) {

    return { goodStatisticsRedux };
}
statistics = Form.create()(statistics);
export default connect(mapStateToProps)(statistics);