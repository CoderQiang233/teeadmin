import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../../common/common.less';
import { Table, Button, Popconfirm, Modal, Form, Input, Upload, Icon, Switch } from 'antd';
import { pageSize, apiAdmin, imgPath } from '../../utils/config'
import PageHeader from 'ant-design-pro/lib/PageHeader';
import BraftEditor from 'braft-editor';
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
let imagePath = apiAdmin + '?service=Upload.Upload&XDEBUG_SESSION_START=14925';
//公司简介
class profile extends Component {

  constructor(props) {

    super(props)
    this.state = {
      visible: false,
      title: '',
      list: {},
      type: '',
      content: '',//富文本内容
      query: {},
    }
  }

  componentDidMount() {

    this.props.dispatch({
      type: 'findAllCompanyList',
      payload: { pageSize: pageSize, pageIndex: this.props.profileRedux.pageIndex ? this.props.profileRedux.pageIndex : 1 },
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
        console.log('Received values of form: ', values);
        if (this.state.type === 'insert') {
          values.content = this.state.content;
        }
        if (this.state.type === 'update') {
          values.id = this.state.list.id;
          values.content = this.state.content;
        }

        this.props.dispatch({
          type: this.state.type + 'Company',
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
      title: '添加公司简介',
      type: 'insert'
    })
  }
  //修改
  edit = (record, values) => {
    console.log('多图富文本：',record)
    this.setState({
      visible: true,
      title: '公司简介内容编辑',
      type: 'update',
      list: record,
    })
  }
  //删除
  delete = (id, values) => {
    this.props.dispatch({
      type: 'deleteCompany',
      payload: { id: id },
    });
  }
  //状态变更
  change = (record, values) => {
    this.props.dispatch({
      type: 'changeCompany',
      payload: { id:record.id,status:record.status },
    });
  }
  //富文本
  handleChange = (content) => {
    this.setState({ content: content })
  }

  //富文本上传图片
  uploadFn = (param) => {
    //imagePath:图片上传的方法路径
    const serverURL = imagePath + param.file;
    const xhr = new XMLHttpRequest
    const fd = new FormData()
    // libraryId可用于通过mediaLibrary示例来操作对应的媒体内容      
    const successFn = (response) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址,imgPath:图片访问路径
      param.success({
        url: imgPath + JSON.parse(xhr.responseText).data.file,
      })
    }
    xhr.addEventListener("load", successFn, false)
    fd.append('file', param.file)
    xhr.open('POST', serverURL, true)
    xhr.send(fd)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { title,content} = this.state.list;
    const {type } = this.state
    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '使用状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        switch (record.status) {
          case "1":
            return '发布'
            break;
          case "2":
            return '停用'
            break;
          default:
            break;
        }

      }
    },
    {
      title: '生成时间',
      dataIndex: 'addtime',
      key: 'addtime',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <div>
          <ButtonGroup style={{ marginRight: '20px' }}>
            <Button type="primary" onClick={this.edit.bind(null, record)}>修改</Button>
            <Popconfirm title="确定删除该条信息么?" onConfirm={this.delete.bind(null, record.id)}>
              <Button type="danger"  >删除</Button>
            </Popconfirm>
          </ButtonGroup>
          <ButtonGroup >
            <Popconfirm title="确定要更改当前的使用状态么?" onConfirm={this.change.bind(null, record)} >
              <Button type="danger"  >状态变更</Button>
            </Popconfirm>
          </ButtonGroup>
          {/* <Switch checkedChildren="发布" unCheckedChildren="停用" defaultChecked={this.state.switch}/> */}
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
        xs: { span: 24 },
        sm: { span: 14 },
      },

    };

    // 定义分页对象
    const pagination = {
      current: this.props.profileRedux.pageIndex,
      total: this.props.profileRedux.total,
      pageSize: pageSize,
      onChange: (page, pageSize) => {
        let query = this.state.query;
        query.pageIndex = page;
        query.pageSize = pageSize;

        this.props.dispatch({
          type: 'findAllCompanyList',
          payload: query,
        });

      },
    };

    //页头
    const breadcrumbList = [{
      title: '首页',
      href:'/',
    }, {
      title: '公司管理',
    }, {
      title: '公司简介管理',
    }];

    //富文本框
    const editorProps = {
      height: '200px',
      contentFormat: 'html',
      initialContent: this.state.type == 'insert' ? '<p></p>':content,
      onChange: this.handleChange,
      onRawChange: this.handleRawChange,
      controls: [
        'undo', 'redo', 'split', 'font-size', 'font-family', 'line-height', 'letter-spacing',
        'indent', 'text-color', 'bold',
        'superscript', 'subscript', 'remove-styles', 'text-align', 'split',
        'media', 'clear'
      ],
      media: { uploadFn: this.uploadFn }
    }

    return (
      <div className={styles.content}>
        <PageHeader breadcrumbList={breadcrumbList} className={styles.page} />
        <div className={styles.tableList}>
          <div className={styles.search}>
            <ButtonGroup>
              <Button type="primary" onClick={this.handleClick} >新增</Button>
            </ButtonGroup>
          </div>
          <Modal
            destroyOnClose={true}
            title={this.state.title}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width={800}
            style={{ paddingLeft: '60px', height: 'auto', width: 'auto' }}
          >
            <Form>

              <FormItem   {...formItemLayout}
                label="公司简介标题"
              >
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: '请输入新闻标题' }],
                  initialValue: this.state.type == 'insert' ? '' : title,
                })(
                  <Input placeholder="请输入新闻标题" />
                  )}

              </FormItem>

              <FormItem
                labelCol={{ span: 4, offset: 2 }}
                wrapperCol={{ span: 16 }}
                label="公司简介详情"
              >
                {getFieldDecorator('content')(
                  <div className={styles.braft2}>
                    <BraftEditor {...editorProps} />
                  </div>
                )}
              </FormItem>
            </Form>
          </Modal>
          <div>
            <Table columns={columns} dataSource={this.props.profileRedux.list} loading={this.props.profileRedux.loading}  pagination={pagination} rowKey={record => record.id}/>
          </div>
        </div>
      </div>
    )
  }

}
function mapStateToProps({ profileRedux }) {

  return { profileRedux };
}
profile = Form.create()(profile);
export default connect(mapStateToProps)(profile);