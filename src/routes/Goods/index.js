import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {Switch,Route,Redirect,HashRouter} from 'react-router-dom'
import { Icon } from 'antd';
import styles from './index.less';
import { getRoutes } from '../../utils/utils';

class Ware extends Component {
    state = {
        title:'商品管理',
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
            <div className={styles.creation}>
                <Switch>
                    {
                        routes.map(item=>(
                            <Route 
                                key={item.key}
                                path={item.path}
                                exact={item.exact}
                                render={()=><item.component changeTitle={this.changeTitle.bind(this)}/>}
                            />
                        ))
                    }
                    <Redirect exact from='/product/productList' to='/product/productList/list'/>
                </Switch>
            </div>
        );
    }
}

export default connect(
    
)(Ware);
