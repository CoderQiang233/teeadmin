import React, { Component } from 'react'
import { connect } from 'react-redux';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import DataList from '../../components/DataList/index';
import { Switch, Route, Redirect, HashRouter, withRouter } from 'react-router-dom';
import { Popconfirm, Divider, Icon, Col, Form, Input, Radio, DatePicker, Button, Select, Modal } from 'antd';
import moment from 'moment';
import { history } from '../../store'
import { push } from 'react-router-redux';
import styles from './index.less';

const RadioGroup = Radio.Group;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;


class ExamPaperList extends Component {

    state = {
        visible: false,
        searchOption: {},
        addHidden: '',
    }

    componentWillMount() {
        console.log('willmount')
        this.props.changeTitle('考题管理');
        const status = this.props.location.state.status;
        if (status === '2') {
            this.setState({
                addHidden: 'none',
            })
        };
        const meetingId = this.props.location.state.meetingId;
        this.props.dispatch({
            type: 'exampaper/getList',
            payload: { meetingId: meetingId,status:status }
        });

    }


    componentDidMount() {

    }

    addClick = (meetingId) => {
        history.push({
            pathname: '/meeting/exampaperAdd',
            state: { meetingId }
        });

    }

    edit = (tableData, meetingId) => {
        console.log('调用立项编辑方法')
        history.push({
            pathname: '/meeting/exampaperEdit',
            state: { tableData, meetingId }
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

    delete = (id,meetingId) => {
        console.log('删除', id)
        this.props.dispatch({
            type: 'exampaper/del',
            payload: { id: id,meetingId:meetingId }
        });
    }


    searchClick = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);

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


    onChange = (e) => {
        console.log(e.target.value)
        this.setState({
            checked: e.target.value,
        })
    }

    render() {
        const { exampaper } = this.props;

        const columns = [{
            title: '题目',
            dataIndex: 'title',
            width: '17%',
        }, {
            title: '所属会议',
            dataIndex: 'meetingName',
            width: '18%',
        }, {
            title: '选项',
            dataIndex: 'options',
            width: '46%',
            render: (text, record) => {
                const ss = []
                text.map((item, index) => {
                    ss.push(<div className={styles.item} key={index}>{item}</div>)
                });
                return <div className={styles.examOptions}>{ss}</div>;
            }
        }, {
            title:'题型',
            dataIndex:'type',
        }, {
            title: '正确答案',
            dataIndex: 'answer',
        }, {
            title: '分数',
            dataIndex: 'score',
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    {
                        this.state.addHidden !== 'none' &&
                        <span>
                            <a onClick={this.edit.bind(this, record, this.props.location.state.meetingId)} title='编辑'><Icon type="edit" /></a>
                            <Divider type="vertical" />
                            <Popconfirm title="是否删除?" placement="topRight" onConfirm={this.delete.bind(this, record.id, this.props.location.state.meetingId)}>
                                <a title='删除'><Icon type="delete" /></a>
                            </Popconfirm>
                        </span>
                    }
                </div>
            ),

        }];

        return (
            <div className={styles.huiyi}>

                <DataList columns={columns} form={this.props.form} listLoading={exampaper.loading} addHidden={this.state.addHidden}
                    dataSource={exampaper.list} addClick={this.addClick.bind(this, this.props.location.state.meetingId)} rowKey='id' searchHidden={'none'}
                />

            </div>


        )
    }
}


ExamPaperList = Form.create({})(ExamPaperList);

export default connect(
    ({ exampaper }) => {
        return { exampaper, };
    }
)(withRouter(ExamPaperList));