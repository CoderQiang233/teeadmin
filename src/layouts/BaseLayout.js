import React, { PureComponent } from 'react'
import DocumentTitle from 'react-document-title'
import PropTypes from 'prop-types';
import { Layout, Icon, message, Menu ,Modal,Button, Form, Input, Radio} from 'antd';
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom'
import classNames from 'classnames';
import { getMenuData } from '../common/menu';
import { enquireScreen } from 'enquire-js';
import logo from '../assets/logo.svg';
import styles from './BaseLayout.less';
import SiderMenu from '../components/SiderMenu'
import GlobalHeader from '../components/GlobalHeader'
import { connect } from 'react-redux'
import Authorized from '../utils/Authorized';
import { getRoutes } from '../utils/utils';
import { ContainerQuery } from 'react-container-query';

const FormItem = Form.Item;


const { Header, Sider, Content } = Layout;

const { AuthorizedRoute } = Authorized;

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = (item) => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `/${item.path}`,
        to: `/${item.children[0].path}`,
      });
      item.children.forEach((children) => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

class BasicLayout extends PureComponent {

  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  }
  state = {
    isMobile,
    visible:false
  };

  getChildContext() {
    const { location, routerData } = this.props;
    return {
      location,
      breadcrumbNameMap: routerData,
    };
  }

  componentDidMount() {
    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    });

  }

  handleMenuCollapse = (collapsed) => {
    this.props.dispatch({
      type: 'changeLayoutCollapsed',
      payload: collapsed,
    });
  }

  getPageTitle() {

    return "志梨国际后台管理系统";

  }

  handleMenuClick = ({ key }) => {
    if (key === 'triggerError') {
      //this.props.dispatch(routerRedux.push('/exception/trigger'));
      return;
    }
    if (key === 'logout') {
      sessionStorage.removeItem('antd-pro-authority');
      sessionStorage.removeItem('antd-pro-token');
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('userName');
      sessionStorage.removeItem('userId');
      this.props.dispatch({
        type: 'logout',
      });
    }
    if(key==='changePwd'){
      this.showModal();
    }
  }

  handleNoticeClear = (type) => {
    message.success(`清空了${type}`);
    this.props.dispatch({
      type: 'clearNotices',
      payload: type,
    });
  }

  handleNoticeVisibleChange = (visible) => {
    if (visible) {
      this.props.dispatch({
        type: 'fetchNotices',
      });
    }
  }

  getBashRedirect = () => {
    // According to the url parameter to redirect
    // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    const urlParams = new URL(window.location.href);

    const redirect = urlParams.searchParams.get('redirect');
    // Remove the parameters in the url
    if (redirect) {
      urlParams.searchParams.delete('redirect');
      window.history.replaceState(null, 'redirect', urlParams.href);
    } else {
      return '/index';
      //   return '/productOrder';
    }
    return redirect;
  }
  showModal = () => {
    this.setState({ visible: true });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      values.userId=sessionStorage.getItem("userId");
      this.props.dispatch({
        type: 'user/editPwd',
        payload: values
      })
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {

    const bashRedirect = this.getBashRedirect();
    const {
      currentUser, collapsed, fetchingNotices, notices, routerData, match, location,
    } = this.props;

    const layout = (

      <Layout>

        <SiderMenu
          menuData={getMenuData()}
          location={location}
          collapsed={collapsed}
          isMobile={this.state.isMobile}
          Authorized={Authorized}
          onCollapse={this.handleMenuCollapse}
        />

        <Layout>

          <GlobalHeader

            fetchingNotices={fetchingNotices}
            notices={notices}
            collapsed={collapsed}
            onCollapse={this.handleMenuCollapse}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
            onNoticeClear={this.handleNoticeClear}

          />
          <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>


            <Switch>

              {
                redirectData.map(item =>
                  <Redirect key={item.from} exact from={item.from} to={item.to} />
                )
              }
              {
                getRoutes(match.path, routerData).map(item =>
                  (
                    <AuthorizedRoute
                      key={item.key}
                      path={item.path}
                      component={item.component}
                      exact={item.exact}
                      authority={item.authority}
                      redirectPath="/exception/403"
                    />
                  )
                )
              }
              <Redirect exact from="/" to={bashRedirect} />
            </Switch>

          </Content>
        </Layout>
      </Layout>
    )
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }

}



const CollectionCreateForm = Form.create()(
  class extends React.Component {


    state={
      confirmDirty:false
    }

    handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('nPwd')) {
          callback('两次密码输入不一致!');
      } else {
          callback();
      }
  }
  checkConfirm = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
      }
      callback();
  }
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="修改密码"
          okText="修改"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="旧密码">
              {getFieldDecorator('oPwd', {
                rules: [{ required: true, message: '请输入旧密码!' }],
              })(
                <Input  type='password'  />
              )}
            </FormItem>
            <FormItem label="新密码">
              {getFieldDecorator('nPwd', {
                rules: [{ required: true, message: '请输入新密码!' },{ 
                  validator: this.checkConfirm, 
              }],
              })(
                <Input type='password' />
              )}
            </FormItem>
            <FormItem label="确认密码">
              {getFieldDecorator('confirm', {
                rules: [{ required: true, message: '请确认密码!' },{ 
                  validator: this.checkPassword, 
              }],
                
              })(
                <Input type='password' onBlur={this.handleConfirmBlur} />
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export default connect(({ routerReducer, global, user }) => {

  return {
    location: routerReducer.location,
    collapsed: global.collapsed,
    fetchingNotices: global.fetchingNotices,
    notices: global.notices,
  }
})(BasicLayout);