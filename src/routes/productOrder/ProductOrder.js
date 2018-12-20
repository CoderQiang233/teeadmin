import styles from '../../common/common.less';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Table, Row, Button, Radio, Popconfirm, Icon, Col, RangePicker, Form, Input, Upload, InputNumber, Select, message, DatePicker } from 'antd';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import { pageSize, apiAdmin } from '../../utils/config';
import { getDate,ORDER_STATUS_0,ORDER_STATUS_1,ORDER_STATUS_2,ORDER_STATUS_3 } from '../../utils/common';
import { history } from '../../store';
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;
class ProductOrder extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            query: {},
        }
    };
    componentDidMount() {
        this.props.dispatch({
            type: 'findAllProductOrder',
            payload: { pageSize: pageSize, pageIndex: this.props.productOrder.pageIndex ? this.props.productOrder.pageIndex : 1 },
        })

    }

    //检索
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.pageSize = pageSize;
                values.pageIndex = 1;
                if (values.pay_id == undefined) {
                    values.pay_id = '';
                }
                if (values.nick_name == undefined) {
                    values.nick_name = '';
                }
                if (values.phone == undefined) {
                    values.phone = '';
                }
                if (values.updatedAt == undefined) {
                    values.updatedAt = '';
                } else if (values.updatedAt) {
                    values.updatedAt = getDate(values.updatedAt);
                }
                this.setState({
                    query: values,
                })
                console.log('Received values of form: ', values);
                this.props.dispatch({
                    type: 'findAllProductOrder',
                    payload: values,
                });
            }
        });
    }

    //导出
    exportExcel = () => {

        window.location.href = apiAdmin + 'productOrderExportExcel.php?XDEBUG_SESSION_START=16273';

    }
    //操作
  operation = (orderId, values) => {

    history.push({
      pathname: '/product/productOrder/express',
      state: { orderId: orderId}
    });

  }

    render() {


        function onChange(date, dateString) {
            console.log(date, dateString);
        }

        //页头
        const breadcrumbList = [{
            title: '首页',
            href: '/',
        }, {
            title: '商品订单管理',
            href: '/product/productOrder',
        }];
        //表头
        const columns = [{
            title: '订单编号',
            dataIndex: 'pay_id',
            key: 'pay_id',
        }, {
            title: '客户昵称',
            dataIndex: 'nick_name',
            key: 'nick_name',
        },   {
            title: '状态',
            dataIndex: 'pay',
            key: 'pay',
            render: (text, record) => {
                return (
                  <div>
                    {record.pay==ORDER_STATUS_1&&'已支付'}
                    {record.pay==ORDER_STATUS_2&&'待收货'}
                    {record.pay==ORDER_STATUS_3&&'已完成'}
                  </div>
                )
            }
        },{
            title: '总价',
            dataIndex: 'total',
            key: 'total',
            render: (text, record) => {
                return (
                  <div>
                    {parseFloat(record.total)}
                  </div>
                )
              }
        }, {
            title: '下单时间',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Button type="primary" onClick={this.operation.bind(null, record.order_id)}>操作</Button>
            ),
        }];
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // 定义分页对象
        const pagination = {
            current: this.props.productOrder.pageIndex,
            total: this.props.productOrder.total,
            pageSize: pageSize,
            onChange: (page, pageSize) => {
                let query = this.state.query;
                query.pageIndex = page;
                query.pageSize = pageSize;
                this.props.dispatch({
                    type: 'findAllProductOrder',
                    payload: query,
                });

            },
        };


        return (
            <div className={styles.content}>
                <PageHeader breadcrumbList={breadcrumbList} className={styles.page} />
                <div className={styles.tableList}>
                    <div className={styles.search}>
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                            <FormItem>
                                {getFieldDecorator('pay_id')(
                                    <Input placeholder="请输入订单编号" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('nick_name')(
                                    <Input placeholder="请输入客户昵称" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('updatedAt')(
                                    <DatePicker onChange={onChange} placeholder="请选择下单时间" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('pay')(
                                    <Select style={{width:150}} placeholder='请选择'>
                                        <Option value=''>全部</Option>
                                        <Option value={ORDER_STATUS_1}>已支付</Option>
                                        <Option value={ORDER_STATUS_2}>待收货</Option>
                                        <Option value={ORDER_STATUS_3}>已完成</Option>
                                     </Select>
                                )}
                            </FormItem>

                            <FormItem>
                                <Button type="primary" htmlType="submit">查询</Button>
                                {/* <Button type='primary' style={{ marginLeft: 10 }} onClick={this.exportExcel} >
                                    导出文件
                                </Button> */}

                            </FormItem>

                        </Form>
                    </div>
                    <div>
                        <Table dataSource={this.props.productOrder.list} columns={columns} pagination={pagination} loading={this.props.productOrder.loading} />
                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps({ productOrder }) {
    return { productOrder };
}
ProductOrder = Form.create()(ProductOrder);
export default connect(mapStateToProps)(ProductOrder);