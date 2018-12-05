import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Switch, Route, Redirect, HashRouter, withRouter } from 'react-router-dom';
import { Popconfirm, Divider, Icon, Col, Form, Input, Table, DatePicker, Button, Select, Modal, TreeSelect,Radio } from 'antd';
import moment from 'moment';
import { push } from 'react-router-redux';
import styles from './index.less';
import {api,imgPath} from '../../utils/config'
// 引入编辑器以及编辑器样式
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class MeetingAdd extends Component {

    state = {
        visible: false,
        startValue: null,
        endValue: null,
        endOpen: false,
    }


    componentDidMount() {
        this.props.changeTitle('新增会议')
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if (values.introduction === '<p></p>') {
                    Modal.warning({
                        title: '讲师简介不能为空！！！',
                    });
                    return false;
                }
                if (values.content === '<p></p>') {
                    Modal.warning({
                        title: '会议内容不能为空！！！',
                    });
                    return false;
                }
               let beginTime=values.beginTime
                values.beginTime = values.beginTime.format('YYYY-MM-DD 00:00:00');
                values.endTime = beginTime.format('YYYY-MM-DD 23:59:59');
                values.members = values.members.join(',');
                this.props.dispatch({
                    type: 'meeting/add',
                    payload: values
                })
            }
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    handleChange = (content) => {
        // console.log(content)
    }

    handleRawChange = (rawContent) => {
        // console.log(rawContent)
    }

    //时间限制开始
    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() >= endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    onDateChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }

    onStartChange = (value) => {
        this.onDateChange('startValue', value);
    }

    onEndChange = (value) => {
        this.onDateChange('endValue', value);
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }
    //时间限制结束




    // 富文本上传
    uploadFn = (param) => {
        console.log(param)
        const serverURL = api+'?service=Upload.Upload';
        const xhr = new XMLHttpRequest
        const fd = new FormData()
        // libraryId可用于通过mediaLibrary示例来操作对应的媒体内容      
        const successFn = (response) => {
          // 假设服务端直接返回文件上传后的地址
          // 上传成功后调用param.success并传入上传后的文件地址
          param.success({
            url: imgPath+JSON.parse(xhr.responseText).data.file,
          })
        }
        xhr.addEventListener("load", successFn, false)
        fd.append('file', param.file)
        xhr.open('POST', serverURL, true)
        xhr.send(fd)
      }

    render() {
        const SHOW_PARENT = TreeSelect.SHOW_PARENT;
        const { getFieldDecorator } = this.props.form;
        const { meetingRoom,meeting,department,protocol } = this.props.location.state;
        const meetingRoomOptions = meetingRoom.list.map(item => <Option key={item.id}>{item.roomName}</Option>);
        const deptOptions = department.departmentList.map(item => <Option key={item.id}>{item.deptName}</Option>);
        const protocolOptions = protocol.list.map(item => <Option key={item.id}>{item.name}</Option>);
        const treeData = meeting.treeList;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };
        const editorProps = { //富文本框参数
            height: 300,
            contentFormat: 'html',
            // initialContent: '<p>讲师简介</p>',
            onChange: this.handleChange,
            onRawChange: this.handleRawChange,
            media:{
                uploadFn :this.uploadFn,
                image: true, // 开启图片插入功能
                video: false, // 开启视频插入功能
                audio: false, // 开启音频插入功能
                embed: false
            }

        };
        const tProps = { //参会人员树选择
            treeData,
            // value: this.state.value,
            // onChange: this.onChange,
            treeCheckable: true,
            // showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: '请选择参会人员',
            style: {
                width: 300,
            },

        };
        return (
            <div className={styles.huiyi}>
                <div className={styles.main}>
                    <div className={styles.formstyle}>

                        <FormItem label='会议主题' {...formItemLayout}>
                            {getFieldDecorator('meetingName', {
                                rules: [{
                                    required: true,
                                    message: '请输入会议主题!',
                                }],
                            })(
                                <Input placeholder="会议主题" />
                            )}
                        </FormItem>
                        <FormItem label='会议讲师' {...formItemLayout}>
                            {getFieldDecorator('lecturer', {
                                rules: [{
                                    required: true,
                                    message: '请输入会议讲师!',
                                }],
                            })(
                                <Input placeholder="会议讲师" />
                            )}
                        </FormItem>
                        <FormItem label='讲师简介' labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                            {getFieldDecorator('introduction', {
                                rules: [{
                                    required: true,
                                    message: '请输入讲师简介!',
                                }],
                            })(
                                <BraftEditor {...editorProps} initialContent='<p>讲师简介</p>' />
                            )}
                        </FormItem>
                        <FormItem label='时间' {...formItemLayout}>
                            {getFieldDecorator('time', {
                                rules: [{
                                    required: true,
                                    message: '请输入时间!',
                                }],
                            })(
                                <Input placeholder="时间" />
                            )}
                        </FormItem>
                        <FormItem label='开始日期' {...formItemLayout}>
                            {getFieldDecorator('beginTime', {
                                rules: [{
                                    required: true,
                                    message: '请输入时间!',
                                }],
                            })(
                                <DatePicker disabledDate={this.disabledStartDate}
                                    onChange={this.onStartChange}
                                    onOpenChange={this.handleStartOpenChange}
                                />
                            )}
                        </FormItem>
                        {/* <FormItem label='结束日期' {...formItemLayout}>
                            {getFieldDecorator('endTime', {
                                rules: [{
                                    required: true,
                                    message: '请输入时间!',
                                }],
                            })(
                                <DatePicker disabledDate={this.disabledEndDate}
                                    onChange={this.onEndChange}
                                    open={this.state.endOpen}
                                    onOpenChange={this.handleEndOpenChange}
                                />
                            )}
                        </FormItem> */}
                        <FormItem label='地点' {...formItemLayout}>
                            {getFieldDecorator('meetingRoom', {
                                rules: [{
                                    required: true,
                                    message: '请选择地点!',
                                }],
                            })(
                                <Select placeholder='请选择' allowClear showSearch optionFilterProp="children" style={{ width: '100%' }}>
                                    {meetingRoomOptions}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label='主办部门' {...formItemLayout}>
                            {getFieldDecorator('inchargeDept', {
                                rules: [{
                                    required: true,
                                    message: '请选择主办部门!',
                                }],
                            })(
                                <Select placeholder='请选择' allowClear showSearch optionFilterProp="children" style={{ width: '100%' }}>
                                    {deptOptions}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label='组织者' {...formItemLayout}>
                            {getFieldDecorator('organizer', {
                                rules: [{
                                    required: true,
                                    message: '请输入组织者!',
                                }],
                            })(
                                <Input placeholder="组织者" />
                            )}
                        </FormItem>
                        <FormItem label='会议内容' labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                            {getFieldDecorator('content', {
                                rules: [{
                                    required: true,
                                    message: '请输入会议内容!',
                                }],
                            })(
                                <BraftEditor {...editorProps} initialContent='<p>会议内容</p>' />
                            )}
                        </FormItem>
                        <FormItem label='参会人员' {...formItemLayout}>
                            {getFieldDecorator('members', {
                                rules: [{
                                    required: true,
                                    message: '请选择参会人员!',
                                }],
                            })(
                                <TreeSelect {...tProps} style={{ width: '100%' }} allowClear/>
                            )}
                        </FormItem>
                        <FormItem label='培训协议' {...formItemLayout}>
                            {getFieldDecorator('protocol', {
                                rules: [{
                                    required: true,
                                    message: '请选择培训协议!',
                                }],
                            })(
                                <Select placeholder='请选择' allowClear showSearch optionFilterProp="children" style={{ width: '100%' }}>
                                    <Option key='0'>无培训协议</Option>
                                    {protocolOptions}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label='随堂考试' {...formItemLayout}>
                            {getFieldDecorator('test', {
                                rules: [{
                                    required: true,
                                    message: '请选择随堂考试!',
                                }],
                            })(
                                <RadioGroup >
                                    <Radio value={'1'}>有</Radio>
                                    <Radio value={'0'}>无</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem label='签到拍照' {...formItemLayout}>
                            {getFieldDecorator('hasPhoto', {
                                rules: [{
                                    required: true,
                                    message: '请选择是否签到拍照!',
                                }],
                            })(
                                <RadioGroup >
                                    <Radio value={'1'}>有</Radio>
                                    <Radio value={'0'}>无</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem
                            wrapperCol={{ span: 12, offset: 4 }}
                        >
                            <Button type="primary" onClick={this.handleSubmit} loading={this.props.meeting.loading}>提交</Button>
                            {/* <Button style={{ marginLeft: 10 }} onClick={this.handleReset}>重置</Button> */}
                        </FormItem>
                    </div>
                </div>
            </div>
        )
    }
}


MeetingAdd = Form.create({})(MeetingAdd);

export default connect(
    ({meeting})=>{
        return {meeting};
    }
)(withRouter(MeetingAdd));