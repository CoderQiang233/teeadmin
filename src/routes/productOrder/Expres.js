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
import { history } from '../../store';
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

                if (this.state.type == 'insert'&&this.props.productOrder.order.pay>=2) {
                    message.warn('该订单已发货！',3);
                    return false;
                }

                values.order_id = this.props.productOrder.order.order_id;
                if (this.state.type == 'update') {
                    values.express_id = this.state.shiprecord.id;
                }
                values.ship_time = getDate(values.ship_time);
                values.user_name = sessionStorage.getItem("name");
                values.userName = sessionStorage.getItem("userName");
               
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


    //跳转到商品编辑页
    handleClick = (record) => {
        history.push({
            pathname: '/product/productList/editProduct',
            state: { record: record }
        })
    }

    render() {
        const { receiver_name, receiver_phone, shipping_address, total,products } = this.props.productOrder.order

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
        },
        // {
        //     title: '状态',
        //     dataIndex: 'status',
        //     render: (text, record) => {
        //         return (
        //             record.status == '0' ? '发货' : '退货'
        //         )
        //     }
        // }, 
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                return (
                    <Button onClick={this.onEdit.bind(null, record)} type='primary'>修改</Button>
                );
            },
        }];

        let _this=this;
        return (

            <div className={styles.content}>
                <PageHeader breadcrumbList={breadcrumbList} className={styles.page} />
                <div className={styles.tableList} style={{ paddingTop: '24px' }}>
                    <Row type="flex" justify="center" style={{ marginBottom: 10 }}>
                        <Col span={24}>
                            <Icon type="info" style={{ color: '#40a9ff' }} /><b style={{ fontSize: 14 }}>配送地址:</b>
                        </Col>
                    </Row>

                    <Row type="flex" justify="center" style={{ marginLeft: 10 }}>
                        <Col span={24}>
                            <div>
                                {receiver_name}
                                ({receiver_phone})
                            </div>

                        </Col>
                    </Row>

                    <Row type="flex" justify="center" style={{ marginLeft: 10, marginBottom: 20 }}>
                        <Col span={24}>
                            <div>{shipping_address}</div>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" style={{ marginBottom: 100 }}>
                        <Col span={24}>
                            <div className={styles.orderProduct} >
                                <table >
                                    <thead>
                                        <tr>
                                            <th>商品名称</th>
                                            <th>数量</th>
                                            <th>价格</th>
                                            <th>总计</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products && products.map(function (item, index) {
                                            return (
                                                <tr key={index}>
                                                    <td><a type="primary" onClick={_this.handleClick.bind(null,item)}>{item.name}</a></td>
                                                    <td>{item.quantity}</td>
                                                    <td>￥{item.price}</td>
                                                    <td>￥{item.total}</td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="3">商品总额</td>
                                            <td>￥{total}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3">订单总额</td>
                                            <td>￥{total}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
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



                        {/* {type == 'insert' &&
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
                        } */}
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