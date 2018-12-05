import React, { Component } from 'react'
import { connect } from 'react-redux';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DataList from '../../components/DataList/index';
import { Switch, Route, Redirect, HashRouter, withRouter } from 'react-router-dom';
import { Popconfirm, Divider, Icon, Col, Form, Input, Row, DatePicker, Button, Select, Card, Modal, List } from 'antd';
import moment from 'moment';
import { push } from 'react-router-redux';
import styles from './index.less';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;


class MeetingRoom extends Component {

    state = {
        visible: false,
        addVisible: false,
        searchValue: {},
        id: 0,
        action: 'add',
        modalTitle: '新增会议室',
    }

    componentWillMount() {
        this.props.dispatch({
            type: 'meetingRoom/getList',
            payload: {}
        });
    }

    addMeetingRoom = () => {
        const form = this.addFormRef.props.form;
        form.resetFields();
        this.setState(
            {
                id: '',
                action: 'add',
                addVisible: true,
                modalTitle: '新增会议室',
            }
        );
    }

    edit = (meetingRoom) => {

        const form = this.addFormRef.props.form;
        form.setFieldsValue(
            {
                'roomName': meetingRoom.roomName,
                'numbers': meetingRoom.numbers
            }
        )
        this.setState(
            {
                id: meetingRoom.id,
                addVisible: true,
                action: 'edit',
                modalTitle: '编辑会议室',
            }
        )
    }

    delete = (id) => {
        console.log('删除会议id:', id)
        this.props.dispatch({
            type: 'meetingRoom/del',
            payload: { id: id }
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
            if (this.state.action === 'add') {
                this.props.dispatch({
                    type: 'meetingRoom/add',
                    payload: values
                })
            } else if (this.state.action === 'edit') {
                values['id'] = this.state.id
                this.props.dispatch({
                    type: 'meetingRoom/edit',
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
        const {meetingRoom} = this.props;
        
        return (
            <PageHeaderLayout title='会议室管理'  >
                <div className={styles.huiyi}>
                    <div className={styles.main}>
                        <div >
                            <Card bordered={false}>
                                <Form className='ant-advanced-search-form'>
                                    <Row>
                                        <Col span={2}>
                                            <Button type="primary" onClick={this.addMeetingRoom}><Icon type="plus" />新增</Button>
                                        </Col>

                                    </Row>

                                </Form>
                                <div className={styles.tableStyle}>
                                    <List
                                        grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
                                        dataSource={meetingRoom.list}
                                        renderItem={item => (
                                            <List.Item>
                                                <Card title={item.roomName} style={{ textAlign: 'center' }}
                                                    actions={[<a onClick={this.edit.bind(this, item)} title='编辑'><Icon type="edit" /></a>,
                                                    <Popconfirm title="是否删除?" placement="top" onConfirm={this.delete.bind(this, item.id)} >
                                                        <a title='删除'><Icon type="delete" /></a>
                                                    </Popconfirm>]}
                                                >
                                                    容量：{item.numbers}人

                                                </Card>
                                            </List.Item>
                                        )}
                                    />
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                <AddMeetingRoomForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.addVisible}
                    onCancel={this.handleAddCancel}
                    onCreate={this.handleAddCreate}
                    modalTitle={this.state.modalTitle}
                />

            </PageHeaderLayout>
        )
    }
}


const AddMeetingRoomForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form, modalTitle, } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title={modalTitle}
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="horizontal">
                        <FormItem label="会议室名称">
                            {getFieldDecorator('roomName', {
                                rules: [{ required: true, message: '请输入会议室名称' }],
                            })(
                                <Input placeholder='会议室名称' />
                            )}
                        </FormItem>
                        <FormItem label="会议室容量">
                            {getFieldDecorator('numbers', {
                                rules: [{ required: true, message: '请输入容纳人数' },{pattern:'^[1-9]\\d*$',message:'请输入数字'}],
                            })(
                                <Input placeholder='最多可容纳人数' />
                            )}
                        </FormItem>
                        
                    </Form>
                </Modal>
            );
        }
    }
);


MeetingRoom = Form.create({})(MeetingRoom);

export default connect(({ meetingRoom }) => {
    return { meetingRoom }
})(withRouter(MeetingRoom));