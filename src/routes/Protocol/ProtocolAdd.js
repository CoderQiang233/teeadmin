import React, { Component } from 'react'
import { connect } from 'react-redux';
// eslint-disable-next-line
import { Switch, Route, Redirect, HashRouter, withRouter } from 'react-router-dom';
// eslint-disable-next-line
import { Popconfirm, Divider, Icon, Col, Form, Input, Table, DatePicker, Button, Select, Modal, TreeSelect } from 'antd';
// eslint-disable-next-line
import moment from 'moment';
import styles from './index.less';

// 引入编辑器以及编辑器样式
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
// eslint-disable-next-line
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const FormItem = Form.Item;


class ProtocolAdd extends Component {

    state = {
        visible: false,
        startValue: null,
        endValue: null,
        endOpen: false,
    }


    componentDidMount() {
        this.props.changeTitle('新增协议')
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if (values.content === '<p></p>') {
                    Modal.warning({
                        title: '内容不能为空！！！',
                    });
                    return false;
                }
                this.props.dispatch({
                    type: 'protocol/add',
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

    render() {
        const { getFieldDecorator } = this.props.form;
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
            height: 800,
            contentFormat: 'html',
            // initialContent: '<p>讲师简介</p>',
            onChange: this.handleChange,
            onRawChange: this.handleRawChange
        };
        return (
            <div className={styles.huiyi}>
                <div className={styles.main}>
                    <div className={styles.formstyle}>

                        <FormItem label="协议名称" {...formItemLayout}>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入协议名称' }],
                            })(
                                <Input placeholder='协议名称' />
                            )}
                        </FormItem>
                        <FormItem label="协议内容" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                            {getFieldDecorator('content', {
                                rules: [{ required: true, message: '请输入协议内容' }],
                            })(
                                <BraftEditor {...editorProps} initialContent='<p>协议内容</p>' />
                            )}
                        </FormItem>
                        <FormItem
                            wrapperCol={{ span: 12, offset: 4 }}
                        >
                            <Button type="primary" onClick={this.handleSubmit} loading={this.props.meeting.loading}>提交</Button>
                            <Button style={{ marginLeft: 10 }} onClick={this.handleReset}>重置</Button>
                        </FormItem>
                    </div>
                </div>
            </div>
        )
    }
}


ProtocolAdd = Form.create({})(ProtocolAdd);

export default connect(
    ({meeting})=>{
        return {meeting};
    }
)(withRouter(ProtocolAdd));