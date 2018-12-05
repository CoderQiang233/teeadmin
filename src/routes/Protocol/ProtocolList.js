import React, { Component } from 'react'
import { connect } from 'react-redux';

import DataList from '../../components/DataList/index';
import { Switch, Route, Redirect, HashRouter, withRouter } from 'react-router-dom';
import { Popconfirm, Divider, Icon, Col, Form, Input, Table, DatePicker, Button, Select, Card, Modal, Spin, List } from 'antd';
import moment from 'moment';
import { push } from 'react-router-redux';
import styles from './index.less';
import { history } from '../../store'

// 引入编辑器以及编辑器样式
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'

const FormItem = Form.Item;


class ProtocolList extends Component {

    state = {
        visible: false,
        addVisible: false,
        searchValue: {},
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'protocol/getList',
            payload: {}
        })

        this.props.changeTitle('培训协议管理');


    }

    searchClick = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.dispatch({
                    type: 'department/getDepartmentList',
                    payload: values
                })
                this.setState({
                    searchValue: values
                })
                // this.props.dispatch({
                //     type: 'test',
                //     payload: {}
                // })
            }
        });
    };



    addClick = () => {
        history.push('/protocol/add');
    }

    edit = (tableData) => {
        history.push({
            pathname:'/protocol/edit',
            state:{tableData}
        });
    }

    delete = (id) => {
        console.log('删除会议id:', id)
        this.props.dispatch({
            type: 'protocol/del',
            payload: { id: id }
        })
    }



    render() {
        const columns = [{
            title: '序号',
            dataIndex: 'id',
            render: (text, record, index) => (index + 1)
        }, {
            title: '协议名称',
            dataIndex: 'name',
        }, {
            title: '创建时间',
            dataIndex: 'submitTime',

        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    <a onClick={this.edit.bind(this, record)} title='编辑'><Icon type="edit" /></a>
                    <Divider type="vertical" />
                    <Popconfirm title="是否删除?" placement="topRight" onConfirm={this.delete.bind(this, record.id)}>
                        <a title='删除'><Icon type="delete" /></a>
                    </Popconfirm>
                </div>
            ),

        }];
        const { protocol } = this.props;
        return (

            <DataList columns={columns} searchClick={this.searchClick} form={this.props.form} listLoading={protocol.loading}
                dataSource={protocol.list} addClick={this.addClick.bind(this)} rowKey='id' searchHidden={'none'}
            />


        )
    }
}


ProtocolList = Form.create({})(ProtocolList);

export default connect(({ protocol }) => {
    return { protocol }
})(withRouter(ProtocolList));