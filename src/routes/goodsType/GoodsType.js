import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../../common/common.less';
import { Table, Row, Button, Radio, Popconfirm, Icon, Col, Modal, Form, Input, Upload, InputNumber, Breadcrumb, message, Select, Cascader } from 'antd';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import ImgPreview from 'img-preview';
import config from '../../utils/config';
const { apiAdmin, imgPath } = config;
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const Option = Select.Option;
let imagePath = apiAdmin + '?service=Upload.Upload&XDEBUG_SESSION_START=13201';
//商品类别
class GoodsType extends Component {

  constructor(props) {

    super(props)
    this.state = {
      title: '',
      visible: false,
      query: {},
      imageUrl: '',//新增,修改时图片路径
      type: '',
      goodsType: {},
    }
  }

  componentDidMount() {

    this.props.dispatch({
      type: 'findAllGoodsType',
      payload: {},
    });

    this.props.dispatch({
      type: 'findTypeSelect',
      payload: {},
    });


  }

  //批量删除
  deleteHandler = () => {
    if (this.state.selectedRowKeys.length > 0) {
      this.props.dispatch({
        type: 'deleteAllGoodsType',
        payload: { goodsTypeIds: this.state.selectedRowKeys },
      });
    } else {
      message.warn('请选择删除行！');
    }

  }


  //点击新增
  handleClick = () => {

    this.setState({
      visible: true,
      title: '商品类别新增',
      type: 'insert'
    })

  }

  handleCancel = (e) => {
    this.props.form.resetFields();
    this.setState({
      visible: false,
      imageUrl:'',
    });
  }



  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        if (this.state.type == 'update') {
          values.product_type_id = this.state.goodsType.product_type_id
        }
        values.image_url = this.state.imageUrl;
        values.parent_id = JSON.stringify(values.parent_id);
        console.log('Received values of form: ', values);
        this.props.dispatch({
          type: this.state.type + 'GoodsType',
          payload: values,
        });

        this.setState({
          visible: false,
        })
      }
    });
  }
  //修改
  edit = (record, values) => {
    this.setState({
      visible: true,
      title: '商品类别编辑',
      type: 'update',
      goodsType: record,
      imageUrl:record.image_url,
    })
  }
  //删除
  delete = (product_type_id, values) => {
    this.props.dispatch({
      type: 'deleteGoodsType',
      payload: { product_type_id: product_type_id },
    });
  }

  // 提交检索表单
  onSubmit = (data) => {
    this.setState({
      query: data,
    })
    this.props.dispatch({
      type: 'findAllGoodsType',
      payload: data,
    });
  }

  //上传图片
  handleChangeHead = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        imageUrl: info.file.response.data.file,
        loading: false,
        fileList: info.fileList
      })

    }

  }


  render() {

    const { getFieldDecorator } = this.props.form;

    const columns = [{
      title: '类别名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    }, {
      title: '图片',
      dataIndex: 'image_url',
      key: 'image_url',
      render: (text, record) => (
        <img src={imgPath + record.image_url} style={{ width: 40, height: 40 }} />
      )
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <div>
          <ButtonGroup >

            <Button type="primary" onClick={this.edit.bind(null, record)}>修改</Button>
            <Popconfirm title="确认删除?" onConfirm={this.delete.bind(null, record.product_type_id)}>
              <Button type="danger"  >删除</Button>
            </Popconfirm>
          </ButtonGroup>
        </div>
      )
    }];

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

    let { product_type_id, name, description, image_url, parent_id, type_parent }
      = this.state.goodsType;
    const { imageUrl } = this.state


    //页头
    const breadcrumbList = [{
      title: '首页',
      href: '/',
    }, {
      title: '商品类别管理',
      href: '/product/productType',
    }];


    //首图
    const uploadButtonHead = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text" style={{ width: '100%' }}>上传</div>
      </div>
    );



    return (
      <div className={styles.content}>
        <PageHeader breadcrumbList={breadcrumbList} className={styles.page} />
        <div className={styles.tableList}>
          <div className={styles.search}>
            {/* <Search onSubmit={this.onSubmit} /> */}
            <Button type="primary" onClick={this.handleClick} >新增</Button>
          </div>
          <Modal
            destroyOnClose={true}
            title={this.state.title}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            style={{ paddingLeft: '60px', height: 'auto', width: 'auto' }}
          >
            <Form>

              <FormItem   {...formItemLayout}
                label="上一级"
              >
                {getFieldDecorator('parent_id', {
                  rules: [{ required: true, message: '请选择上一级' }],
                  initialValue: this.state.type == 'insert' ? '' : type_parent,
                })(
                  <Cascader options={this.props.goodsType.typeSelect}  changeOnSelect />
                )}

              </FormItem>


              <FormItem   {...formItemLayout}
                label="类别名称"
              >
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入类别名称' }],
                  initialValue: this.state.type == 'insert' ? '' : name,
                })(
                  <Input placeholder="请输入类别名称" />
                )}

              </FormItem>

              {this.state.type == 'insert' &&
                <FormItem   {...formItemLayout}
                  label="图片"
                >
                  {getFieldDecorator('image_url', {
                    rules: [{ required: true, message: '请上传图片' }]
                  })(
                    <div className={styles.imgbox}>
                      <Upload
                        name="file"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action={imagePath}
                        onChange={this.handleChangeHead}

                      >
                        {imageUrl ? <img src={imgPath + imageUrl} alt="avatar" /> : uploadButtonHead}
                      </Upload>
                    </div>
                  )}
                </FormItem>
              }

              {this.state.type == 'update' &&

                <FormItem   {...formItemLayout}
                  label="商品首图"
                >
                    <div className={styles.imgbox}>
                      <Upload
                        name="file"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action={imagePath}
                        onChange={this.handleChangeHead}
                      >
                        {imageUrl ? <img src={imgPath + imageUrl} alt="avatar" /> : uploadButtonHead}
                      </Upload>

                    </div>
                </FormItem>

              }

              <FormItem   {...formItemLayout}
                label="描述"
              >
                {getFieldDecorator('description', {
                  rules: [{ required: true, message: '请输入描述' }],
                  initialValue: this.state.type == 'insert' ? '' : description,
                })(
                  <Input type="textarea" placeholder="请输入描述" autosize={{ minRows: 3, maxRows: 3 }} />
                )}

              </FormItem>

            </Form>
          </Modal>
          <div>
            <Table dataSource={this.props.goodsType.list} columns={columns} loading={this.props.goodsType.loading} />
          </div>
        </div>
      </div>
    )
  }

}

const Search = Form.create()(
  class extends React.Component {
    constructor(props) {

      super(props)

      this.state = {
      }

    }
    //检索
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          if (values.name == undefined) {
            values.name = '';
          }
          values.name = values.name.trim();
          console.log('Received values of form: ', values);
          this.props.onSubmit(values);
        }
      });
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('name')(
              <Input placeholder="请输入商品类别名称" style={{ width: '150px' }} />

            )}
          </FormItem>
          <FormItem><Button type="primary" htmlType="submit">查询</Button></FormItem>
        </Form>
      );
    }

  }
)
function mapStateToProps({ goodsType }) {

  return { goodsType };
}
GoodsType = Form.create()(GoodsType);
export default connect(mapStateToProps)(GoodsType);