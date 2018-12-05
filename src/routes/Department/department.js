import React, { Component } from 'react'
import { connect } from 'react-redux';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DataList from '../../components/DataList/index';
import { Switch, Route, Redirect, HashRouter, withRouter } from 'react-router-dom';
import { Popconfirm, Divider, Icon, Col, Form, Input, Table, DatePicker, Button, Select,Card,Modal,Spin  } from 'antd';
import moment from 'moment';
import { push } from 'react-router-redux';


const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;


class Department extends Component {

    state = {
        visible: false,
        addVisible:false,
        searchValue:{},
        departmentId:0,
        action:'add',
        modalTitle:'新增组织机构',
        modalBtn:'新增'
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'department/getDepartmentList',
            payload: this.state.searchValue
        })
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
                    searchValue:values
                })
                // this.props.dispatch({
                //     type: 'test',
                //     payload: {}
                // })
            }
        });
    };

    renderSearchForm=()=>{
        const { getFieldDecorator } = this.props.form;
         const { departments } = this.props.department;
        const formItemLayout = {
            labelCol: {
                span: 4,offset:0
            },
            wrapperCol: {
                span: 18
            },
        };
         const departmentOptions = departments.map(item => <Option key={item.id}>{item.deptName}</Option>);
        const children = [];
        children.push(

                <Col span={8} key={0} >

                    <FormItem label={'部门'} >
                        {getFieldDecorator('departmentId', {
                        })(
                            <Select placeholder='请选择部门' allowClear showSearch optionFilterProp="children" style={{width:'70%'}}>
                                {departmentOptions}
                            </Select>
                        )}
                    </FormItem>
                </Col>,
                <Col span={8} key={1} >
                    <FormItem label={'手机号'} >
                        {getFieldDecorator('phoneNum', {
                            rules: [{ pattern: '^1[0-9]{10}$', message: '请输入正确的手机号' }], 
                        })(
                            <Input placeholder='请输入手机号'/>
                        )}
                    </FormItem>
                </Col>
        );
        return children;
    }

    addDepartment=()=>{
        const form = this.addFormRef.props.form;
        form.resetFields();
        this.setState(
            { 
                departmentId:'',
                action:'add',
                addVisible: true ,
                modalTitle:'新增组织机构',
                modalBtn:'新增'
            }
        );
    }

    edit=(department)=>{
        const form = this.addFormRef.props.form;
        form.setFieldsValue(
            {
                'deptName':department.deptName,
                'deptCode':department.deptCode,
                'incharge':department.incharge,
                'inchargeTel':department.inchargeTel,
                'numbers':department.numbers
            }
        )
        this.setState(
            {
                departmentId:department.id,
                addVisible: true ,
                action:'edit',
                modalTitle:'编辑组织机构',
                modalBtn:'编辑'
            }
        )
    }

    delete=(id)=>{
        console.log('删除会议id:',id)
        this.props.dispatch({
            type: 'department/deletDepartment',
            payload: {departmentId:id}
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
          if(this.state.action=='add'){
            this.props.dispatch({
                type: 'department/addDepartment',
                payload: values
                })
          }else if(this.state.action=='edit'){
              values['departmentId']=this.state.departmentId
            this.props.dispatch({
                type: 'department/editDepartment',
                payload: values
                })
          }
          console.log('Received values of form: ', values);
          
          form.resetFields();
          this.setState({ addVisible: false });
        });
      }
      saveFormRef = (formRef) => {
        this.addFormRef = formRef;
      }

    render() {
        const columns = [
            {
                title: '部门ID',
                dataIndex: 'id',
            },{
            title: '组织机构名称',
            dataIndex: 'deptName',
        }, {
            title: '编码',
            dataIndex: 'deptCode',
        }, {
            title: '人数',
            dataIndex: 'numbers',
        }, {
            title: '主要负责人',
            dataIndex: 'incharge'
        }, {
            title: '手机号',
            dataIndex: 'inchargeTel'
        },{
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    <a onClick={this.edit.bind(this,record)} title='编辑'><Icon type="edit" /></a>
                    <Divider type="vertical" />
                    <Popconfirm title="是否删除?" placement="topRight" onConfirm={this.delete.bind(this, record.id)}>
                        <a title='删除'><Icon type="delete" /></a>
                    </Popconfirm>
                </div>
            ),

        }];
        return (
                <PageHeaderLayout title='组织机构管理'  >
                    <DataList listLoading={this.props.department.loading} columns={columns} addClick={this.addDepartment} searchFields={this.renderSearchForm()} searchClick={this.searchClick} dataSource={this.props.department.departmentList} form={this.props.form}/>
                    <AddDepartmentForm
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.addVisible}
                        onCancel={this.handleAddCancel}
                        onCreate={this.handleAddCreate}
                        modalTitle={this.state.modalTitle}
                        modalBtn={this.state.modalBtn}
                        action={this.state.action}
                        department={this.state.department}
                        />



                </PageHeaderLayout>
        )
    }
}


const AddDepartmentForm = Form.create()(
    class extends React.Component {
      render() {
        const { visible, onCancel, onCreate, form,modalTitle,modalBtn,department } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            title={modalTitle}
            okText={modalBtn}
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <FormItem label="组织机构名称">
                {getFieldDecorator('deptName', {
                  rules: [{ required: true, message: '请输入组织机构名称' }],
                })(
                  <Input placeholder='请输入组织机构名称' />
                )}
              </FormItem>
              <FormItem label="编码">
                {getFieldDecorator('deptCode', {
                  rules: [{ required: true, message: '请输入组织机构编码' }],
                })(
                  <Input placeholder='请输入组织机构编码' />
                )}
              </FormItem>
              <FormItem label="人数">
                {getFieldDecorator('numbers', {
                  rules: [{ required: true, message: '请输入组织机构人数' }],
                })(
                  <Input placeholder='请输入组织机构人数' />
                )}
              </FormItem>
              <FormItem label="主要负责人">
                {getFieldDecorator('incharge', {
                  rules: [{ required: true, message: '请输入主要负责人' }],
                })(
                  <Input placeholder='请输入主要负责人' />
                )}
              </FormItem>
              <FormItem label="	手机号">
                {getFieldDecorator('inchargeTel', {
                  rules: [{ required: true, message: '请输入手机号' },{ pattern: '^1[0-9]{10}$', message: '请输入正确的手机号' }],
                })(
                  <Input placeholder='请输入手机号' />
                )}
              </FormItem>
            </Form>
          </Modal>
        );
      }
    }
  );











Department = Form.create({})(Department);

export default connect(({department})=>{
    return {department}
})(withRouter(Department));