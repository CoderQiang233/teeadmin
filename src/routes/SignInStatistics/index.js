import React, { Component } from 'react';
import { connect } from 'react-redux';
import Styles from './index.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import moment from 'moment';
import { push } from 'react-router-redux';
import DataList from '../../components/DataList/index';
import ShowImg from '../../components/ShowImg/index'
import {apiAdmin} from '../../utils/config.js'


import { Switch, Route, Redirect, HashRouter, withRouter } from 'react-router-dom';
import { Popconfirm, Divider, Icon, Col, Form, Input, Table, DatePicker, Button, Select,Card,Modal,Spin,Radio ,Badge,Row  } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class SignInStatistics extends Component{

    state = {
        meetingId: 0,
        searchValue:{},
        SignModalVisible:false,
        hasTest:0,
        hasPhoto:0
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'statistics/getStatisticsList',
            payload: this.state.searchValue
        })
        this.props.dispatch({
            type: 'statistics/getDepartment',
            payload: {}
        })
    }

    renderSearchForm=()=>{
        const { getFieldDecorator } = this.props.form;
         const { departments } = this.props.statistics;
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
                    <FormItem label={'日期'} >
                        {getFieldDecorator('dateTime', {
                           
                        })(
                            <DatePicker  />
                        )}
                    </FormItem>
                </Col>
        );
        return children;
    }

    searchClick = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values)
                if(values.dateTime!=undefined){
                    values.dateTime=values.dateTime.format('YYYY-MM-DD 00:00:00')
                }
                
                console.log(values)
                this.props.dispatch({
                    type: 'statistics/getStatisticsList',
                    payload: values
                })
            }
        });
    };
    handleReset = () => {
        this.props.form.resetFields();
    }



    checkSignIn=(meetingId,hasTest,hasPhoto)=>{
        this.setState({
            hasTest,
            hasPhoto,
            meetingId
        })
        // this.props.dispatch({
        //     type: 'meeting/getSinInStaff',
        //     payload: {id:meetingId},
        // })
        this.props.dispatch({
            type: 'statistics/getSignInStaff',
            payload: {meetingId:meetingId,signInType:0},
        })
        this.setState({SignModalVisible:true})
    }

    handleSignCancel = () => {
        this.setState({ SignModalVisible: false });
      }



    exportSignList=(meetingId,signInType)=>{
        // this.props.dispatch({
        //     type: 'statistics/exportSignList',
        //     payload: {meetingId:meetingId},
        // })
        console.log(apiAdmin)
        window.location.href=apiAdmin+"?service=Statistics.ExportSignInList&meetingId="+meetingId+'&signInType='+signInType; 
    }


    render(){

        const columns = [{
            title: '序号',
            key: 'index',
            render:(text, record, index)=>(
               <span>{index+1}</span>
            )
        },{
            title: '会议名称',
            dataIndex: 'meetingName',
        }, {
            title: '部门',
            dataIndex: 'deptName',
        }, {
            title: '签到人数',
            dataIndex: 'signCount',
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    <Button type="primary" size='small'  onClick={this.checkSignIn.bind(this,record.id,record.test,record.hasPhoto)}>查看签到人员</Button>
                </div>
            ),

        }];
       


        return (<div className={Styles.content}>

            <PageHeaderLayout title='签到统计'  >
            </PageHeaderLayout>
            <DataList listLoading={this.props.statistics.loading} columns={columns} addHidden={'none'}  searchFields={this.renderSearchForm()} searchClick={this.searchClick} dataSource={this.props.statistics.statisticsList} form={this.props.form}/>
            <SignStaffModal
                 visible={this.state.SignModalVisible}
                 onCancel={this.handleSignCancel}
                 onCreate={this.handleSignCancel}
                 singInStaffList={this.props.statistics.signList}
                 hasTest={this.state.hasTest}
                 hasPhoto={this.state.hasPhoto}
                 exportSignList={this.exportSignList}
                 meetingId={this.state.meetingId}
                 dispatch={this.props.dispatch}
                ></SignStaffModal>
        </div>)
    }

}

