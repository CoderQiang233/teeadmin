import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button, Upload, InputNumber, Select, Icon, message, Modal } from 'antd';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';
import styles from '../../common/common.less';
import { withRouter } from 'react-router-dom';
import config from '../../utils/config';
const { apiAdmin, imgPath } = config;
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
let imagePath = apiAdmin + '?service=Upload.Upload';
let ware = '';
//编辑商品
class EditGoods extends Component {


    constructor(props) {

        super(props)
        ware = this.props.location.state.record
        this.state = {
            detail: ware.detail,
            previewVisible: false,
            previewImage: '',
            banners: [],//banner图
            previewVisible: false,
            previewImage: '',
            fileListHead: '',
            first_picture: ware.first_picture,//首图
        }
        this.editorInstance = null

    }

    componentDidMount() {

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

                values.id = ware.id;
                values.detail = this.state.detail;
                values.first_picture = this.state.first_picture;
                let banners = values.banners;
                let ban = [];
                if (banners.fileList) {//图片有改变
                    if (banners.fileList.length <= 0) {
                        message.warn('请上传商品banner图')
                        return ;
                    }
                    for (var i = 0; i < banners.fileList.length; i++) {
                        if (banners.fileList[i].response) {//如果有新的图片
                            ban.push(banners.fileList[i].response.data.file);
                        } else {//原有图片
                            let urllength = imgPath.length;
                            let a = banners.fileList[i].url.substring(urllength);
                            ban.push(a);
                        }
                    }
                } else {//图片无改变
                    
                     for (var i = 0; i < banners.length; i++) {
                        let urllength = imgPath.length;
                        let a = banners[i].url.substring(urllength);
                        ban.push(a);
                      
                    }
                }
                values.banners = JSON.stringify(ban);
                console.log('Received values of form: ', values);
                this.props.dispatch({
                    type: 'updateGoods',
                    payload: values,
                });


            }
        });
    }

    //富文本
    handleChange = (content) => {
        this.setState({ detail: content })

    }

    //富文本上传图片
    uploadFn = (param) => {
        const serverURL = imagePath +'&'+ param.file;
        const xhr = new XMLHttpRequest
        const fd = new FormData()
        // libraryId可用于通过mediaLibrary示例来操作对应的媒体内容      
        const successFn = (response) => {
            // 假设服务端直接返回文件上传后的地址
            // 上传成功后调用param.success并传入上传后的文件地址
            param.success({
                url: imgPath + JSON.parse(xhr.responseText).data.file,
            })
        }
        xhr.addEventListener("load", successFn, false)
        fd.append('file', param.file)
        xhr.open('POST', serverURL, true)
        xhr.send(fd)
    }

    //上传商品首图
    handleChangeHead = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            this.setState({
                first_picture: info.file.response.data.file,
                loading: false,
            })
        }

    }

    handleChangeBanner = (info) => {

        let fileList = info.fileList;
        const status = info.file.status;
        // 1. Limit the number of uploaded files
        //    Only to show two recent uploaded files, and old ones will be replaced by the new
        // fileList = fileList.slice(-2);

        // 2. read from response and show file link
        fileList = fileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = imgPath + file.response.data.file;
                file.uid = new Date().getTime()+Math.random();
                file.status = file.response.data.status;
            }
            return file;
        });
        // 3. filter successfully uploaded files according to response from server
        fileList = fileList.filter((file) => {
            if (file.response) {
                return file.response.status === 'success';
            }
            return true;
        });

        // if (status === 'done') {
        //     message.success(`${info.file.name} 上传成功`);
        // } else if (status === 'error') {
        //     message.error(`${info.file.name} 上传失败`);
        // }
        this.setState({ fileList });

    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url,
            previewVisible: true,
        });
    }

    render() {
        const { id, name, first_picture, detail, banners, brand, intro,market_price,agent_price } = ware;

        let banner = null;

        if (banners != null) {
            banner = banners;
        }

        const { getFieldDecorator } = this.props.form;
        const editorProps = {
            height: '200px',
            contentFormat: 'html',
            contentId: id,
            initialContent: detail,
            onChange: this.handleChange,
            controls: [
                'undo', 'redo', 'split', 'font-size', 'font-family', 'line-height', 'letter-spacing',
                'indent', 'text-color', 'bold',
                'superscript', 'subscript', 'remove-styles', 'text-align', 'split',
                'media', 'clear'
            ],
            media: { uploadFn: this.uploadFn }
        }
        //form表单的样式
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4, offset: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },

        };
        //页头
        const breadcrumbList = [{
            title: '首页',
            href: '/',
        }, {
            title: '商品管理',
            href: '/product/productList',
        }, {
            title: '编辑商品',
        }];

        //banner图
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
            </div>
        );

        const { previewVisible, previewImage } = this.state
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
                <div className={styles.tableList} style={{ paddingTop: '24px' }}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem   {...formItemLayout}
                            label="商品名称"
                        >
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入商品名称' }],
                                initialValue: ware.name
                            })(
                                <Input placeholder="请输入商品名称" />
                            )}

                        </FormItem>
                        <FormItem   {...formItemLayout}
                            label="商品品牌"
                        >
                            {getFieldDecorator('brand', {
                                rules: [{ required: true, message: '请输入商品品牌' }],
                                initialValue: brand
                            })(
                                <Input placeholder="请输入商品品牌" />
                            )}

                        </FormItem>
                        <FormItem   {...formItemLayout}
                            label="市场价格"
                        >
                        {getFieldDecorator('market_price', {
                                rules: [{ required: true, message: '请输入市场价格' }],
                                initialValue: market_price
                            })(
                                <InputNumber min={0} style={{width:'100%'}} placeholder="请输入市场价格" />
                            )}
                        </FormItem>
                        <FormItem   {...formItemLayout}
                            label="代理价格"
                        >
                        {getFieldDecorator('agent_price', {
                                rules: [{ required: true, message: '请输入代理价格' }],
                                initialValue: agent_price
                            })(
                                <InputNumber min={0} style={{width:'100%'}} placeholder="请输入代理价格" />
                            )}
                        </FormItem>
                        <FormItem   {...formItemLayout}
                            label="商品简介"
                        >
                            {getFieldDecorator('intro', {
                                rules: [{ required: true, message: '请输入商品简介' }],
                                initialValue: intro
                            })(
                                <TextArea rows={6} placeholder="请输入商品简介" />
                            )}

                        </FormItem>

                        <FormItem   {...formItemLayout}
                            label="商品首图"
                        >
                            {/* {getFieldDecorator('first_picture', {
                                rules: [{ required: true, message: '请上传商品首图' }],

                            })( */}
                            <div className={styles.imgbox}>
                            <Upload
                                name="file"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action={imagePath}
                                onChange={this.handleChangeHead}
                            >
                                {this.state.first_picture ? <img src={imgPath + this.state.first_picture} alt="avatar" /> : uploadButtonHead}
                            </Upload>
                            {/* )} */}
                            </div>
                        </FormItem>
                        <FormItem   {...formItemLayout}
                            label="商品banner图"
                        >
                            {getFieldDecorator('banners', {
                                // rules: [{ required: true, message: '请选择商品banner图' }],
                                initialValue: banners
                            })(
                                <Upload
                                    action={imagePath}
                                    listType="picture-card"
                                    defaultFileList={banner}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChangeBanner}

                                >
                                    {uploadButton}
                                </Upload>
                            )}
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>

                        </FormItem>

                        <FormItem
                            labelCol={{ span: 4, offset: 2 }}
                            wrapperCol={{ span: 16 }}
                            label="商品详情"
                        >
                            {getFieldDecorator('detail', {
                                initialValue: detail
                            })(
                                <div className={styles.braft}>
                                    <BraftEditor {...editorProps} ref={(instance) => this.editorInstance = instance} />
                                </div>
                            )}
                        </FormItem>
                        <FormItem
                            wrapperCol={{ offset: 8, span: '16' }}
                        >
                            <Button type="primary" htmlType="submit" style={{ marginRight: '50px', marginLeft: '50px' }}>
                                保存
                        </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>

        )

    }
}


function mapStateToProps({ goods }) {
    return { goods };
}
EditGoods = Form.create()(EditGoods);
export default connect(mapStateToProps)(withRouter(EditGoods))