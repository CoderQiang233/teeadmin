import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Switch, Route, Redirect, HashRouter, withRouter } from 'react-router-dom';
import { Popconfirm, Divider, Icon, Col, Form, Input, Table, DatePicker, Button, Select, Modal, Checkbox, Radio } from 'antd';
import moment from 'moment';
import { push } from 'react-router-redux';
import styles from './index.less';
import { history } from '../../store';

// 引入编辑器以及编辑器样式
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

class ExamPaperAdd extends Component {

    state = {
        visible: false,
        startValue: null,
        endValue: null,
        endOpen: false,
        options: [1, 2],
        type: '单选',
    }


    componentDidMount() {
        this.props.changeTitle('新增试题')
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                values.meetingId = this.props.location.state.meetingId;
                if (this.state.type === '多选') {
                    values.answer = values.answer.join(',');
                }
                const options = [];
                if (values.optionA) {
                    options.push('A：' + values.optionA, 'B：' + values.optionB);
                    delete values.optionA;
                    delete values.optionB;
                }else{
                    options.push('对','错');
                }
                if (values.optionC) {
                    options.push('C：' + values.optionC);
                    delete values.optionC;
                }
                if (values.optionD) {
                    options.push('D：' + values.optionD);
                    delete values.optionD;
                }
                if (values.optionE) {
                    options.push('E：' + values.optionE);
                    delete values.optionE;
                }
                values.options = JSON.stringify(options);
                this.props.dispatch({
                    type: 'exampaper/add',
                    payload: values,
                });
                this.handleReset();
            }
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    handleBack = (meetingId) => {
        history.push({
            pathname: '/meeting/exampaperList',
            state: { meetingId }
        })
    }

    addclick = () => {
        const options = this.state.options;
        const type = this.state.type;
        if (type==='单选') {
            if (options.length === 4) {
                Modal.warning({
                    title: '最多只能有4个选项！！！',
                });
                return false;
            }
        }
        if (type==='多选') {
            if (options.length === 5) {
                Modal.warning({
                    title: '最多只能有5个选项！！！',
                });
                return false;
            }
        }
        options.push(
            options.length + 1
        )
        console.log(options)
        this.setState({
            time: new Date(),
            options: options,
        });

    }

    delclick = () => {
        const options = this.state.options;
        if (options.length === 2) {
            Modal.warning({
                title: '最少要有2个选项！！！',
            });
            return false;
        }
        this.setState({
            time: new Date(),
        });
        options.pop();
        this.props.form.resetFields(['answer']);
    }

    typeChange = (e) => {
        console.log(e.target.value)
        this.setState({
            type: e.target.value,
            options:['1','2'],
        });
        this.props.form.resetFields(['answer']);
    }

