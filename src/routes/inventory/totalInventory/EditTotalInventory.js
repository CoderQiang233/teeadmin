import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, InputNumber, Select, Cascader } from 'antd';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import 'braft-editor/dist/braft.css';
import styles from '../../../common/common.less';
import { withRouter } from 'react-router-dom';
import { getCurrentTime } from '../../../utils/common.js';
import { api, pageSize, imgPath } from '../../../utils/config'
import ImgPreview from 'img-preview';
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
let ware = '';
//编辑总库存
class EditTotalInventory extends Component {

    constructor(props) {
        super(props)
        ware = this.props.location.state.record
        this.state = {
            loading:false,
        }
    }

    componentDidMount() {



    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading:true,
                })
                values.product_id = ware.product_id;
                values.user_name = sessionStorage.getItem("name");
                values.userName = sessionStorage.getItem("userName");
                console.log('Received values of form: ', values);

                this.props.dispatch({
                    type: 'addTotalInventory',
                    payload: values,
                });
            }
        });
    }

    render() {

        const { name, brand, num, first_picture } = ware

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
        //页头
        const breadcrumbList = [{
            title: '首页',
            href: '/',
        }, {
            title: '总库存管理',
            href: '/inventory/totalInventory/list',
        }, {
            title: '商品库存编辑',
        }];
        return (
            <div className={styles.content}>
                <PageHeader breadcrumbList={breadcrumbList} className={styles.page} />
                <div className={styles.tableList} style={{ paddingTop: '24px' }}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem   {...formItemLayout}
                            label="商品名称"
                        >
                            {name}
                        </FormItem>


                        <FormItem   {...formItemLayout}
                            label="商品品牌"
                        >
                            {brand}
                        </FormItem>

                        <FormItem   {...formItemLayout}
                            label="商品首图"
                        >
                            {/* <ImgPreview src={imgPath + first_picture} /> */}
                            <img src={imgPath + first_picture} style={{width:100,height:100}}/>
                        </FormItem>

                        <FormItem   {...formItemLayout}
                            label="现有总库存"
                        >
                            {getFieldDecorator('num', {
                                initialValue: num
                            })(
                                <InputNumber min={0} style={{ width: '50%', marginRight: 5,color:'black' }} disabled={true} />

                            )} 
                        </FormItem>
                        <FormItem   {...formItemLayout}
                            label="增加总库存"
                        >
                            {getFieldDecorator('change_inventory', {
                                rules: [{ required: true, message: '请输入增加的总库存' }],
                            })(
                                <InputNumber min={1} placeholder="请输入增加的总库存" style={{ width: '50%', marginRight: 5 }} />
                            )}
                        </FormItem>
                        <FormItem
                            wrapperCol={{ offset: 8, span: '16' }}
                        >
                            <Button type="primary" htmlType="submit" loading={this.state.loading} style={{ marginRight: '50px', marginLeft: '50px' }}>
                                保存
                        </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}
function mapStateToProps({ goods, inventory }) {
    return { goods, inventory };
}
EditTotalInventory = Form.create()(EditTotalInventory);
export default connect(mapStateToProps)(withRouter(EditTotalInventory))