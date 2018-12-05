import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {Switch,Route,Redirect,HashRouter} from 'react-router-dom'
import PageHeader from 'ant-design-pro/lib/PageHeader';
import { Icon } from 'antd';
import styles from './index.less';
import { getRoutes } from '../../utils/utils';




class Meeting extends Component {

    state = {
        title:'会议管理',
    }

    changeTitle = (val) =>{
        this.setState({
            title:val,
        })
    }


    render() {
        const { match,routerData,location } = this.props;
        const routes = getRoutes(match.path,routerData);


        

        return (
            <div className={styles.huiyi}>
                <PageHeader title={this.state.title}  />
                <Switch>
                    {
                        routes.map(item=>(
                            <Route 
                                key={item.key}
                                path={item.path}
                                exact={item.exact}
                                render={()=><item.component history={this.props.history} changeTitle={this.changeTitle.bind(this)}/>}
                                
                            />

                        ))
                    }
                    <Redirect exact from='/meeting' to='/meeting/list'/>
                </Switch>
            </div>


        );
    }




}

export default connect(
    
)(Meeting);