    handleChcekBox = (rule, value, callback) => {
        if (value&&value.length === 1) {
            callback('多选答案必须大于1个')
        }
        // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
        callback()
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { meetingId } = this.props.location.state;
        const options = this.state.options;
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
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
            marginBottom: '30px',
        };
        return (
            <div className={styles.huiyi}>
                <div className={styles.main}>
                    <div className={styles.formstyle}>

                        <FormItem label='题目' {...formItemLayout}>
                            {getFieldDecorator('title', {
                                rules: [{
                                    required: true,
                                    message: '请输入题目!',
                                }],
                            })(
                                <Input placeholder="题目" />
                            )}
                        </FormItem>
                        <FormItem label='题型' {...formItemLayout}>
                            {getFieldDecorator('type', {
                                rules: [{
                                    required: true,
                                    message: '请选择题型!'
                                }],
                                initialValue:'单选'
                            })(
                                <RadioGroup onChange={this.typeChange}>
                                    <Radio value='单选'>单选</Radio>
                                    <Radio value='多选'>多选</Radio>
                                    <Radio value='判断'>判断</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        {
                            this.state.type === '单选' &&
                            <FormItem label='选项' {...formItemLayout}>
                                {getFieldDecorator('answer', {
                                    rules: [{
                                        required: true,
                                        message: '请指定正确答案!',
                                    }],
                                })(
                                    <RadioGroup style={{ marginTop: '5px' }} >
                                        {
                                            options.length >= 1 &&
                                            <Radio value={String.fromCharCode(65)} key='1' style={radioStyle}>A：
                                            <FormItem className={styles.radioStyle}>
                                                    {getFieldDecorator('optionA', {
                                                        rules: [{
                                                            required: true,
                                                            message: '不能为空!',
                                                        }],
                                                    })(
                                                        <TextArea style={{ width: 400, }} placeholder='选项内容' autosize={{ minRows: 1, maxRows: 2 }} />
                                                    )}

                                                </FormItem>
                                            </Radio>
                                        }
                                        {
                                            options.length >= 2 &&
                                            <Radio value={String.fromCharCode(66)} key='2' style={radioStyle}>B：
                                            <FormItem className={styles.radioStyle}>
                                                    {getFieldDecorator('optionB', {
                                                        rules: [{
                                                            required: true,
                                                            message: '不能为空!',
                                                        }],
                                                    })(
                                                        <TextArea style={{ width: 400, }} placeholder='选项内容' autosize={{ minRows: 1, maxRows: 2 }} />
                                                    )}

                                                </FormItem>
                                            </Radio>
                                        }
                                        {
                                            options.length >= 3 &&
                                            <Radio value={String.fromCharCode(67)} key='3' style={radioStyle}>C：
                                            <FormItem className={styles.radioStyle}>
                                                    {getFieldDecorator('optionC', {
                                                        rules: [{
                                                            required: true,
                                                            message: '不能为空!',
                                                        }],
                                                    })(
                                                        <TextArea style={{ width: 400, }} placeholder='选项内容' autosize={{ minRows: 1, maxRows: 2 }} />
                                                    )}

                                                </FormItem>
                                            </Radio>
                                        }
                                        {
                                            options.length >= 4 &&
                                            <Radio value={String.fromCharCode(68)} key='4' style={radioStyle}>D：
                                            <FormItem className={styles.radioStyle}>
                                                    {getFieldDecorator('optionD', {
                                                        rules: [{
                                                            required: true,
                                                            message: '不能为空!',
                                                        }],
                                                    })(
                                                        <TextArea style={{ width: 400, }} placeholder='选项内容' autosize={{ minRows: 1, maxRows: 2 }} />
                                                    )}

                                                </FormItem>
                                            </Radio>
                                        }
                                        {/* {
                                        options.length >= 5 &&
                                        <Radio value={String.fromCharCode(69)} key='5'>
                                            <FormItem className={styles.radioStyle}>
                                                {getFieldDecorator('optionE', {
                                                    rules: [{
                                                        required: true,
                                                        message: '不能为空!',
                                                    }],
                                                })(
                                                    <span>
                                                        <span >E：</span>
                                                        <TextArea style={{ width: 300, }} placeholder='选项内容' autosize={{ minRows: 1, maxRows: 2 }} />
                                                    </span>
                                                )}

                                            </FormItem>
                                        </Radio>
                                    } */}
                                    </RadioGroup>,
                                )}
                            </FormItem>
                        }
                        {
                            this.state.type === '多选' &&
                            <FormItem label='选项' {...formItemLayout}>
                                {getFieldDecorator('answer', {
                                    rules: [{
                                        required: true,
                                        message: '请指定正确答案!',
                                    },{
                                        validator:this.handleChcekBox,
                                    }],
                                })(
                                    <CheckboxGroup style={{ marginTop: '5px' }} >
                                        {
                                            options.length >= 1 &&
                                            <Checkbox value={String.fromCharCode(65)} key='1' style={radioStyle}>A：
                                                <FormItem className={styles.radioStyle}>
                                                    {getFieldDecorator('optionA', {
                                                        rules: [{
                                                            required: true,
                                                            message: '不能为空!',
                                                        }],
                                                    })(
                                                        <TextArea style={{ width: 400, }} placeholder='选项内容' autosize={{ minRows: 1, maxRows: 2 }} />
                                                    )}

                                                </FormItem>
                                            </Checkbox>
                                        }
                                        {
                                            options.length >= 2 &&
                                            <Checkbox value={String.fromCharCode(66)} key='2' style={radioStyle}>B：
                                                <FormItem className={styles.radioStyle}>
                                                    {getFieldDecorator('optionB', {
                                                        rules: [{
                                                            required: true,
                                                            message: '不能为空!',
                                                        }],
                                                    })(
                                                        <TextArea style={{ width: 400, }} placeholder='选项内容' autosize={{ minRows: 1, maxRows: 2 }} />
                                                    )}

                                                </FormItem>
                                            </Checkbox>
                                        }
                                        {
                                            options.length >= 3 &&
                                            <Checkbox value={String.fromCharCode(67)} key='3' style={radioStyle}>C：
                                                <FormItem className={styles.radioStyle}>
                                                    {getFieldDecorator('optionC', {
                                                        rules: [{
                                                            required: true,
                                                            message: '不能为空!',
                                                        }],
                                                    })(
                                                        <TextArea style={{ width: 400, }} placeholder='选项内容' autosize={{ minRows: 1, maxRows: 2 }} />
                                                    )}

                                                </FormItem>
                                            </Checkbox>
                                        }
                                        {
                                            options.length >= 4 &&
                                            <Checkbox value={String.fromCharCode(68)} key='4' style={radioStyle}>D：
                                                <FormItem className={styles.radioStyle}>
                                                    {getFieldDecorator('optionD', {
                                                        rules: [{
                                                            required: true,
                                                            message: '不能为空!',
                                                        }],
                                                    })(
                                                        <TextArea style={{ width: 400, }} placeholder='选项内容' autosize={{ minRows: 1, maxRows: 2 }} />
                                                    )}

                                                </FormItem>
                                            </Checkbox>
                                        }
                                        {
                                            options.length >= 5 &&
                                            <Checkbox value={String.fromCharCode(69)} key='5' style={radioStyle}>E：
                                                <FormItem className={styles.radioStyle}>
                                                    {getFieldDecorator('optionE', {
                                                        rules: [{
                                                            required: true,
                                                            message: '不能为空!',
                                                        }],
                                                    })(
                                                        <TextArea style={{ width: 400, }} placeholder='选项内容' autosize={{ minRows: 1, maxRows: 2 }} />
                                                    )}

                                                </FormItem>
                                            </Checkbox>
                                        }
                                    </CheckboxGroup>,
                                )}
                            </FormItem>
                        }
                        {
                            this.state.type === '判断' &&
                            <FormItem label='选项' {...formItemLayout}>
                                {getFieldDecorator('answer', {
                                    rules: [{
                                        required: true,
                                        message: '请指定正确答案!',
                                    }],
                                })(
                                    <RadioGroup style={{ marginTop: '5px' }} >
                                        <Radio value='对' key='1' style={radioStyle}>对</Radio>
                                        <Radio value='错' key='2' style={radioStyle}>错</Radio>
                                    </RadioGroup>,
                                )}
                            </FormItem>
                        }
                        {
                            this.state.type !== '判断' &&
                            <FormItem
                                wrapperCol={{ span: 8, offset: 4 }}
                            >
                                <Button onClick={this.addclick.bind(this)} size='small'>增加选项</Button>
                                <Button onClick={this.delclick} size='small'>删除选项</Button>
                            </FormItem>
                        }
                        <FormItem label='该题分数' {...formItemLayout}>
                            {getFieldDecorator('score', {
                                rules: [{
                                    required: true,
                                    message: '请输入分数!',
                                }, { pattern: '^[1-9]\\d*$', message: '只能输入数字' }],
                            })(
                                <Input placeholder="分数" />
                            )}
                        </FormItem>
                        <FormItem
                            wrapperCol={{ span: 8, offset: 4 }}
                        >
                            <Button type="primary" onClick={this.handleSubmit} loading={this.props.exampaper.loading}>提交</Button>
                            <Button style={{ marginLeft: 10 }} onClick={this.handleReset}>重置</Button>
                            <Button style={{ float: 'right' }} onClick={this.handleBack.bind(this, meetingId)}>返回</Button>
                        </FormItem>
                    </div>
                </div>
            </div>
        )
    }
}


ExamPaperAdd = Form.create({})(ExamPaperAdd);

export default connect(
    ({ exampaper }) => {
        return { exampaper };
    }
)(withRouter(ExamPaperAdd));