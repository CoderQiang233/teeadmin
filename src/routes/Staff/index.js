import React, { Component } from 'react'
import { connect } from 'react-redux';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DataList from '../../components/DataList/index';
import { Switch, Route, Redirect, HashRouter, withRouter } from 'react-router-dom';
import { Popconfirm, Divider, Icon, Col, Form, Input, Table, DatePicker, Button, Select,Card,Modal,Spin,Radio ,Upload ,message  } from 'antd';
import moment from 'moment';
import { push } from 'react-router-redux';
import {apiAdmin} from '../../utils/config.js'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;
class Staff extends Component {

    state = {
        visible: false,
        addVisible:false,
        searchValue:{},
        departmentId:0,
        action:'add',
        modalTitle:'新增人员',
        modalBtn:'新增'
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'staff/getStaffList',
            payload: this.state.searchValue
        })
        this.props.dispatch({
            type: 'staff/getDepartment',
            payload: {}
        })
    }

    searchClick = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'staff/getStaffList',
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
         const { departments } = this.props.staff;
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
                    <FormItem label={'工号'} >
                        {getFieldDecorator('jobNum', {
                            //  rules: [{ pattern: '^1[0-9]{10}$', message: '请输入正确的手机号' }],
                        })(
                            <Input placeholder='请输入工号'/>
                        )}
                    </FormItem>
                </Col>
        );
        return children;
    }

    addStaff=()=>{
        const form = this.addFormRef.props.form;
        form.resetFields();
        this.setState(
            { 
                staffId:'',
                action:'add',
                addVisible: true ,
                modalTitle:'新增组人员',
                modalBtn:'新增'
            }
        );
    }

    edit=(staff)=>{
        const form = this.addFormRef.props.form;
        form.setFieldsValue(
            {
                'name':staff.name,
                // 'age':staff.age,
                'sex':staff.sex,
                'phoneNum':staff.phoneNum,
                'department':staff.department,
                'position':staff.position,
                'email':staff.email,
                'jobNum':staff.jobNum
            }
        )
        this.setState(
            {
                staffId:staff.id,
                addVisible: true ,
                action:'edit',
                modalTitle:'编辑人员',
                modalBtn:'编辑'
            }
        )
    }

    delete=(id)=>{
        this.props.dispatch({
            type: 'staff/deletStaff',
            payload: {staffId:id}
        })
    }

    
      handleAddCancel = () => {
        const form = this.addFormRef.props.form;
        form.resetFields();
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
                type: 'staff/addStaff',
                payload: values
                })
          }else if(this.state.action=='edit'){
              values['staffId']=this.state.staffId
            this.props.dispatch({
                type: 'staff/editStaff',
                payload: values
                })
          }
          console.log('Received values of form: ', values);
          
          
        //   this.setState({ addVisible: false });
        });
      }
      saveFormRef = (formRef) => {
        this.addFormRef = formRef;
      }



      

    render() {
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
        }, {
            title: '性别',
            dataIndex: 'sex',
        }, 
        // {
        //     title: '年龄',
        //     dataIndex: 'age',
        // },
         {
            title: '电话',
            dataIndex: 'phoneNum'
        }, {
            title: '所属部门',
            dataIndex: 'deptName'
        }, {
            title: '岗位',
            dataIndex: 'position'
        }, {
            title: '工号',
            dataIndex: 'jobNum'
        }, {
            title: '电子邮箱',
            dataIndex: 'email'
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
                <PageHeaderLayout title='人员管理'  >
                    <DataList listLoading={this.props.staff.loading} columns={columns} addClick={this.addStaff} searchFields={this.renderSearchForm()} searchClick={this.searchClick} dataSource={this.props.staff.staffList} form={this.props.form}/>
                    <AddDepartmentForm
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.addVisible}
                        onCancel={this.handleAddCancel}
                        onCreate={this.handleAddCreate}
                        modalTitle={this.state.modalTitle}
                        modalBtn={this.state.modalBtn}
                        action={this.state.action}
                        departments={this.props.staff.departments}
                        dispatch={this.props.dispatch}
                        />



                </PageHeaderLayout>
        )
    }
}
function beforeUpload(file) {
    const isExcel = (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'||file.type ==='application/vnd.ms-excel');
    if (!isExcel) {
      message.error('请上传Excel文件!');
    }
    return isExcel ;
  }

const AddDepartmentForm = Form.create()(
    class extends React.Component {

        state={
            fileList:[]
        }

        handleExcelChange = (info) => {
            let fileList = info.fileList;
            console.log(233)
            // 1. Limit the number of uploaded files
            //    Only to show two recent uploaded files, and old ones will be replaced by the new
            fileList = fileList.slice(-1);
        
            // 2. read from response and show file link
            fileList = fileList.map((file) => {
              if (file.response) {
                // Component will show file.url as link
                file.url = file.response.data.file;
              }
              return file;
            });
        
            // 3. filter successfully uploaded files according to response from server
            fileList = fileList.filter((file) => {
              if (file.response) {
                return file.response.ret === 200;
              }
              return true;
            });

            this.setState({ fileList });
            let _that=this;
            if(fileList.length!=0){
                if(fileList[0].status=='done'){
                    if(fileList[0].response.ret==200){
                        console.log('上传成功')
                        confirm({
                            title: '模板上传成功，是否导入?',
                            onOk() {
                                _that.props.dispatch({
                                    type: 'staff/importStaff',
                                    payload: {filePath:fileList[0].url}
                                })
                                _that.props.onCancel()
                            },
                            onCancel() {
                              console.log('Cancel');
                            },
                        });
                    }
                }
            }
            
            
          }


      render() {
        const { visible, onCancel, onCreate, form,modalTitle,modalBtn,departments } = this.props;
        const { getFieldDecorator } = form;
        const departmentOptions = departments.map(item => <Option key={item.id}>{item.deptName}</Option>);

        const props = {
            name: 'execlFile',
            action: apiAdmin+'?service=Staff.UploadExcel',
            onChange: this.handleExcelChange,
            multiple: true,
            beforeUpload:beforeUpload
        };



        return (
          <Modal
            visible={visible}
            title={modalTitle}
            okText={modalBtn}
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Divider orientation="left">批量导入</Divider>
            <Upload {...props} fileList={this.state.fileList}>
                <Button>
                <Icon type="upload" /> 上传模板Excel文件
                </Button>
            </Upload>
            <Divider orientation="left">添加人员</Divider>
            <Form layout="vertical">
              <FormItem label="姓名">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入姓名' }],
                })(
                  <Input placeholder='请输入姓名' />
                )}
              </FormItem>
              <FormItem label="工号">
                {getFieldDecorator('jobNum', {
                  rules: [{ required: true, message: '请输入工号' }],
                })(
                  <Input placeholder='请输入工号' />
                )}
              </FormItem>
              <FormItem label="性别">
                {getFieldDecorator('sex', {
                  rules: [{ required: true, message: '请选择性别' }],
                  initialValue:'男'
                })(
                    <RadioGroup >
                    <Radio value={'男'}>男</Radio>
                    <Radio value={'女'}>女</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              {/* <FormItem label="年龄">
                {getFieldDecorator('age', {
                  rules: [{ required: true, message: '请输入组织机构人数' }],
                })(
                  <Input placeholder='请输入组织机构人数' />
                )}
              </FormItem> */}
              
              <FormItem label="	所属部门">
                {getFieldDecorator('department', {
                  rules: [{ required: true, message: '请选择所属部门' }],
                })(
                    <Select placeholder='请选择部门' allowClear showSearch optionFilterProp="children" >
                    {departmentOptions}
                </Select>
                )}
              </FormItem>
              <FormItem label="岗位">
                {getFieldDecorator('position', {
                  rules: [{ required: false, message: '请输入岗位' }],
                })(
                  <Input placeholder='请输入岗位' />
                )}
              </FormItem>
              <FormItem label="电话">
                {getFieldDecorator('phoneNum', {
                  rules: [{ required: false, message: '请输入电话' },{ pattern: '^1[0-9]{10}$', message: '请输入正确的手机号' }],
                })(
                  <Input placeholder='请输入电话' />
                )}
              </FormItem>
              <FormItem label="电子邮箱">
                {getFieldDecorator('email', {
                  rules: [{ required: false, message: '请输入电子邮箱' },{type:'email', message: '请输入正确的电子邮箱'}],
                })(
                  <Input placeholder='请输入电子邮箱' />
                )}
              </FormItem>
            </Form>
          </Modal>
        );
      }
    }
  );











  Staff = Form.create({})(Staff);

export default connect(({department,staff})=>{
    return {department,staff}
})(withRouter(Staff));