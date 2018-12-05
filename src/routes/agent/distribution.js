import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../../common/common.less';
import { Table, Button, Popconfirm, Modal, Form, Input, InputNumber, Card } from 'antd';
import { Pie, yuan } from '../../components/Charts';
import { pageSize, apiAdmin } from '../../utils/config'
import PageHeader from 'ant-design-pro/lib/PageHeader';
import { history } from '../../store';
const ButtonGroup = Button.Group;
//代理分布
class distribution extends Component {

    constructor(props) {

        super(props)
        this.state = {
            salesType: 'all',
        }
    }

    componentDidMount() {

        this.props.dispatch({
            type: 'fetchChart',
            payload: {},
        });
        this.props.dispatch({
            type: 'findCountByMemberLecel',
            payload: {},
        });
    }


   //跳转到会员页面(只显示会员)
    handleClick = (record,values) => {
        console.log('level:',record)
        history.push({
            pathname: '/member/msg',
             state: {record}
          })
      }

    render() {
        const { salesType } = this.state;
        const { chart, memberRedux } = this.props;
        const {
            salesTypeData,
          } = chart;
        const {
            levelCount,
          } = memberRedux;

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
            href:'/',
        }, {
            title: '代理分布',
        }];

        //const salesPieData = salesTypeData;
        const salesPieData = levelCount;
        return (
            <div className={styles.content}>
                <PageHeader breadcrumbList={breadcrumbList} className={styles.page} />
                <div className={styles.tableList}>
                    <Card
                        className={styles.salesCard}
                        bordered={false}
                        title="会员类别占比"
                        bodyStyle={{ padding: 24 }}
                        style={{ marginTop: 24, minHeight: 509 }}
                    >
                    <div className={styles.search}>
            <ButtonGroup>
              <Button type="primary" onClick={this.handleClick.bind(null, 1)} >会员</Button>
              <Button type="primary" onClick={this.handleClick.bind(null, 2)} >创客</Button>
              <Button type="primary" onClick={this.handleClick.bind(null, 3)} >盟主</Button>
              <Button type="primary" onClick={this.handleClick.bind(null, 4)} >合伙人</Button>
            </ButtonGroup>
          </div>
                        {/* <h4 style={{ marginTop: 8, marginBottom: 32 }}>会员各等级注册人数</h4> */}
                        <Pie
                            hasLegend
                            subTitle="注册人数"
                            total={salesPieData.reduce((pre, now) => now.y + pre, 0)+'人'}
                            data={salesPieData}
                            valueFormat={val => val+'人'}
                            height={248}
                            lineWidth={4}
                        />

                    </Card>
                </div>
            </div>
        )
    }

}

function mapStateToProps({ chart, memberRedux }) {

    return { chart, memberRedux };
}

export default connect(mapStateToProps)(distribution);