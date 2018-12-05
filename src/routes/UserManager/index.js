import React, { Component } from 'react'
import { connect } from 'react-redux';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DataList from '../../components/DataList/index';
import { Switch, Route, Redirect, HashRouter, withRouter } from 'react-router-dom';
import { Popconfirm, Divider, Icon, Col, Form, Input, Table, DatePicker, Button, Select, Card, Modal, Spin } from 'antd';
import moment from 'moment';
import { push } from 'react-router-redux';


const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;


class UserManager extends Component {

    state = {
        visible: false,
        addVisible: false,
        searchValue: {},
        departmentId: 0,
        action: 'add',
        modalTitle: '新增用户',
        modalBtn: '新增',
        pwdVisible: false
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'user/getUserList',
            payload: this.state.searchValue
        })
    }

    searchClick = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.dispatch({
                    type: 'user/getUserList',
                    payload: values
                })
                this.setState({
                    searchValue: values
                })
            }
        });
    };

    renderSearchForm = () => {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 4, offset: 0
            },
            wrapperCol: {
                span: 18
            },
        };
        //const departmentOptions = departments.map(item => <Option key={item.id}>{item.deptName}</Option>);
        const children = [];
        children.push(

            // <Col span={8} key={0} >

            //     <FormItem label={'部门'} >
            //         {getFieldDecorator('departmentId', {
            //         })(
            //             <Select placeholder='请选择部门' allowClear showSearch optionFilterProp="children" style={{width:'70%'}}>
            //                 {departmentOptions}
            //             </Select>
            //         )}
            //     </FormItem>
            // </Col>,
            <Col span={8} key={1} >
                <FormItem label={'手机号'} >
                    {getFieldDecorator('phoneNum', {
                        rules: [{ pattern: '^1[0-9]{10}$', message: '请输入正确的手机号' }],
                    })(
                        <Input placeholder='请输入手机号' />
                        )}
                </FormItem>
            </Col>
        );
        return children;
    }

    addUser = () => {
        const form = this.addFormRef.props.form;
        form.resetFields();
        this.setState(
            {
                departmentId: '',
                action: 'add',
                addVisible: true,
                modalTitle: '新增用户',
                modalBtn: '新增'
            }
        );
    }

    edit = (user) => {
        const form = this.addFormRef.props.form;
        form.setFieldsValue(
            {
                'userName': user.userName,
                'name': user.name,
                'role': user.role,
                'tel': user.tel,
                //'pwd':user.pwd,
            }
        )
        this.setState(
            {
                userId: user.id,
                addVisible: true,
                action: 'edit',
                modalTitle: '编辑用户信息',
                modalBtn: '编辑'
            }
        )
    }

    delete = (id) => {
        this.props.dispatch({
            type: 'user/deletUser',
            payload: { userId: id }
        })
    }


    handleAddCancel = () => {
        this.setState({ addVisible: false });
    }
    handleAddCreate = () => {
        const form = this.addFormRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            if (this.state.action == 'add') {
                this.props.dispatch({
                    type: 'user/addUser',
                    payload: values
                })
                this.setState({ addVisible: false });
            } else if (this.state.action == 'edit') {
                values['userId'] = this.state.userId
                this.props.dispatch({
                    type: 'user/editUser',
                    payload: values
                })
                this.setState({ addVisible: false });
            }
            console.log('Received values of form: ', values);

        });
    }
    saveFormRef = (formRef) => {
        this.addFormRef = formRef;
    }


    editPwd = (userId) => {
        this.setState(
            {
                userId: userId,
                pwdVisible: true,
            }
        )
    }
    handlePwdCancel = () => {
        this.setState({ pwdVisible: false });
    }
    handlePwdCreate = () => {
        const form = this.pwdFormRef.props.form;
        console.log('改密:', form)
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.userId = this.state.userId;
            this.props.dispatch({
                type: 'user/changePwd',
                payload: values
            })
            this.setState(
                {
                    pwdVisible: false,
                }
            )
            console.log('Received values of form: ', values);

        });
    }
    savePwdFormRef = (formRef) => {
        this.pwdFormRef = formRef;
    }
    render() {
        const columns = [{
            title: '用户名',
            dataIndex: 'userName',
        }, {
            title: '真实姓名',
            dataIndex: 'name',
        }, {
            title: '角色',
            dataIndex: 'role',
        }, {
            title: '电话',
            dataIndex: 'tel'
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    {sessionStorage.getItem("userId") == "1" &&
                        <a onClick={this.edit.bind(this, record)} title='编辑'><Icon type="edit" /></a>
                    }
                    <Divider type="vertical" />
                    {sessionStorage.getItem("userId") == "1" &&
                        <Popconfirm title="是否删除?" placement="topRight" onConfirm={this.delete.bind(this, record.id)}>
                            <a title='删除'><Icon type="delete" /></a>
                        </Popconfirm>
                    }
                    <Divider type="vertical" />
                    {sessionStorage.getItem("userId") == "1" &&
                        <Button type="primary" icon="edit" size='small' onClick={this.editPwd.bind(this, record['id'])}>修改密码</Button>
                    }
                </div>
            ),

        }];
        return (
            <PageHeaderLayout title='用户管理'  >
                <DataList listLoading={this.props.UserManager.loading} columns={columns} addClick={this.addUser}
                    searchFields={this.renderSearchForm()}
                    searchClick={this.searchClick} dataSource={this.props.UserManager.userList} form={this.props.form} 
                    rowKey={record => record.id}/>
                <AddDepartmentForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.addVisible}
                    onCancel={this.handleAddCancel}
                    onCreate={this.handleAddCreate}
                    modalTitle={this.state.modalTitle}
                    modalBtn={this.state.modalBtn}
                    action={this.state.action}
                    departments={this.props.UserManager.departments}
                />
                <EditPwdForm
                    wrappedComponentRef={this.savePwdFormRef}
                    visible={this.state.pwdVisible}
                    onCancel={this.handlePwdCancel}
                    onCreate={this.handlePwdCreate}
                />


            </PageHeaderLayout>
        )
    }
}


const AddDepartmentForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form, modalTitle, modalBtn, departments, action } = this.props;
            const { getFieldDecorator } = form;
            const departmentOptions = departments.map(item => <Option key={item.id}>{item.deptName}</Option>);
            return (
                <Modal
                    visible={visible}
                    title={modalTitle}
                    okText={modalBtn}
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <FormItem label="用户名">
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名' }],
                            })(
                                <Input placeholder='请输入用户名' />
                                )}
                        </FormItem>
                        <FormItem label="密码">
                            {getFieldDecorator('pwd', {
                                rules: [{ required: action == 'add', message: '请输入密码' }],
                            })(
                                <Input disabled={action != 'add'} placeholder='请输入密码' type='password' />
                                )}
                        </FormItem>

                        <FormItem label="真实姓名">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入真实姓名' }],
                            })(
                                <Input placeholder='请输入真实姓名' />
                                )}
                        </FormItem>

                        <FormItem label="	手机号">
                            {getFieldDecorator('tel', {
                                rules: [{ required: true, message: '请输入手机号' }, { pattern: '^1[0-9]{10}$', message: '请输入正确的手机号' }],
                            })(
                                <Input placeholder='请输入手机号' />
                                )}
                        </FormItem>
                        <FormItem label="角色">
                            {getFieldDecorator('role', {
                                rules: [{ required: true, message: '请选择角色' }],
                            })(
                                <Select >
                                    <Option value="admin">超级管理员</Option>
                                    <Option value="user">普通管理员</Option>
                                </Select>
                                )}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);

const EditPwdForm = Form.create()(
    class extends React.Component {
        state={
            confirmDirty:false
          }


        checkPassword = (rule, value, callback) => {
            const form = this.props.form;
            if (value && value !== form.getFieldValue('nPwd')) {
                callback('两次密码输入不一致!');
            } else {
                callback();
            }
        }
        checkConfirm = (rule, value, callback) => {
            const form = this.props.form;
            if (value && this.state.confirmDirty) {
                form.validateFields(['confirm'], { force: true });
            }
            callback();
        }
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title={'修改密码'}
                    okText={'修改'}
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <FormItem label="新密码">
                            {getFieldDecorator('nPwd', {
                                rules: [{ required: true, message: '请输入新密码' },{  validator: this.checkConfirm, }],
                            })(
                                <Input placeholder='请输入新密码' type='password' />
                                )}
                        </FormItem>
                        <FormItem label="确认密码">
                            {getFieldDecorator('confirm', {
                                rules: [{ required: true, message: '请确认密码!' }, {
                                    validator: this.checkPassword,
                                }],

                            })(
                                <Input type='password' onBlur={this.handleConfirmBlur} />
                                )}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);









UserManager = Form.create({})(UserManager);

export default connect(({ UserManager }) => {
    return { UserManager }
})(withRouter(UserManager));