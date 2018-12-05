import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../../common/common.less';
import { Table, Button, Popconfirm, Modal, Form, Input, Select,InputNumber } from 'antd';
import { pageSize, apiAdmin, imgPath } from '../../utils/config'
import PageHeader from 'ant-design-pro/lib/PageHeader';
import BraftEditor from 'braft-editor';
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const Option = Select.Option;
//返现比例
class percentage extends Component {

  constructor(props) {

    super(props)
    this.state = {
      visible: false,
      title: '',
      list: {},
      type: '',
      query: {},
    }
  }

  componentDidMount() {

    this.props.dispatch({
      type: 'findAllpercentageList',
      payload: {},
    });
  }




  handleCancel = (e) => {
    this.props.form.resetFields();
    this.setState({
      visible: false,
    });
  }

  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
   
        if (this.state.type === 'insert') {
          values.operation=sessionStorage.getItem("name");
        }
        if (this.state.type === 'update') {
          values.id = this.state.list.id;       
          values.level = this.state.list.level; 
          values.operation=sessionStorage.getItem("name"); 
        }
        console.log('Received values of form: ', values);
        this.props.dispatch({
          type: this.state.type + 'Percentage',
          payload: values,
        });
        this.setState({
          visible: false,

        })
      }


    });
  }
  handleClick = () => {
    this.setState({
      visible: true,
      title: '添加返现比例',
      type: 'insert'
    })
  }
  //修改
  edit = (record, values) => {
    console.log('fanxian：', record)
    this.setState({
      visible: true,
      title: '返现比例修改',
      type: 'update',
      list: record,
    })
  }
  //删除
  delete = (id, values) => {
    this.props.dispatch({
      type: 'deletePercentage',
      payload: { id: id },
    });
  }



  render() {
    const { getFieldDecorator } = this.props.form;
    const { level, cashback_percentage,cashback_price } = this.state.list;
    const { type } = this.state
    const columns = [{
      title: '返现比例',
      dataIndex: 'cashback_percentage',
      key: 'cashback_percentage',
    },
    {
      title: '会员等级',
      dataIndex: 'level',
      key: 'level',
      render: (text, record) => {
        switch (record.level) {
          case "1":
            return '普通会员'
            break;
          case "2":
            return '创客'
            break;
          case "3":
            return '盟主'
            break;
          case "4":
            return '合伙人'
            break;
          default:
            break;
        }

      }
    },
    {
      title: '返现金额',
      dataIndex: 'cashback_price',
      key: 'cashback_price',
      render:(text,record)=>{
        if(record.cashback_price){
          return record.cashback_price
        }else{
          return 0
        }
      }
    },
    {
      title: '操作人',
      dataIndex: 'operation',
      key: 'operation',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <div>
           {sessionStorage.getItem("userId") == "1" &&
          <ButtonGroup style={{ marginRight: '20px' }}>
            <Button type="primary" onClick={this.edit.bind(null, record)}>修改</Button>
            <Popconfirm title="删除该条信息会导致整个返现流程异常,确定删除么?" onConfirm={this.delete.bind(null, record.id)}>
              <Button type="danger"  >删除</Button>
            </Popconfirm>
          </ButtonGroup>
           }
        </div>
      )
    }
    ];

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 8 },
        sm: { span: 8 },
      },

    };


    //页头
    const breadcrumbList = [{
      title: '首页',
      href: '/',
    }, {
      title: '返现管理',
    }, {
      title: '返现比例管理',
    }];



    return (
      <div className={styles.content}>
        <PageHeader breadcrumbList={breadcrumbList} className={styles.page} />
        <div className={styles.tableList}>
          <div className={styles.search}>
          {sessionStorage.getItem("userId") == "1" &&
            <ButtonGroup>
              <Button type="primary" onClick={this.handleClick} >新增</Button>
            </ButtonGroup>
          }
          </div>
          <Modal
            destroyOnClose={true}
            title={this.state.title}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width={600}
            style={{ paddingLeft: '60px', height: 'auto', width: 'auto' }}
          >
            <Form>

              <FormItem   {...formItemLayout}
                label="会员等级"
              >
                {getFieldDecorator('level', {
                  rules: [{ required: true, message: '请输入会员等级' }],
                  initialValue: this.state.type == 'insert' ? '' : level,
                })(
                  <Select disabled={this.state.type=='insert'?false:true}>
                    <Option value="1">普通会员</Option>
                    <Option value="2">创客</Option>
                    <Option value="3">盟主</Option>
                    <Option value="4">合伙人</Option>
                  </Select>
                  )}

              </FormItem>

              <FormItem
              {...formItemLayout}
                label="返现比例"
              >
                {getFieldDecorator('cashback_percentage',{
                  rules: [{ required: true, message: '请输入返现比例' }],
                  initialValue: this.state.type == 'insert' ? '' : cashback_percentage,
                })(
                  <InputNumber max={1} placeholder="请输入返现比例"  style={{width:'220px'}}/>
                )}
              </FormItem>
              <FormItem
              {...formItemLayout}
                label="返现金额"
              >
                {getFieldDecorator('cashback_price',{
                  initialValue: this.state.type == 'insert' ? '' : cashback_price,
                })(
                  <InputNumber  placeholder="请输入返现金额"  style={{width:'220px'}}/>
                )}
              </FormItem>
            </Form>
          </Modal>
          <div>
            <Table columns={columns} dataSource={this.props.percentageRedux.list} loading={this.props.percentageRedux.loading} rowKey={record => record.id} />
          </div>
        </div>
      </div>
    )
  }

}
function mapStateToProps({ percentageRedux }) {

  return { percentageRedux };
}
percentage = Form.create()(percentage);
export default connect(mapStateToProps)(percentage);