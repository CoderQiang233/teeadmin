import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../../common/common.less';
import { Table, Button, Popconfirm, Modal, Form, Input } from 'antd';
import { pageSize } from '../../utils/config'
import PageHeader from 'ant-design-pro/lib/PageHeader';
import { history } from '../../store';
import EditModule from './editModule'
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const confirm = Modal.confirm;
class addModule extends Component {
    constructor(props) {

        super(props)
        this.state = {
            visible: false,
        addVisible:false,
        searchValue:{},
        departmentId:0,
        action:'add',
        modalTitle:'新增人员',
        modalBtn:'新增',
        moduleKey:'',
        module:{}
        }
    }

    addModule = (keyword) => {
        console.log(123)
        const form = this.addFormRef.props.form;
        form.resetFields();
        this.setState(
            { 
                staffId:'',
                action:'add',
                addVisible: true ,
                modalTitle:'新增模块',
                modalBtn:'新增',
                moduleKey:keyword
            }
        );
    }
    handleAddCancel = () => {
        const form = this.addFormRef.props.form;
        form.resetFields();
        this.setState({ addVisible: false });
      }
      saveFormRef = (formRef) => {
        this.addFormRef = formRef;
      }
     cloneObjectFn=(obj)=> {
        return JSON.parse(JSON.stringify(obj))
     }
      handleAddCreate=()=>{
        const form = this.addFormRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
              return;
            }
           
            let data=this.cloneObjectFn(values);
            delete data.name;
            delete data.sort_order;
            const dataJson=JSON.stringify(data);
            values.setting=dataJson;
            values.keyword=this.state.moduleKey;
              this.props.dispatch({
                  type: 'indexLayout/addIndexModule',
                  payload: values
                  })
            console.log('Received values of form: ', values);
          });
      }
    render() {
        //页头
        const breadcrumbList = [{
            title: '首页',
            href: '/',
        }, {
            title: '首页布局管理',
        }, {
            title: '添加模块',
        }];
        const moduleList = [{
            key: '1',
            name: '单图商品',
            keyword: 'IndexImage',
          },{
            key: '2',
            name: '分类多商品',
            keyword: 'CategoryProducts',
          }];
          
          const columns = [{
            title: '模块名',
            dataIndex: 'name',
            key: 'name',
          }, {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render:(text, record) => (
                <span>
                  <a onClick={this.addModule.bind(this,record.keyword)}>增加</a>
                </span>
              )
          }, ];
        return (
            <div className={styles.content}>
                <PageHeader breadcrumbList={breadcrumbList} className={styles.page} />
                <div className={styles.tableList}>
                <Table columns={columns} dataSource={moduleList} />
                </div>
                <EditModule 
                wrappedComponentRef={this.saveFormRef}
                visible={this.state.addVisible}
                onCancel={this.handleAddCancel}
                onCreate={this.handleAddCreate}
                modalTitle={this.state.modalTitle}
                modalBtn={this.state.modalBtn}
                action={this.state.action}
                dispatch={this.props.dispatch}
                moduleKey={this.state.moduleKey}
                module={this.state.module}
                ></EditModule>
            </div>
        );
    }
}

function mapStateToProps({ indexLayoutRedux }) {

    return { indexLayoutRedux };
}
export default connect(mapStateToProps)(addModule);