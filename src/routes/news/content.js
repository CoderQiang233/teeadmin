import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../../common/common.less';
import { Table, Button, Popconfirm, Modal, Form, Input, Upload, Icon, Switch } from 'antd';
import { pageSize, apiAdmin, imgPath } from '../../utils/config'
import PageHeader from 'ant-design-pro/lib/PageHeader';
import BraftEditor from 'braft-editor';
import ImgPreview from 'img-preview';
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
let imagePath = apiAdmin +'?service=Upload.Upload&XDEBUG_SESSION_START=14925';
let img = '';
//新闻管理
class content extends Component {

  constructor(props) {

    super(props)
    this.state = {
      visible: false,
      title: '',
      list: {},
      imageUrl: '',//新闻首图
      type: '',
      content: '',//富文本内容
      query: {},
    }
  }

  componentDidMount() {

    this.props.dispatch({
      type: 'findAllNewsList',
      payload: { pageSize: pageSize, pageIndex: this.props.newsRedux.pageIndex ? this.props.newsRedux.pageIndex : 1 },
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
          values.imgurl = this.state.imageUrl;
          values.content = this.state.content;
        }
        if (this.state.type === 'update') {
          values.id = this.state.list.id;
          values.imgurl = this.state.imageUrl;
          values.content = this.state.content;
        }

        this.props.dispatch({
          type: this.state.type + 'News',
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
      title: '添加新闻',
      type: 'insert',
      imageUrl:''
    })
  }
  //修改
  edit = (record, values) => {
    this.setState({
      visible: true,
      title: '新闻内容编辑',
      type: 'update',
      list: record,
      imageUrl: record.imgurl,
    })
  }
  //删除
  delete = (id, values) => {
    this.props.dispatch({
      type: 'deleteNews',
      payload: { id: id },
    });
  }
  //状态变更
  change = (record, values) => {
    this.props.dispatch({
      type: 'changeNews',
      payload: { id:record.id,status:record.status },
    });
  }
  //上传新闻首图
  handleChangeHead = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        imageUrl: info.file.response.data.file,
        loading: false,
      })
    }
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
    const { title, imgurl, content } = this.state.list;
    const { imageUrl, type } = this.state
    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '首图',
      dataIndex: 'imgurl',
      key: 'imgurl',
      render: (text, record) => (
        // <img src={imgPath + record.imgurl} style={{width:30,height:30}} alt=""/>
        <ImgPreview src={imgPath + record.imgurl} style={{ width: 30, height: 30 }} alt="" />

      )
    },
    {
      title: '新闻状态',
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
            <Popconfirm title="确定删除该条新闻信息么?" onConfirm={this.delete.bind(null, record.id)}>
              <Button type="danger"  >删除</Button>
            </Popconfirm>
          </ButtonGroup>
          <ButtonGroup >
            <Popconfirm title="确定要更改当前的新闻状态么?" onConfirm={this.change.bind(null, record)} >
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
      current: this.props.newsRedux.pageIndex,
      total: this.props.newsRedux.total,
      pageSize: pageSize,
      onChange: (page, pageSize) => {
        let query = this.state.query;
        query.pageIndex = page;
        query.pageSize = pageSize;

        this.props.dispatch({
          type: 'findAllNewsList',
          payload: query,
        });

      },
    };



    //页头
    const breadcrumbList = [{
      title: '首页',
      href:'/',
    }, {
      title: '新闻管理',
    }, {
      title: '新闻详情管理',
    }];
    //首图
    const uploadButtonHead = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text" style={{ width: '100%' }}>上传</div>
      </div>
    );
    //富文本框
    const editorProps = {
      height: '200px',
      contentFormat: 'html',
      //initialContent: '<p></p>',
      initialContent: this.state.type == 'insert' ? '<p></p>' : content,
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
            destroyOnClose
            title={this.state.title}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width={800}
            style={{ paddingLeft: '60px', height: 'auto', width: 'auto' }}
          >
            <Form>

              <FormItem   {...formItemLayout}
                label="新闻标题"
              >
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: '请输入新闻标题' }],
                  initialValue: this.state.type == 'insert' ? '' : title,
                })(
                  <Input placeholder="请输入新闻标题" />
                  )}

              </FormItem>
              {type == 'insert' &&
                <FormItem   {...formItemLayout}
                  label="新闻首图"
                >
                  {getFieldDecorator('imgurl', {
                    rules: [{ required: true, message: '请输入新闻首图' }]
                  })(
                    <Upload
                      name="file"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action={imagePath}
                      onChange={this.handleChangeHead}
                    >
                      {imageUrl ? <img src={imgPath + imageUrl} alt="avatar" height={200} width={200} /> : uploadButtonHead}
                    </Upload>
                    )}
                </FormItem>
              }
              {type == 'update' &&
                <FormItem   {...formItemLayout}
                  label="新闻首图"
                >
                  {/* {getFieldDecorator('imgurl', {
                  rules: [{ required: true, message: '请输入新闻首图' }]
                })( */}
                  <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={imagePath}
                    onChange={this.handleChangeHead}
                  >
                    {this.state.imageUrl ? <img src={imgPath + this.state.imageUrl} alt="avatar" height={200} width={200} /> : uploadButtonHead}
                  </Upload>
                  {/* )} */}
                </FormItem>
              }

              <FormItem
                labelCol={{ span: 4, offset: 2 }}
                wrapperCol={{ span: 16 }}
                label="新闻详情"
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
            <Table columns={columns} dataSource={this.props.newsRedux.list} loading={this.props.newsRedux.loading} pagination={pagination} rowKey={record => record.id}/>
          </div>
        </div>
      </div>
    )
  }

}
function mapStateToProps({ newsRedux }) {

  return { newsRedux };
}
content = Form.create()(content);
export default connect(mapStateToProps)(content);