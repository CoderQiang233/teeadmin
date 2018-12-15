import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../../common/common.less';
import { Table, Button, Popconfirm, Modal, Form, Input, message,Divider } from 'antd';
import { pageSize } from '../../utils/config'
import PageHeader from 'ant-design-pro/lib/PageHeader';
import { history } from '../../store';
import { Record } from 'immutable';
import EditModule from './editModule'

const ButtonGroup = Button.Group;
const FormItem = Form.Item;

class indexLayout extends Component {
    constructor(props) {

        super(props)
        this.state = {
            addVisible: false,
            searchValue: {},
            departmentId: 0,
            action: 'add',
            modalTitle: '新增人员',
            modalBtn: '新增',
            moduleKey: '',
            module: {}
        }
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'indexLayout/getIndexModule',
            payload: {}
        })
    }

    addModule = () => {
        history.push({
            pathname: '/indexLayout/addModule',
        });
    }
    editModule = (module) => {
        this.props.dispatch({
            type: 'indexLayout/getProductOption',
            payload: {}
        })
        this.setState({
            moduleId: module.module_id,
            moduleKey: module.keyword,
            module: module,
            addVisible: true,
            action: 'edit',
            modalTitle: '编辑组织机构',
            modalBtn: '编辑'
        }, function () {
            console.log(this.state)
        })
    }
    handleAddCancel = () => {
        const form = this.addFormRef.props.form;
        form.resetFields();
        this.setState({ addVisible: false });
    }
    saveFormRef = (formRef) => {
        this.addFormRef = formRef;
    }
    cloneObjectFn = (obj) => {
        return JSON.parse(JSON.stringify(obj))
    }
    handleAddCreate = () => {
        const form = this.addFormRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            let data = this.cloneObjectFn(values);
            delete data.name;
            delete data.sort_order;
            const dataJson = JSON.stringify(data);
            values.setting = dataJson;
            values.keyword = this.state.moduleKey;
            values.id = this.state.moduleId;
            this.props.dispatch({
                type: 'indexLayout/editIndexModule',
                payload: values
            })
            console.log('Received values of form: ', values);


            //   this.setState({ addVisible: false });
        });
    }
    deleteConfirm = (module_id) => {
        this.props.dispatch({
            type: 'indexLayout/deleteModule',
            payload: {'id':module_id}
        })
    }

    deleteCancel = (e) => {
        console.log(e);
        message.error('Click on No');
    }
    render() {
        //页头
        const breadcrumbList = [{
            title: '首页',
            href: '/',
        }, {
            title: '首页布局管理',
        },];
        const columns = [{
            title: '模块名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '排序',
            dataIndex: 'sort_order',
            key: 'sort_order',
        }, {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (Text, record) => {
                return (
                    <span>
                        <Button onClick={this.editModule.bind(this, record)}>修改</Button>
                        <Divider type="vertical" />
                        <Popconfirm title="确定删除该模块?" onConfirm={this.deleteConfirm.bind(this,record['module_id'])} onCancel={this.deleteCancel.bind(this)} okText="Yes" cancelText="No">
                        <Button type="danger">删除</Button>
                        </Popconfirm>
                    </span>
                )
            }
        }];
        return (
            <div className={styles.content}>
                <PageHeader breadcrumbList={breadcrumbList} className={styles.page} />
                <div className={styles.tableList}>
                    <Button onClick={this.addModule}>添加模块</Button>
                    <Table dataSource={this.props.indexLayoutRedux.moduleList} columns={columns} />
                </div>
                <EditModule
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.addVisible}
                    onCancel={this.handleAddCancel}
                    onCreate={this.handleAddCreate}
                    modalTitle={this.state.modalTitle}
                    modalBtn={this.state.modalBtn}
                    action={this.state.action}
                    dispatch={this.props.dispatch}
                    moduleKey={this.state.moduleKey}
                    module={this.state.module}
                ></EditModule>
            </div>
        );
    }
}

function mapStateToProps({ indexLayoutRedux }) {

    return { indexLayoutRedux };
}
export default connect(mapStateToProps)(indexLayout);