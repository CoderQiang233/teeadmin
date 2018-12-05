import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styles from '../common/common.less';
import { Card, Col, Row, Button, Icon, Avatar, Table } from 'antd';
import { frontPath, apiIframe, apiAdmin, pageSize } from '../utils/config';
import { Pie, yuan } from 'ant-design-pro/lib/Charts';
import { history } from '../store';
const { Meta } = Card;
const iframesrc = apiIframe + '/Public/admin/map.html?url=' + apiAdmin;

class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'findAllProductOrderCount',
            payload: {}
        })
        //订单
        this.props.dispatch({
            type: 'findProductOrderNewest',
            payload: {},
        })


    }
    //操作
    operation = (orderId, values) => {

        history.push({
            pathname: '/product/productOrder/express',
            state: { orderId: orderId }
        });

    }
    render() {
        const { orderNum, totalPrice, userNum } = this.props.main
        const ShopSvg = () => (
            <svg viewBox="0 0 1024 1024" data-icon="shopping-cart" width="1em" height="1em"
                fill="currentColor" aria-hidden="true" style={{ width: 60, height: 60, color: 'rgba(24,144,255,0.1)' }}>
                <path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z">
                </path>
            </svg>
        );

        const WalletSvg = () => (
            <svg viewBox="64 64 896 896" data-icon="wallet" width="1em" height="1em"
                fill="currentColor" aria-hidden="true" style={{ width: 55, height: 60, color: 'rgba(24,144,255,0.1)' }}>
                <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 464H528V448h312v128zm0 264H184V184h656v200H496c-17.7 0-32 14.3-32 32v192c0 17.7 14.3 32 32 32h344v200zM580 512a40 40 0 1 0 80 0 40 40 0 1 0-80 0z">
                </path>
            </svg>
        );

        const UserSvg = () => (
            <svg viewBox="64 64 896 896" data-icon="user" width="1em" height="1em"
                fill="currentColor" aria-hidden="true" style={{ width: 60, height: 60, color: 'rgba(24,144,255,0.1)' }}>
                <path d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z">
                </path>
            </svg>
        );

        //表头
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '商品名',
            dataIndex: 'commodity_name',
            key: 'commodity_name',
        }, {
            title: '下单时间',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
        }, {
            title: '总价',
            dataIndex: 'total',
            key: 'total',
            render(text, record) {
                return (
                    <div>
                        {record.commodity_price * record.commodity_num}
                    </div>
                )
            }
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                
                <a><Icon type='setting' onClick={this.operation.bind(null, record.id)}></Icon></a>
            ),
        }];

        return (
            <div>
                <div style={{ background: '#ECECEC', padding: '30px' }}>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title="总订单数" style={{ height: 160 }} bordered={false}
                                extra={<a href={frontPath + '/product/productOrder/list'}>显示详细</a>}
                            >
                                <Meta
                                    avatar={<Icon component={ShopSvg} />}
                                    title={orderNum}
                                    className={styles.cardStyle}
                                />

                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="销售总额" style={{ height: 160 }} bordered={false}
                                extra={<a href={frontPath + '/product/productOrder/list'}>显示详细</a>}
                            >
                                <Meta
                                    avatar={<Icon component={WalletSvg} />}
                                    title={'¥' + totalPrice}
                                    className={styles.cardStyle}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="总客户数" style={{ height: 160 }} bordered={false}
                                extra={<a href={frontPath + '/member/msg'}>显示详细</a>}
                            >
                                <Meta
                                    avatar={<Icon component={UserSvg} />}
                                    title={userNum}
                                    className={styles.cardStyle}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 20 }}>
                        <div className={styles.mapbigbox}>
                        <Col span={12}>
                        <div className={styles.fontIndex}>整体概要</div>
                            <iframe src={iframesrc}
                                className={styles.videoIframe} id="myVideo" />
                        </Col>
                        <Col span={12}>
                            <div className={styles.newOrder}>
                            <div className={styles.fontIndex2}>最新订单</div>
                                <Table
                                    dataSource={this.props.main.orderNewest} columns={columns}
                                    loading={this.props.main.loading} pagination={false}
                                    // title={() => '最新订单'}
                                />
                            </div>
                        </Col>
                        </div>
                    </Row>
                </div>
            </div>
        )
    }

}


function mapStateToProps({ main }) {
    return { main };
}
export default connect(mapStateToProps)(Index);