import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../../common/common.less';
import { Table, Button, Popconfirm, Modal, Form, Input, Upload, Icon, Select } from 'antd';
import UploadImg from '../uploadImg';
import config from '../../utils/config';
import jsonp from 'fetch-jsonp';
import querystring from 'querystring';
const { apiAdmin, imgPath } = config;

const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const confirm = Modal.confirm;
let imagePath = apiAdmin + '?service=Upload.Upload&XDEBUG_SESSION_START=12750';
const Option = Select.Option;

let timeout;
let currentValue;

function fetch(value, callback) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    function fake() {
        const str = querystring.encode({
            
            keyword: value,
        });
        // jsonp(`https://suggest.taobao.com/sug?${str}`)
        jsonp(`${apiAdmin}?service=Product.SearchProduct&${str}`)

            .then(response => response.json())
            .then((d) => {
                if (currentValue === value) {
                    console.log(123)
                    const result = d.data.info;
                    const data = [];
                    result.forEach((r) => {
                        data.push({
                            value: r.product_id,
                            text: r.name,
                        });
                    });
                    callback(data);
                }
            });
    }

    timeout = setTimeout(fake, 300);
}
class IndexImage extends Component {
    constructor(props) {

        super(props)
        this.state = {
            imageUrl: '',
            fileList: '',
            data: [],
            value: undefined,
        }
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'indexLayout/getProductOption',
            payload: {}
        })
        if(this.props.action=='edit'){
            let module=this.props.module;
            let setting=JSON.parse(module.setting);
            this.setState({
                imageUrl:setting.indexImg
            })
            console.log()
            this.props.form.setFieldsValue(
                {
                    'name':module.name,
                    'product':setting.product,
                    'sort_order':module.sort_order,
                    'indexImg':setting.indexImg
                }
            )
        }
    }
    componentWillReceiveProps (nextProps) {
        if(nextProps.action=='edit'){
            if(this.props.module.id!=nextProps.module.id){
                let module=nextProps.module;
                let setting=JSON.parse(module.setting);
                this.setState({
                    imageUrl:setting.indexImg
                })
                nextProps.form.setFieldsValue(
                    {
                        'name':module.name,
                        'product':setting.product,
                        'sort_order':module.sort_order,
                        'indexImg':setting.indexImg
                    }
                )
            }
            
        }
    }
    handleChangeHead = (info) => {
        console.log(info)
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
            this.props.form.setFieldsValue({
                'indexImg': info.file.response.data.file
            })

        }

    }
    handleSearch = (value) => {
        fetch(value, data => this.setState({ data }));
    }

    handleChange = (value) => {
        this.setState({ value });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

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

        const { imageUrl } = this.state;

        //首图
        const uploadButtonHead = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text" style={{ width: '100%' }}>上传</div>
            </div>
        );
        const options = this.props.indexLayoutRedux.productOption.map(d => <Option key={d.value}>{d.text}</Option>);
        return (
            <div>
                <FormItem {...formItemLayout} label="名称">
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入名称' }],
                    })(
                        <Input placeholder='请输入名称' />
                    )}
                </FormItem>
                <FormItem   {...formItemLayout}
                    label="商品首图"
                >
                    {getFieldDecorator('indexImg', {
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
                                {imageUrl ? <img src={imgPath + imageUrl} alt="avatar" /> : <Icon type="plus" className="avatar-uploader-trigger" />}
                            </Upload>
                        </div>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="链接商品">
                    {getFieldDecorator('product', {
                        rules: [{ required: true, message: '请选择链接商品' }],
                    })(
                        <Select
                            showSearch
                            value={this.state.value}
                            placeholder={this.props.placeholder}
                            style={{ width: 200 }}
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            onChange={this.handleChange}
                            notFoundContent={null}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {options}
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="排序">
                    {getFieldDecorator('sort_order', {
                        rules: [{ required: true, message: '请输入名称' }],
                    })(
                        <Input type='number' placeholder='请输入名称' />
                    )}
                </FormItem>
            </div>
        )
    }
}
function mapStateToProps({ indexLayoutRedux }) {

    return { indexLayoutRedux };
}
export default connect(mapStateToProps)(IndexImage);