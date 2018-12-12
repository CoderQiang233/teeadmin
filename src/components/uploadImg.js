import React from 'react';
import { connect } from 'react-redux'
import { Form, Icon, message,Button, Upload } from 'antd';
import { apiAdmin,} from '../utils/config'
const FormItem = Form.Item;


class UploadImg extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fileList: ''
        }
    }

    beforeUpload = (file, fileList) => {
        const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
        if (!isJPG) {
            message.error('请上传jpg或png格式的图片');
        }
        const isLt2M = file.size / 1024 / 1024 < 20;
        if (!isLt2M) {
            message.error('图片不能大于2M');
        }
        return isJPG && isLt2M;
    }

    handleChange = ({ file, fileList }) => {
        if (file.status === 'done') {
            // if (file.response.data.code == 1) {
            //     message.success(`${file.name} 上传成功`);
            // } else {
            //     message.error(`${file.name} 上传失败`);
            // }

        } else if (file.status === 'error') {
            message.error(`${file.name} 上传失败`);
        }
        if (!file.status) {
            fileList = '';
        }
        this.setState({ fileList })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <FormItem label={this.props.label} style={{display:'inline-table'}}>
                {getFieldDecorator(this.props.name, {
                    rules: [{ required: this.props.required, message: '请上传图片' }],
                })(
                    <Upload
                        action={apiAdmin + '?service=Upload.upload'}
                        listType='picture'
                        beforeUpload={this.beforeUpload}
                        fileList={this.state.fileList}
                        onChange={this.handleChange}
                    >
                        <Button>
                            <Icon type="upload" /> 点击上传文件(文件类型:JPG/JPEG/PNG)
                        </Button>
                    </Upload>
                    )}
            </FormItem>
        )
    }

}

export default connect()(UploadImg);