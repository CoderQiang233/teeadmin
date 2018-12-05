import React, { Component } from 'react'
import { connect } from 'react-redux';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import DataList from '../../components/DataList/index';
import { Switch, Route, Redirect, HashRouter, withRouter } from 'react-router-dom';
import { Popconfirm, Divider, Icon, Col, Form, Input, Table, DatePicker, Button, Select,Radio,Card,Modal  } from 'antd';
import moment from 'moment';
import { history } from '../../store'
import { push } from 'react-router-redux';
import styles from './index.less';
import { hashHistory } from 'react-router';
import ShowImg from '../../components/ShowImg/index'
const querystring = require("querystring");

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class MeetingList extends Component {

    state = {
        visible: false,
        searchOption: {},
        mStatus:'1',
        current:1,
        SignModalVisible:false
    }

    componentWillMount() {
        console.log('willmount')
        this.props.dispatch({
            type: 'meeting/getList',
            payload: {
                mStatus: this.state.mStatus
            }
        });
        this.props.dispatch({
            type: 'meetingRoom/getList',
            payload: {}
        });
        this.props.dispatch({
            type: 'meeting/getTree',
            payload: {}
        });
        this.props.dispatch({
            type: 'department/getDepartmentList',
            payload: {},
        });
        this.props.dispatch({
            type: 'protocol/getList',
            payload: {}
        });
    }


    componentDidMount() {
        this.props.changeTitle('会议管理');

    }

    addClick = (meetingRoom, meeting, department, protocol) => {
        this.props.history.push({
            pathname: '/meeting/add',
            state: { meetingRoom, meeting, department, protocol }
        });

    }

    edit = (meetingRoom, meeting, department, tableData, protocol) => {
        console.log('调用立项编辑方法')
        this.props.history.push({
            pathname: '/meeting/edit',
            // search:querystring.stringify(meetingRoom, meeting, department, tableData, protocol),
            state: { meetingRoom, meeting, department, tableData, protocol }
        });
    }

    handleOk = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

            }
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }
    delete = (id) => {
        console.log('删除', id)
        this.props.dispatch({
            type: 'meeting/del',
            payload: { id: id }
        });
    }

    searchClick = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
            values.mStatus = this.state.mStatus;
            if (values.searchDate) {
                values.searchDate = values.searchDate.format('YYYY-MM-DD HH:mm:ss');
            }
            this.setState({
                searchOption: values
            });
            this.props.dispatch({
                type: 'meeting/getList',
                payload: values
            })
        });
    }

    getFields() {
        const { getFieldDecorator } = this.props.form;
        const { meetingRoom } = this.props;
        const formItemLayout = {
            labelCol: {
                span: 4, offset: 0
            },
            wrapperCol: {
                span: 18
            },
        };
        const meetingRoomOptions = meetingRoom.list.map(item => <Option key={item.id}>{item.roomName}</Option>);
        const children = [];
        children.push(

            <Col span={8} key={0} >

                <FormItem label={'地点'} >
                    {getFieldDecorator('meetingRoom', {
                        // rules: [{
                        //     required: true,
                        //     message: 'Input something!',
                        // }],
                    })(
                        <Select placeholder='请选择' allowClear showSearch optionFilterProp="children" style={{ width: '70%' }}>
                            {meetingRoomOptions}
                        </Select>
                    )}
                </FormItem>
            </Col>,
            <Col span={8} key={4} >
                <FormItem label={'时间'} >
                    {getFieldDecorator('searchDate', {
                        // rules: [{
                        //     required: true,
                        //     message: 'Input something!',
                        // }],
                    })(
                        <DatePicker style={{ width: '60%' }} />
                    )}
                </FormItem>
            </Col>,
            <Col span={8} key={1} >
                <FormItem label={'会议主题'} >
                    {getFieldDecorator('meetingName', {
                        // rules: [{
                        //     required: true,
                        //     message: 'Input something!',
                        // }],
                    })(
                        <Input placeholder='请输入会议主题' />
                    )}
                </FormItem>
            </Col>
        );
        return children;
    }

    mStatusChange = (e) => {
        this.setState({
            mStatus: e.target.value,
        }, function () {
            this.props.dispatch({
                type: 'meeting/getList',
                payload: {
                    mStatus: this.state.mStatus
                }
            });
        });
    }


    startMeeting = (meetingId) => {
        console.log(meetingId)
        this.props.dispatch({
            type: 'meeting/startMeeting',
            payload: {
                id: meetingId,
                mStatus: this.state.mStatus,
                ...this.state.searchOption,
                current: this.state.current
            }
        });
    }

    endMeeting = (meetingId) => {
        console.log(meetingId)
        this.props.dispatch({
            type: 'meeting/endMeeting',
            payload: {
                id: meetingId,
                mStatus: this.state.mStatus,
                ...this.state.searchOption,
                current: this.state.current
            }
        });
    }


    checkSignIn=(meetingId)=>{
        // history.push({
        //     pathname: '/meeting/signInStaff',
        //     state: { meetingId}
        // });
        this.props.dispatch({
            type: 'meeting/getSinInStaff',
            payload: {id:meetingId}
        })
        this.setState({SignModalVisible:true})
    }
    handleSignCancel = () => {
        this.setState({ SignModalVisible: false });
      }
    // checkSignIn = (meetingId) => {
    //     history.push({
    //         pathname: '/meeting/signInStaff',
    //         state: { meetingId }
    //     });
    // }
    // 跳转到试题管理
    redirectToExam = (meetingId,status) => {
        history.push({
            pathname:'/meeting/exampaperList',
            state:{meetingId,status}
        })
    }

    render() {
        const { meeting, meetingRoom, department, protocol } = this.props;
        
        const pagination = {
            total: parseInt(meeting.total),
            pageSize: parseInt(meeting.pageSize),
            onChange: (pageNumber) => {
                this.setState({
                    current: pageNumber
                })
                console.log(pageNumber)
                this.props.dispatch({
                    type: 'meeting/getList',
                    payload: { current: pageNumber, ...this.state.searchOption, mStatus: this.state.mStatus }
                })
            }
        };

        const columns = [{
            title: '会议主题',
            dataIndex: 'meetingName',
        }, {
            title: '讲师',
            dataIndex: 'lecturer',
        }, {
            title: '地点',
            dataIndex: 'roomName',
        }, {
            title: '时间',
            dataIndex: 'time'
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    <a onClick={this.edit.bind(this, meetingRoom, meeting, department, record, protocol)} title='编辑'><Icon type="edit" /></a>
                    <Divider type="vertical" />
                    <Popconfirm title="是否删除?" placement="topRight" onConfirm={this.delete.bind(this, record.id)}>
                        <a title='删除'><Icon type="delete" /></a>
                    </Popconfirm>
                    {
                        (record.test === '1') &&
                        <span>
                            <Divider type="vertical" />
                            {/* <Button type="primary" size='small' onClick={this.redirectToExam.bind(this, record.id)} >试题管理</Button> */}
                            <a title='试题管理'  onClick={this.redirectToExam.bind(this, record.id,record.status)}><Icon type="book" /></a>
                        </span>
                    }
                    {
                        record.status === '0' &&
                        <span>
                            <Divider type="vertical" />
                            <Popconfirm title="是否开始该会议?" placement="topRight" onConfirm={this.startMeeting.bind(this, record.id)}>
                                <Button type="primary" size='small' >开始会议</Button>
                            </Popconfirm>

                        </span>
                    }
                    {
                        record.status === '1' &&
                        <span>
                            <Divider type="vertical" />
                            <Popconfirm title="是否结束该会议?" placement="topRight" onConfirm={this.endMeeting.bind(this, record.id)}>
                                <Button type="danger" size='small'    >结束会议</Button>
                            </Popconfirm>

                        </span>
                    }
                    {
                        record.status === '2' &&
                        <span>
                            <Divider type="vertical" />
                            <Button type="primary" size='small' onClick={this.checkSignIn.bind(this, record.id)}>查看签到人员</Button>
                            {/* <Divider type="vertical" />
                            <Button type="primary" size='small' disabled>已结束</Button> */}
                        </span>
                    }
                </div>
            ),

        }];
        return (
            <div >
                <Card bordered={false} style={{marginBottom:'-10px',marginTop:'10px'}}>
                    <RadioGroup onChange={this.mStatusChange} value={this.state.mStatus}>
                        <RadioButton value="1">未开始会议</RadioButton>
                        <RadioButton value="2">已结束会议</RadioButton>
                    </RadioGroup>
                </Card>

                <DataList columns={columns} searchFields={this.getFields()} searchClick={this.searchClick} form={this.props.form} listLoading={meeting.loading}
                    dataSource={meeting.list} addClick={this.addClick.bind(this, meetingRoom, meeting, department, protocol)} pagination={pagination} rowKey='id'
                />
                <SignStaffModal
                 visible={this.state.SignModalVisible}
                 onCancel={this.handleSignCancel}
                 onCreate={this.handleSignCancel}
                 singInStaffList={this.props.meeting.singInStaffList}
                ></SignStaffModal>
            </div>


        )
    }
}



class SignStaffModal extends React.Component {


    render(){
        const { visible, onCancel, onCreate,singInStaffList} = this.props;
        const columns = [ {
            title: '序号',
            key: 'index',
            render:(text, record, index)=>(
               <span>{index+1}</span>
            )
        },{
            title: '姓名',
            dataIndex: 'name',
        },{
            title: '工号',
            dataIndex: 'jobNum',
        },  {
            title: '部门',
            dataIndex: 'deptName',
        },{
            title: '签到时间',
            dataIndex: 'signTime'
        }, {
            title: '照片',
            key: 'photo',
            render:(text, record, index)=>(
                <ShowImg imgStr={record.photopath}></ShowImg>
             )
        },];

        return(
            <Modal
            visible={visible}
            title='签到人员'
            okText='确定'
            onCancel={onCancel}
            onOk={onCreate}
            width={900}
            >
                <Table  dataSource={singInStaffList} columns={columns} />

            </Modal>
        )
    }
}


MeetingList = Form.create({})(MeetingList);

export default connect(
    ({ meeting, meetingRoom, department, protocol }) => {
        return { meeting, meetingRoom, department, protocol };
    }
)(MeetingList);