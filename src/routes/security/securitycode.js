import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../../common/common.less';
import { Table, Button, Popconfirm, Modal, Form, Input,InputNumber  } from 'antd';
import { pageSize,apiAdmin } from '../../utils/config'
import PageHeader from 'ant-design-pro/lib/PageHeader';
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
//防伪码管理
class securitycode extends Component {

  constructor(props) {

    super(props)
    this.state = {
      visible: false,
      query: {},
      list: {}
    }
  }

  componentDidMount() {

    this.props.dispatch({
      type: 'findAllSecurityList',
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


        this.setState({
          visible: false,
        })
      }


    });
  }
    // 提交防伪码生成表单
    onSubmit = (data) => {
      this.setState({
          query: data,
      })
      this.props.dispatch({
          type: 'generateSecurityCode',
          payload: data,
      });
  }


        
  render() {

    const { getFieldDecorator } = this.props.form;
    const { taskTypeId, } = this.state.list;


    const columns = [{
      title: '防伪码',
      dataIndex: 'securitycode',
      key: 'securitycode',
    },
 {
      title: '生成时间',
      dataIndex: 'generatetime',
      key: 'generatetime',
    },
    ];

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },

    };




    //页头
    const breadcrumbList = [{
      title: '首页',
      href:'/',
    }, {
      title: '防伪管理',
    }, {
      title: '防伪码管理',
    }];




    return (
      <div className={styles.content}>
        <PageHeader breadcrumbList={breadcrumbList} className={styles.page} />
        <div className={styles.tableList}>
          <div className={styles.search}>
          <SearchMsg onSubmit={this.onSubmit} />
          </div>
          <div>
            <Table columns={columns} dataSource={this.props.securitycodeRedux.list}  loading={this.props.securitycodeRedux.loading} rowKey={record => record.id}/>
          </div>
        </div>
      </div>
    )
  }

}
 //生成防伪码
const SearchMsg = Form.create()(
  class extends React.Component {
      constructor(props) {

          super(props)

          this.state = {
          }

      }
      //生成防伪码
      handleSubmit = (e) => {
          e.preventDefault();
          this.props.form.validateFields((err, values) => {
              if (!err) {
                  console.log('Received values of form: ', values);
                  this.props.onSubmit(values);
              }
          });
      }
    //导出
    exportExcel = () => {
        
            window.location.href = apiAdmin + 'securitycodeExportExcel.php';
           
          }
      render() {
          const { getFieldDecorator } = this.props.form;
          return (
              <Form layout="inline" onSubmit={this.handleSubmit}>
                  <FormItem>
                      {getFieldDecorator('num')(
                          <InputNumber  placeholder="请输入要生成的防伪码数量" style={{ width: '250px' }} min={1}  />

                      )}
                  </FormItem>
                  <FormItem>
                      <Button
                          type="primary"
                          htmlType="submit"
                      >
                          生成
                  </Button>
                  <Button type='primary' style={{marginLeft:10}} onClick={this.exportExcel} >
                                    导出文件
                                </Button> 
                  </FormItem>
              </Form>

          );
      }

  }
);
function mapStateToProps({ securitycodeRedux }) {

  return { securitycodeRedux };
}
securitycode = Form.create()(securitycode);
export default connect(mapStateToProps)(securitycode);