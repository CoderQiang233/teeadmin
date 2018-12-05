import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom'
import PageHeader from 'ant-design-pro/lib/PageHeader';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Icon } from 'antd';
import styles from './index.less';
import { getRoutes } from '../../utils/utils';




class Exampaper extends Component {

    state = {
        title: '试题管理',
    }

    changeTitle = (val) => {
        this.setState({
            title: val,
        })
    }


    render() {
        const { match, routerData, location } = this.props;
        const routes = getRoutes(match.path, routerData);




        return (
            <PageHeaderLayout title={this.state.title}  >
                <div className={styles.huiyi}>
                    <Switch>
                        {
                            routes.map(item => (
                                <Route
                                    key={item.key}
                                    path={item.path}
                                    exact={item.exact}
                                    render={() => <item.component changeTitle={this.changeTitle.bind(this)} />}
                                />

                            ))
                        }
                        <Redirect exact from='/exampaper' to='/exampaper/list' />
                    </Switch>
                </div>
            </PageHeaderLayout>


        );
    }




}

export default connect(

)(Exampaper);



