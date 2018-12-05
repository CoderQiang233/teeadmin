import React from 'react';
import styles from './index.less';
import {imgPath}  from '../../utils/config';
import {Icon, Button,Col,Row,Modal } from 'antd';

class ShowImg extends React.Component{
  constructor(props){
      super(props)
      this.state={
        previewImage:'',
        previewVisible:false,
      }                                         
  }
  showImg=(url)=>{
    this.setState({
      previewImage: url,
      previewVisible: true,
    });
  }
  handleImgCancel = () => {
    this.setState({
      previewVisible: false,
    });
  }
  render(){
    const {imgStr}=this.props;
    let files=[];
    if(imgStr){
      let filesArr=imgStr.split(",");
      for (let i = 0; i < filesArr.length; i++) {
        files.push(
          <div key={i} className='ant-upload-list-item ant-upload-list-item-done' onClick={this.showImg.bind(this, filesArr[i])}>
            <div className='ant-upload-list-item-info'>
              <span>
                <a className='ant-upload-list-item-thumbnail' >
                  <img className={styles.samllImg} src={imgPath + filesArr[i]} />
                </a>
              </span>
            </div>
          </div>
        )
      }
    }

    return(
    <div className={styles.normal}>
      <div className='ant-upload-list ant-upload-list-picture-card'>
        {files}   
        <div className={styles.clear}></div>          
      </div>
     
      <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleImgCancel} wrapClassName='imgModal'>
        <img alt="example" style={{ width: '100%' }} src={imgPath+this.state.previewImage} />
      </Modal>
    </div>
    )
  }
}

export default ShowImg;