const SignStaffModal = Form.create()(
    class  extends React.Component {
        state = {
            searchOption:{},
            signInType:0
        }
        handleSearch = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
              console.log('Received values of form: ', values);
              values.meetingId=this.props.meetingId;
              this.setState({
                searchOption:values,
                signInType:values.signInType
              })
              this.props.dispatch({
                type: 'statistics/getSignInStaff',
                payload:values,
            })
        
            });
          }

        render(){
            const { visible, onCancel, onCreate,singInStaffList,hasPhoto,hasTest,exportSignList,meetingId,form} = this.props;
            const { getFieldDecorator } = form;
            const expandedRowRender = (record) => {
                const columns = [
                    {
                        title: '签退情况',
                        dataIndex: 'signOff',
                        render:(text,record,index)=>{
                            if(text==1){
                                return <Badge status="success" text="已签退" />
                            }else{
                                return <Badge status="error" text="未签退" />
                            }
                        }
                    },{
                        title: '签退时间',
                        dataIndex: 'signOffTime',
                    },{
                        title: '签退地点',
                        dataIndex: 'signOffAddress',
                    }
                ];
                let data=[{
                    signOff:record.signOff,
                    signOffTime:record.signOffTime,
                    signOffAddress:record.signOffAddress,
                    
                }];
                return (
                    <Table
                      columns={columns}
                      dataSource={data}
                      pagination={false}
                    />
                  );
            }
            let columns=[]
            if(hasPhoto==1){
                if(hasTest==1){
                     columns = [ 
                        {
                            title: '姓名',
                            dataIndex: 'name',
                            width:80,
                        },{
                            title: '工号',
                            width:100,
                            dataIndex: 'jobNum',
                        },  {
                            title: '部门',
                            width:100,
                            dataIndex: 'deptName',
                        },   {
                            title: '签到情况',
                            dataIndex: 'sign',
                            width:100,
                            render:(text,record,index)=>{
                                if(text==1){
                                    return <Badge status="success" text="已签到" />
                                }else{
                                    return <Badge status="error" text="未签到" />
                                }
                            }
                        },{
                            title: '签到时间',
                            width:198,
                            dataIndex: 'signTime',
                        },{
                            title: '签到地点',
                            width:150,
                            dataIndex: 'address',
                        },{
                            title: '随堂测试',
                            dataIndex: 'test',
                            width:100,
                        },{
                            title: '照片',
                            key: 'photo',
                            render:(text, record, index)=>(
                                <ShowImg imgStr={record.photopath}></ShowImg>
                             )
                        }];
                }else{
                     columns = [ 
                        {
                            title: '姓名',
                            dataIndex: 'name',
                            width:80,
                        },{
                            title: '工号',
                            dataIndex: 'jobNum',
                            width:100,
                            
                        },  {
                            title: '部门',
                            dataIndex: 'deptName',
                            width:100,
                            
                        }, {
                            title: '签到情况',
                            dataIndex: 'sign',
                            width:100,
                            render:(text,record,index)=>{
                                if(text==1){
                                    return <Badge status="success" text="已签到" />
                                }else{
                                    return <Badge status="error" text="未签到" />
                                }
                            }
                        }, {
                            title: '签到时间',
                            width:198,
                            dataIndex: 'signTime'
                        },  {
                            title: '签到地点',
                            width:150,
                            dataIndex: 'address'
                        },{
                            title: '照片',
                            key: 'photo',
                            render:(text, record, index)=>(
                                <ShowImg imgStr={record.photopath}></ShowImg>
                             )
                        },];
                }
    
            }else{
                if(hasTest==1){
                     columns = [ 
                        {
                            title: '姓名',
                            dataIndex: 'name',
                            
                        },{
                            title: '工号',
                            dataIndex: 'jobNum',
                        },  {
                            title: '部门',
                            dataIndex: 'deptName',
                        }, {
                            title: '签到情况',
                            dataIndex: 'sign',
                            render:(text,record,index)=>{
                                if(text==1){
                                    return <Badge status="success" text="已签到" />
                                }else{
                                    return <Badge status="error" text="未签到" />
                                }
                            }
                        }, {
                            title: '签到时间',
                            dataIndex: 'signTime'
                        },  {
                            title: '签到地点',
                            dataIndex: 'address'
                        },{
                            title: '随堂测试',
                            dataIndex: 'test'
                        },];
                }else{
                     columns = [ 
                        {
                            title: '姓名',
                            dataIndex: 'name',
                            
                        },{
                            title: '工号',
                            dataIndex: 'jobNum',
                        },  {
                            title: '部门',
                            dataIndex: 'deptName',
                        },  {
                            title: '签到情况',
                            dataIndex: 'sign',
                            render:(text,record,index)=>{
                                if(text==1){
                                    return <Badge status="success" text="已签到" />
                                }else{
                                    return <Badge status="error" text="未签到" />
                                }
                            }
                        },{
                            title: '签到时间',
                            dataIndex: 'signTime'
                        },  {
                            title: '签到地点',
                            dataIndex: 'address'
                        }];
                }
            }
            const formItemLayout = {
               
              };
    
            return(
                <Modal
                visible={visible}
                title='签到人员'
                okText='确定'
                onCancel={onCancel}
                onOk={onCreate}
                width={1100}
                >
                    <Form
                        layout='inline'
                        onSubmit={this.handleSearch}
                        style={{marginBottom:'10px'}}
                        >
                        <FormItem {...formItemLayout} label='签到情况' >
                            {getFieldDecorator(`signInType`)(
                             <Select  style={{width:'120px'}}>
                             <Option value={0}>全部</Option>
                             <Option value={1}>已签到</Option>
                             <Option value={2} >未签到</Option>
                            </Select>
                            )}
                        </FormItem>
                        <FormItem >
                        <Button type="primary" htmlType="submit">检索</Button>
                            <Button style={{ marginLeft: 8 }} onClick={exportSignList.bind(this,meetingId,this.state.signInType)}>
                                导出数据
                            </Button>
                        </FormItem>
                            
                    </Form>
                    {/* <div><Button onClick={exportSignList.bind(this,meetingId)}>导出数据</Button></div> */}
                    {/* <Table scroll={{ x: 1160 }}  expandedRowRender={expandedRowRender} dataSource={singInStaffList} columns={columns} /> */}
                    <Table  expandedRowRender={expandedRowRender} dataSource={singInStaffList} columns={columns} />
    
                </Modal>
            )
        }
    })


SignInStatistics = Form.create({})(SignInStatistics);


export default connect(
    ({statistics,meeting})=>{
        return {statistics,meeting};
    }
)(withRouter(SignInStatistics));