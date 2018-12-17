import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button, Cascader, InputNumber, Select, Icon, Upload, Modal, message } from 'antd';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';
import styles from '../../common/common.less';
import config from '../../utils/config';
const { apiAdmin, imgPath } = config;
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
let imagePath = apiAdmin + '?service=Upload.Upload';
class AddGoods extends Component {

    constructor(props) {
        super(props)
        this.state = {
            detail: '',
            previewVisible: false,
            previewImage: '',
            fileList: [],
            previewVisible: false,
            previewImage: '',
            fileListHead: '',
            imageUrl: '',
            loading:false,
        }
    }

    componentDidMount() {

        this.props.dispatch({
            type: 'findAllType',
            payload: {}
        })

    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading:true
                })
                values.detail = this.state.detail;

                values.first_picture = this.state.imageUrl;

                values.fileList = this.state.fileList;
                let banners = [];
                if (values.fileList.length > 0) {
                    for (let i = 0; i < values.fileList.length; i++) {
                        banners.push(values.fileList[i].response.data.file);
                    }
                } else {
                    message.warn('请上传商品banner图')
                    return;
                }
                values.banners = JSON.stringify(banners);

                values.product_type_id = JSON.stringify(values.product_type_id);

                console.log('Received values of form: ', values);

                this.props.dispatch({
                    type: 'insertGoods',
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
        //imagePath:图片上传的方法路径
        const serverURL = imagePath + '&' + param.file;
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

    handleChangeBanner = ({ fileList }) => {

        this.setState({ fileList })
    }


    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    //上传商品首图
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

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const editorProps = {
            height: '200px',
            contentFormat: 'html',
            initialContent: '<p></p>',
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
            title: '新增商品',
        }];
        //banner图
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        const { previewVisible, previewImage, fileList, imageUrl } = this.state
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
                                rules: [{ required: true, message: '请输入商品名称' }]
                            })(
                                <Input placeholder="请输入商品名称" />
                            )}

                        </FormItem>
                        <FormItem   {...formItemLayout}
                            label="商品品牌"
                        >
                            {getFieldDecorator('brand', {
                                rules: [{ required: true, message: '请输入商品品牌' }]
                            })(
                                <Input placeholder="请输入商品品牌" />
                            )}

                        </FormItem>
                        <FormItem   {...formItemLayout}
                            label="商品类别"
                        >
                            {getFieldDecorator('product_type_id', {
                                rules: [{ required: true, message: '请选择商品类别' }],
                            })(
                                <Cascader options={this.props.goods.typeList} />
                            )}

                        </FormItem>
                        <FormItem   {...formItemLayout}
                            label="市场价格"
                        >
                            {getFieldDecorator('market_price', {
                                rules: [{ required: true, message: '请输入市场价格' }]
                            })(
                                <InputNumber min={0} style={{ width: '100%' }} placeholder="请输入市场价格" />
                            )}
                        </FormItem>
                        <FormItem   {...formItemLayout}
                            label="佣金比率"
                        >
                            {getFieldDecorator('brokerage', {
                                rules: [{ required: true, message: '请输入佣金比率' }]
                            })(
                                <InputNumber min={0} style={{ width: '93%', marginRight: 5 }} placeholder="请输入佣金比率" />
                            )}
                            <span>% </span>
                        </FormItem>

                        <FormItem   {...formItemLayout}
                            label="商品简介"
                        >
                            {getFieldDecorator('intro', {
                                rules: [{ required: true, message: '请输入商品简介' }]
                            })(
                                <TextArea rows={6} placeholder="请输入商品简介" />
                            )}

                        </FormItem>
                        <FormItem   {...formItemLayout}
                            label="商品首图"
                        >
                            {getFieldDecorator('first_picture', {
                                rules: [{ required: true, message: '请上传商品首图' }]
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
                        <FormItem   {...formItemLayout}
                            label="商品banner图"
                        >
                            <Upload
                                action={imagePath}
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChangeBanner}
                            >
                                {uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 4, offset: 2 }}
                            wrapperCol={{ span: 16 }}
                            label="商品详情"
                        >
                            {getFieldDecorator('detail')(
                                <div className={styles.braft}>
                                    <BraftEditor {...editorProps} />
                                </div>
                            )}
                        </FormItem>
                        <FormItem
                            wrapperCol={{ offset: 8, span: '16' }}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ marginRight: '50px', marginLeft: '50px' }}
                                loading={this.state.loading}
                            >
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
AddGoods = Form.create()(AddGoods);
export default connect(mapStateToProps)(AddGoods)