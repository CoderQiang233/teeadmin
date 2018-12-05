import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styles from '../../common/common.less';
import { Table, Row, Button, Radio, Popconfirm, Icon, Col, Modal, Form, Input, Upload, InputNumber, Select, message,img } from 'antd';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import { api, pageSize, image,imgPath,apiAdmin } from '../../utils/config'
import ImgPreview from 'img-preview';
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
let path = imgPath;
let adminpath=apiAdmin +'?service=Upload.Upload';
var file = '';


class indexBanner extends PureComponent {
    constructor(props) {

        super(props);
        this.state = {
            title: '',
            visible: false,
            slideShow: {},
            query: {},
            imgUrl: '',
            type: '',
            imageUrl:'',//新增时图片路径
        }
    };
    componentDidMount() {
        console.log(this.props)
        this.props.dispatch({
            type: 'findAllIndexBannerList',
            payload:{}

        });
    }
    //点击新增
    addModal = () => {
        this.setState({
            visible: true,
            title: '新增轮播图',
            type: 'insert',
            imageUrl:'',
        })

    }
    //修改
    updateModal = (record, values) => {
        this.setState({
            visible: true,
            title: '轮播图编辑',
            type: 'update',
            slideShow: record,
            imageUrl:record.path
        })
        console.log(record)

    }
    //删除
    delete = (data, values) => {
        console.log(data,values)
        console.log(data.id,data.path)
        this.props.dispatch({
            type: 'deleteById',
            payload: { id: data.id,path:data.path},
        });
    }
    //新增(图片上传改变)
    handleChangeHead = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }

        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.setState({
                imageUrl: info.file.response.data.file,
                loading: false,
            })
        }





    }

    //修改(图片上传改变)
    handleChangeEdit = (info) => {

        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }

        if (info.file.status === 'done') {
            console.log(info);
            this.setState({
                imageUrl: info.file.response.data.file,
                loading: false,
            })
        }
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
            let urlpath={}
            if (!err) {
                console.log(values);
                if (this.state.type == 'insert') {
                    urlpath.path=values.imgurl.file.response.data.file;
                  }

                  if (this.state.type == 'update') {
                      urlpath.path = this.state.imageUrl;
                      urlpath.id = this.state.slideShow.id;
                  }
                  console.log(urlpath);

                this.props.dispatch({
                    type: this.state.type + 'IndexBanner',
                    payload: urlpath,
                });

                this.setState({
                    visible: false,
                    imageUrl: ''
                })
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { slideshow_id, slideshow_name,slideshow_url, 
            slideshow_image_url, display_order }
            = this.state.slideShow;
        //图片
        const { imageUrl, type } = this.state
        const uploadButtonHead = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text" style={{ width: '100%' }}>上传</div>
            </div>
        );
        // 定义分页对象
        const pagination = {
            // current: this.props.indexBanner.pageIndex,
            // total: this.props.indexBanner.total,
            pageSize: pageSize,
            onChange: (page, pageSize) => {
                let query = this.state.query;
                // query.pageIndex = page;
                // query.pageSize = pageSize;

                this.props.dispatch({
                    type: 'findAllIndexBannerList',
                    payload: query,
                });

            },
        };
        //页头
        const breadcrumbList = [{
            title: '首页',
            href: '/',
        }, {
            title: '轮播图管理',
            href: '/',
        }, {
            title: '首页轮播图管理',
        }];
        //表头
        const columns = [{
            title: '轮播图',
            dataIndex: 'path',
            key: 'path',
            render: (text, record) => (
                <ImgPreview src={path + record.path}  style={{width:100}} />
                // <img src={path + record.path} style={{ width: 60, height: 40 }} />
            )
        }, {
            title: '上传时间',
            dataIndex: 'create_time',
            key: 'create_time',

        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <div>
                    <ButtonGroup >
                        <Button type="primary" onClick={this.updateModal.bind(this, record)}>修改</Button>
                        <Popconfirm title="确认删除?" onConfirm={this.delete.bind(null, record)}>
                            <Button type="danger"  >删除</Button>
                        </Popconfirm>
                    </ButtonGroup>
                </div>
            ),
        }];
        //moadl表单样式
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
        return (
            <div className={styles.content}>
                <PageHeader breadcrumbList={breadcrumbList} className={styles.page} />
                <div className={styles.tableList}>
                    <div className={styles.search}>

                        <Button type="primary" className={styles.bu} onClick={this.addModal}>添加轮播图</Button>
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

                            {type == 'insert' &&
                            <FormItem   {...formItemLayout}
                                        label="首页轮播图"
                            >
                                {getFieldDecorator('imgurl', {
                                    rules: [{ required: true, message: '请插入图片' }]
                                })(
                                    <Upload
                                        name="file"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action={adminpath}
                                        onChange={this.handleChangeHead}
                                    >
                                        {imageUrl ? <img src={imgPath + imageUrl} alt="avatar" height={200} width={300} /> : uploadButtonHead}
                                    </Upload>
                                )}
                            </FormItem>
                            }
                            {type == 'update' &&
                            <FormItem   {...formItemLayout}
                                        label="新闻首图"
                            >
                                <Upload
                                    name="file"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action={adminpath}
                                    onChange={this.handleChangeEdit}
                                >
                                    {this.state.imageUrl ? <img src={imgPath + this.state.imageUrl} alt="avatar" height={200} width={200} /> : uploadButtonHead}
                                </Upload>
                            </FormItem>
                            }


                        </Form>

                    </Modal>
                    <div>
                        <Table columns={columns} rowKey="id" dataSource={this.props.indexBanner.list}   loading={this.props.indexBanner.loading} defaultPageSize='6'/>
                    </div>
                </div>
            </div>

        );

    }

}
indexBanner = Form.create()(indexBanner);
function mapStateToProps({ indexBanner }) {
    return { indexBanner };
}
export default connect(mapStateToProps)(indexBanner);