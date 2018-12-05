import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button, Popconfirm, Table, InputNumber, Select, Icon, message, Modal, DatePicker, Radio } from 'antd';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';
import styles from '../../common/common.less';
import { withRouter } from 'react-router-dom';
import config from '../../utils/config';
import { getDate } from '../../utils/common';
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD h:mm:ss';
const { apiAdmin, imgPath } = config;
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const RadioGroup = Radio.Group;
let imagePath = apiAdmin + '?service=Upload.Upload&XDEBUG_SESSION_START=14925';

//发货
class Expres extends Component {

    constructor(props) {
        super(props)

        this.state = {
            submit: false,
            visible: false,
            type: '',
            shiprecord: [],
            num: 0,//发货退货数量
        };
    }

    componentDidMount() {
        //查看商品
        this.props.dispatch({
            type: 'findProductOrderById',
            payload: { id: this.props.location.state.orderId },
        });

    }

    handleOk = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

                values.order_id = this.props.productOrder.order.id;
                if (this.state.type == 'update') {
                    values.express_id = this.state.shiprecord.id;
                }
                values.ship_time = getDate(values.ship_time);
                values.user_name = sessionStorage.getItem("name");
                values.userName = sessionStorage.getItem("userName");
                if (values.ship_num < 1) {
                    message.warn('数量不能为0');
                    return;
                }
                if (this.state.num < values.ship_num) {
                    message.error('剩余数量不足', 3);
                    return;
                }
                console.log('Received values of form: ', values);
                this.props.dispatch({
                    type: 'productOrderShipments',
                    payload: values,
                });
                this.setState({
                    visible: false,
                });
            }
        });
    }
    //修改
    onEdit = (record) => {
        this.setState({
            visible: true,
            type: 'update',
            shiprecord: record,
        });
    }

    hideModal = () => {
        this.setState({
            visible: false,
        });
    }
    //新增
    onClick = () => {
        this.setState({
            visible: true,
            type: 'insert',
        });
    }
    //发货与退货
    onChange = (e) => {
        console.log('radio checked', e.target.value);
        if (e.target.value == 0) {//发货,最大值为未发货数
            this.setState({
                num: this.props.productOrder.order.commodity_num - this.props.productOrder.order.shipnum
            });
        } else if (e.target.value == 1) {//退货,最大值为发货数
            this.setState({
                num: this.props.productOrder.order.shipnum
            });
        }

    }

    //数量改变判断
    // changeNum = (value) => {
    //     console.log('inputNumber checked', value);

    //     if(this.state.num<value){
    //         message.error('剩余数量不足',3);
    //         this.props.form.setFieldsValue({
    //             ship_num:''
    //         })
    //     }

    //   }

    render() {
        const { id, order_id, name, phone, commodity_name, commodity_price, commodity_num, updatedAt,
            ship_status, shipping_address, express, shipnum } = this.props.productOrder.order;
        const { getFieldDecorator } = this.props.form;

        const { shiprecord, type } = this.state;

        //form表单的样式
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
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
            title: '商品订单管理',
            href: '/product/productOrder/list',
        }, {
            title: '发货',
        }];


        //表头
        const columns = [{
            title: '快递单号',
            dataIndex: 'express_number',
            editable: true,
        }, {
            title: '操作人',
            dataIndex: 'user_name',
            editable: true,
        }, {
            title: '快递名称',
            dataIndex: 'express_name',
            editable: true,
        }, {
            title: '发货时间',
            dataIndex: 'ship_time',
        }, {
            title: '发货数量',
            dataIndex: 'ship_num',
            editable: true,
        }, {
            title: '状态',
            dataIndex: 'status',
            render: (text, record) => {
                return (
                    record.status == '0' ? '发货' : '退货'
                )
            }
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                return (
                    <Button onClick={this.onEdit.bind(null, record)} type='primary'>修改</Button>
                );
            },
        }];

        return (

            <div className={styles.content}>
                <PageHeader breadcrumbList={breadcrumbList} className={styles.page} />
                <div className={styles.tableList} style={{ paddingTop: '24px' }}>
                    <Row type="flex" justify="center">
                        <Col span={8}>
                            <FormItem   {...formItemLayout}
                                label="订单编号"
                            >
                                {order_id}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem   {...formItemLayout}
                                label="客户姓名"
                            >
                                {name}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem   {...formItemLayout}
                                label="客户手机号"
                            >
                                {phone}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span={8}>
                            <FormItem   {...formItemLayout}
                                label="商品名称"
                            >
                                {commodity_name}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem   {...formItemLayout}
                                label="商品价格"
                            >
                                {commodity_price}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem   {...formItemLayout}
                                label="购买数量"
                            >
                                {commodity_num}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span={8}>
                            <FormItem   {...formItemLayout}
                                label="下单时间"
                            >
                                {updatedAt}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem   {...formItemLayout}
                                label="发货状态"
                            >
                                {ship_status == '0' ? '未发货' : '已发货'}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            {/* <FormItem   {...formItemLayout}
                                label="未发货数"
                            >
                                {commodity_num-shipnum}
                            </FormItem> */}
                        </Col>
                    </Row>
                    <Row >
                        <Col span={8}>
                            <FormItem   {...formItemLayout}
                                label="未发货数"
                            >
                                {commodity_num - shipnum}
                            </FormItem>
                        </Col>
                        <Col span={16}>
                            <FormItem   {...formItemLayout}
                                label="收货地址"
                            >
                                {shipping_address}
                            </FormItem>
                        </Col>
                    </Row>
                    <Button type="dashed" onClick={this.onClick} style={{ width: '100%', height: 35, marginBottom: 50 }}>
                        <Icon type="plus" /> 添加发货信息
                    </Button>
                    <Modal
                        title="添加发货信息"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.hideModal}
                        okText="确认"
                        cancelText="取消"
                        destroyOnClose
                    >

                        <FormItem   {...formItemLayout}
                            label="快递单号"
                        >
                            {getFieldDecorator('express_number', {
                                rules: [{ required: true, message: '请输入快递单号' }],
                                initialValue: type == 'update' ? shiprecord.express_number : ''
                            })(
                                <Input placeholder="请输入快递单号" />
                            )}

                        </FormItem>
                        <FormItem   {...formItemLayout}
                            label="快递名称">
                            {getFieldDecorator('express_name', {
                                rules: [{ required: true, message: '请输入快递名称' }],
                                initialValue: type == 'update' ? shiprecord.express_name : ''
                            })(
                                <Input placeholder="请输入快递名称" />
                            )}

                        </FormItem>



                        {type == 'insert' &&
                            <FormItem   {...formItemLayout}
                                label="状态">
                                {getFieldDecorator('status', {
                                    rules: [{ required: true, message: '请选择状态' }],
                                })(
                                    <RadioGroup onChange={this.onChange}>
                                        <Radio value={0}>发货</Radio>
                                        <Radio value={1}>退货</Radio>
                                    </RadioGroup>
                                )}

                            </FormItem>
                        }

                        {type == 'update' &&
                            <FormItem   {...formItemLayout}
                                label="状态">
                                {shiprecord.status == '0' ? '发货' : '退货'}
                            </FormItem>
                        }
                        <FormItem   {...formItemLayout}
                            label="数量">
                            {getFieldDecorator('ship_num', {
                                rules: [{ required: true, message: '请输入数量' }],
                                initialValue: type == 'update' ? shiprecord.ship_num : ''
                            })(
                                <InputNumber min={0} placeholder="请输入数量"  style={{ width: '100%' }} disabled={type == 'update' ? true : false} />
                            )}

                        </FormItem>
                        <FormItem   {...formItemLayout}
                            label="发货时间">
                            {getFieldDecorator('ship_time', {
                                rules: [{ required: true, message: '请选择发货时间' }],
                                initialValue: type == 'update' ? moment(shiprecord.ship_time) : null
                            })(

                                <DatePicker
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                    placeholder="请选择发货时间"
                                    style={{ width: '100%' }}
                                // onChange={onChange}
                                // onOk={onOk}
                                />
                            )}
                        </FormItem>

                    </Modal>

                    <div>
                        <Table dataSource={this.props.productOrder.order.express} columns={columns} />
                    </div>

                </div>
            </div>

        )

    }
}


function mapStateToProps({ productOrder }) {
    return { productOrder };
}
Expres = Form.create()(Expres);
export default connect(mapStateToProps)(withRouter(Expres))