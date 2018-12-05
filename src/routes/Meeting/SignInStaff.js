import React, { Component } from 'react';
import { connect } from 'react-redux';
import Styles from './SignInStaff.less'
import { Switch, Route, Redirect, HashRouter, withRouter } from 'react-router-dom';
import {  Table,Card } from 'antd';

class SignInStaff extends Component{

    state = {
        meetingId: 0,
    }

    componentDidMount() {
        let meetingId=this.props.location.state.meetingId;
        this.setState({
            meetingId:meetingId
        },function() {
            this.props.dispatch({
                type: 'meeting/getSinInStaff',
                payload: {id:meetingId}
            })
        })
    }



    render(){


        const columns = [ {
            title: '序号',
            key: 'index',
            render:(text, record, index)=>(
               <span>{index+1}</span>
            )
        },{
            title: '姓名',
            dataIndex: 'name',
        }, {
            title: '部门',
            dataIndex: 'deptName',
        }, {
            title: '电话',
            dataIndex: 'phoneNum',
        },  {
            title: '签到时间',
            dataIndex: 'signTime'
        },];


        return (<div className={Styles.content}>

            <Card bordered={false}>
                <Table dataSource={this.props.meeting.singInStaffList} columns={columns} />
            </Card>

        </div>)
    }

}

export default connect(
    ({meeting})=>{
        return {meeting};
    }
)(withRouter(SignInStaff));