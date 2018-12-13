import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../../common/common.less';
import { Table, Button, Popconfirm, Modal, Form, Input } from 'antd';
import IndexImage from '../../components/IndexModule/indexImage'
import CategoryProducts from '../../components/IndexModule/categoryProducts'

const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const confirm = Modal.confirm;
const EditModule = Form.create()(
    class extends React.Component {
        state={
            fileList:[]
        }
        render() {
            const { visible, onCancel, onCreate, form,modalTitle,modalBtn,moduleKey,action,module } = this.props;
            const { getFieldDecorator } = form;
            return(
                <Modal
                    visible={visible}
                    title={modalTitle}
                    okText={modalBtn}
                    onCancel={onCancel}
                    onOk={onCreate}
                >   
                {moduleKey=='IndexImage'&&
                    <IndexImage  action={action} module={module}  form={form}></IndexImage>
                }
                  {moduleKey=='CategoryProducts'&&
                    <CategoryProducts  action={action} module={module}  form={form}></CategoryProducts>
                }  
                 </Modal>
            )
        }
    }
)

export default EditModule;