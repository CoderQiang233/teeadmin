import React, { PureComponent } from 'react';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import { Row, Col, Form, Icon, Input, Table, Button, Card, Popconfirm,Modal } from 'antd';
import styles from './index.less';
import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import { getAuthority } from '../../utils/authority';
import {Route,Link } from 'react-router-dom'


import moment from 'moment';
import groupBy from 'lodash/groupBy';
import { Debounce } from 'lodash-decorators';


const ButtonGroup = Button.Group;
const Authorized = RenderAuthorized(getAuthority());


export default class DataList extends PureComponent {

    state = {
        
    }
    componentWillUnmount() {
        // this.triggerResizeEvent.cancel();
    }



    handleReset = () => {
        this.props.form.resetFields();
    }


    render() {
        const {
            columns, dataSource, addClick, searchFields, searchClick, expandedRowRender,listLoading,rowKey,pagination,searchHidden,addHidden
        } = this.props;


        return (
            <div className={styles.dataList}>
                <div className={styles.main}>
                    <div >
                        <Card bordered={false}>
                            <Form className='ant-advanced-search-form'>
                                <Row gutter={24}>{searchFields}</Row>
                                <Row>
                                    <Col span={2} >
                                    {sessionStorage.getItem("userId")=="1"&&
                                        <Button  style={{display:addHidden }} type="primary" onClick={addClick}><Icon type="plus" />新增</Button>
                                    }
                                    </Col>
                                    <Col span={22} style={{ textAlign: 'right',display:searchHidden }} >
                                        <Button type="primary" htmlType="submit" onClick={searchClick}>搜索</Button>
                                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                            重置
                                        </Button>
                                    </Col>
                                </Row>

                            </Form>
                            <div className={styles.tableStyle}>
                                <Table className="components-table-demo-nested" columns={columns} dataSource={dataSource} expandedRowRender={expandedRowRender} 
                                    loading={listLoading} rowKey={rowKey} pagination={pagination}
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}
